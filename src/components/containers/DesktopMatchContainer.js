import React, { useState, useEffect, useCallback } from 'react';
import {
  addBetslip, clearAllBets,
  toggleLOB, toggleLoader, changeFavorite,
  toggleErrorToastText, toggleErrorToast, getEvents, setMatchId
} from '../../store/actions/index.js';
import '../../css/desktopLive.css';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import DesktopSmallContainer from './desktop-container/DesktopSmallContainer.js';
import DesktopMatchInfo from './desktop-container/DesktopMatchInfo.js';
import MatchContainerBets from './desktop-container/MatchContainerBets.js';
import WidgetModal from '../WidgetModal.js';


const DesktopMatchLine = (props) => {
  return <>
    <DesktopMatchInfo
      link={props.link}
      setFav={props.setFav}
      showWidgetModal={props.showWidgetModal}
      setShowWidgetModal={props.setShowWidgetModal}
    />

    <MatchContainerBets
      link={props.link}
      checkSelected={props.checkSelected}
    />
  </>
}


const DesktopMatchContainer = (props) => {
  const token = useSelector(state => state.token);
  const lob = useSelector(state => state.lob);
  const dispatch = useDispatch();
  const dropBets = useSelector(state => state.dropBets);
  const [currentButton, setCurrentButton] = useState('none');
  const btnAccent = useSelector(state => state.settings.accent.color);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const dealing = useSelector(state => state.settings.dealingView);
  const [showWidgetModal, setShowWidgetModal] = useState(false);

  const checkSelected = ({ button_id, match_id }) => {
    if (currentButton !== button_id) {
      setCurrentButton(button_id);
      props.setCurrentMatchDetails(match_id);
    }
    if (currentButton === button_id) {
      setCurrentButton('none');
    }

    API.getBetId(token).then(res => {
      const bet = {
        matchId: match_id,
        buttonId: button_id,
        betId: res.bet_id,
        sumBet: 0,
        sumWin: 0
      }
      dispatch(addBetslip(bet))
    }).catch(err => {
      console.log(err.response.data.error);
      dispatch(toggleErrorToastText(err.response.data.error))
      dispatch(toggleErrorToast(true));
    })
  }

  function setFav(id, favorite) {
    API.setFavorite(token, { id, favorite });
    dispatch(changeFavorite({ id, favorite }))
  }

  const dropAllBets = useCallback(() => {
    dispatch(clearAllBets(false))
  }, [])

  useEffect(() => {
    if (dropBets === true) {
      setCurrentButton('none');
      setTimeout(dropAllBets(), 300);
    }
  }, [dropAllBets, dropBets]);

  function isOdd(num) { return num % 2; }

  function showBets(id) {
    dispatch(toggleLoader(true));
    dispatch(setMatchId(id));
    dispatch(toggleLOB(true));
    API.getEventDetails(id, token).then(res => {
      dispatch(getEvents([res.data.data.infoFixture]));
      dispatch(toggleLoader(false));
    });
  }

  function setDealingClass(value) {
    if (value === 'cis') {
      return 'cis-view'
    } else if (value === 'classic') {
      return 'classic-view'
    } else if (value === 'asian') {
      return 'asian-view'
    }
  }

  function getClassName() {
    return (
      "desktop-live-container flex " +
      (btnAccent)
      + " " +
      (themeAccent)
      + " " +
      setDealingClass(dealing)
      + " " +
      (lob && props.currentMatchDetails === props.link ? 'selected' : '')
      + " " +
      // (isOdd(props.isodd) === 0 ? 'light-theme-gray' : 'white-bg')
      // + " " +
      (lob ? " small" : "")
    )
  }

  return (
    <>
      <div
        onClick={() => {
          showBets(props.link);
          props.setCurrentMatchDetails(props.link);
        }}
        className={getClassName()}
      >

        {/* вид карточки при закрытом List of bets */}
        {!lob && (dealing === "cis" || dealing === "classic" || dealing === "asian") && (
          <DesktopMatchLine
            link={props.link}
            setFav={setFav}
            showWidgetModal={showWidgetModal}
            setShowWidgetModal={setShowWidgetModal}
            checkSelected={checkSelected}
          />
        )}

        {/* вид карточки при открытом List of bets */}
        {lob && dealing === "cis" &&
          <DesktopSmallContainer
            link={props.link}
            setFav={setFav}
            showWidgetModal={showWidgetModal}
            setShowWidgetModal={setShowWidgetModal}
            checkSelected={checkSelected}
          />
        }

        {/* вид карточки при открытом List of bets */}
        {lob && (dealing === "classic" || dealing === "asian") &&
          <DesktopMatchLine
            link={props.link}
            setFav={setFav}
            showWidgetModal={showWidgetModal}
            setShowWidgetModal={setShowWidgetModal}
            checkSelected={checkSelected}
          />
        }
      </div>
      {showWidgetModal && <WidgetModal close={setShowWidgetModal} open={showWidgetModal} />}
    </>
  )
}

export default DesktopMatchContainer;
