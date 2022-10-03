import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addBetslip, changeFavorite, clearAllBets, getEvents, toggleErrorToast, toggleErrorToastText } from '../../store/actions/index.js';
import * as API from '../../api/functions.js';
import { useLocation } from "react-router";
import MobileMatchInfo from "../containers/mobile-container/MobileMatchInfo.js";
import MobileMatchContainerBets from "../containers/mobile-container/MobileMatchContainerBets.js";
import "../../css/liveCard.css";
import "../../css/eventCard.css";
import WidgetModal from "../WidgetModal.js";

const MobileMatchLine = (props) => {
  return (
    <>
      <MobileMatchInfo
        matchId={props.matchId}
        setFav={props.setFav}
        showWidgetModal={props.showWidgetModal}
        setShowWidgetModal={props.setShowWidgetModal}
        isLarge={props.isLarge}
        toggleAllBets={props.toggleAllBets}
      />
      <MobileMatchContainerBets
        matchId={props.matchId}
        checkSelected={props.checkSelected}
        isLarge={props.isLarge}
        toggleAllBets={props.toggleAllBets}
        isLoading={props.isLoading}
      />
    </>
  )
}

const EventsCard = (props) => {
  const token = useSelector(state => state.token);
  const matches = useSelector(state => state.matches);
  const [match, setMatch] = useState({});
  const [isLarge, setIsLarge] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const sportsId = useSelector(state => state.sportsId);
  const dealing = useSelector(state => state.settings.dealingView);
  const [showWidgetModal, setShowWidgetModal] = useState(false);

  useEffect(() => {
    if (matches.some(el => el.id === props.matchId)) {
      setMatch(matches.find(el => el.id === props.matchId));
    }
  }, [matches]);


  useEffect(() => {
    setIsLarge(false);
  }, [location.pathname, sportsId])

  const dropAllBets = useCallback(() => {
    dispatch(clearAllBets(false))
  }, []);

  useEffect(() => {
    if (props.dropBets) {
      setTimeout(dropAllBets(), 300);
    }
  }, [dropAllBets, props.dropBets]);

  function checkSelected({ button_id, match_id }) {
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

  function toggleAllBets() {
    if (!isLarge) {
      props.setCurEvent(props.matchId);
    } else {
      props.setCurEvent('');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.curEvent === props.matchId) {
      setIsLoading(true);
      API.getEventDetails(props.matchId, token).then(res => {
        dispatch(getEvents([res.data.data.infoFixture]));
        setIsLarge(true);
        setIsLoading(false);
      });
    }

    if (props.curEvent !== props.matchId) {
      setIsLarge(false);
    }
  }, [props.curEvent]);

  function setFav(id, favorite) {
    API.setFavorite(token, { id, favorite });
    dispatch(changeFavorite({ id, favorite }))
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
      "event-card-single " +
      (isLarge ? 'open' : '')
      + " " +
      setDealingClass(dealing)
    )
  }

  return (
    <>
      <div className={getClassName()}>
        <MobileMatchLine 
          matchId={match.id}
          setFav={setFav}
          showWidgetModal={showWidgetModal}
          setShowWidgetModal={setShowWidgetModal}
          checkSelected={checkSelected}
          isLarge={isLarge}
          toggleAllBets={toggleAllBets}
          isLoading={isLoading}
        />
      </div>

      {showWidgetModal && <WidgetModal close={setShowWidgetModal} open={showWidgetModal} />}
    </>
  )
}

export default EventsCard;
