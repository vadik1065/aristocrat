import React, { useState } from 'react';
import { asianHandicaps, capitalize, getPrice, sortMoneyLineBets, totals } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import i18next from 'i18next';
import useLine from '../../../hooks/useLine';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import { ReactComponent as PinOn } from '../../../images/pin-on.svg';
import { ReactComponent as PinOff } from '../../../images/pin-off.svg';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import { addBetslip, toggleErrorToast, toggleErrorToastText } from '../../../store/actions';

const SingleButton = ({ el, checkSelected }) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(el.line);

  return (
    <div
      className={`desktop-card-event-btn ` +
        (betslip.some(elem => elem.buttonId === el.id) ? ' chosen' : '')
        + (el.status !== 1 ? ' non-tradable' : '')
      }
      onClick={() => {
        if (el.status === 1) {
          checkSelected({
            button_id: el.id,
            match_id: el.match_id
          })
        }
      }
      }
    >
      {el.status === 1 && 
        <div className="desktop-card-event-cfc-label">
          {!asianHandicaps.includes(el.market_name) && `${el.name} ${el.line !== null ? el.line : ''}`}
          {asianHandicaps.includes(el.market_name) && `${i18next.t(`H${el.name}`)} ${line}`}
        </div>
      }
      {el.status === 1 && 
        <div className={"card-event-cfc-val"}>{el.price !== undefined && <ChValue value={getPrice(el.price, interfaceView, isComma)} />}</div>
      }
      {el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
    </div>
  );
}

const SingleBetMarket = (props) => {
  const [pin, setPin] = useState(true);

  return (
    <>
      <div className="desktop-card-event-cfc-container-header flex">
        <div className={`desktop-card-event-cfc-container-header-label ${props.marketName === 'Correct score' && 'small'}`}>{capitalize(props.marketName)}</div>
        <div className={`desktop-card-event-cfc-container-header-right flex ${props.marketName === 'Correct score' && 'small'}`}>
          {/* {pin ?
            <PinOn className="filters-icon" onClick={() => setPin(!pin)} /> :
            <PinOff className="filters-icon" onClick={() => setPin(!pin)} />
          } */}
          <Arrow className="arrow-down" onClick={() => props.setClose(!props.close)} />
        </div>
      </div>

      <div className={`desktop-card-event-cfc-container-btns ${props.marketList.length % 3 === 0 && 'one-third'} ${props.marketList.length % 4 === 0 && 'one-fourth'}`}>
        {props.marketList && sortMoneyLineBets(props.marketList).map(el => el.status === 1 &&
          <SingleButton 
            key={el.id} 
            el={el} 
            checkSelected={props.checkSelected} 
          />
        )}
      </div>
    </>
  )
}

const AsianHandicapBetMarket = (props) => {
  const [pin, setPin] = useState(true);

  return (
    <>
      <div className="desktop-card-event-cfc-container-header flex">
        <div className={`desktop-card-event-cfc-container-header-label`}>{capitalize(props.marketName)}</div>
        <div className={`desktop-card-event-cfc-container-header-right flex`}>
          {/* {pin ?
            <PinOn className="filters-icon" onClick={() => setPin(!pin)} /> :
            <PinOff className="filters-icon" onClick={() => setPin(!pin)} />
          } */}
          <Arrow className="arrow-down" onClick={() => props.setClose(!props.close)} />
        </div>
      </div>

      <div className={`desktop-card-event-cfc-container-btns two-columns`}>
        <div className="left-column">
          {props.marketList
            .filter(mark => mark.name == 1)
            .sort((a, b) => a.line.split(' ')[0] - b.line.split(' ')[0])
            .map(el => 
              <SingleButton 
                key={el.id} 
                el={el} 
                checkSelected={props.checkSelected} 
              />
            )}
        </div>
        <div className="right-column">
          {props.marketList
            .filter(mark => mark.name == 2)
            .sort((a, b) => b.line.split(' ')[0] - a.line.split(' ')[0])
            .map(el => 
              <SingleButton 
                key={el.id} 
                el={el} 
                checkSelected={props.checkSelected} 
              />
            )}
        </div>
      </div>
    </>
  )
}

const TotalBetMarket = (props) => {
  const [pin, setPin] = useState(true);

  return (
    <>
      <div className="desktop-card-event-cfc-container-header flex">
        <div className={`desktop-card-event-cfc-container-header-label`}>{capitalize(props.marketName)}</div>
        <div className={`desktop-card-event-cfc-container-header-right flex`}>
          {/* {pin ?
            <PinOn className="filters-icon" onClick={() => setPin(!pin)} /> :
            <PinOff className="filters-icon" onClick={() => setPin(!pin)} />
          } */}
          <Arrow className="arrow-down" onClick={() => props.setClose(!props.close)} />
        </div>
      </div>

      <div className={`desktop-card-event-cfc-container-btns two-columns`}>
        <div className="left-column">
          {props.marketList
            .filter(mark => mark.name == 'Under')
            .sort((a, b) => a.line - b.line)
            .map(el => 
              <SingleButton 
                key={el.id} 
                el={el} 
                checkSelected={props.checkSelected} 
              />
            )}
        </div>
        <div className="right-column">
          {props.marketList
            .filter(mark => mark.name == 'Over')
            .sort((a, b) => a.line - b.line)
            .map(el => 
              <SingleButton 
                key={el.id} 
                el={el} 
                checkSelected={props.checkSelected} 
              />
            )}
        </div>
      </div>
    </>
  )
}

const DesktopBetMarketContainer = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const [close, setClose] = useState(false);

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

  return (
    <div className={`desktop-card-event-cfc-container ${close ? 'close' : ''}`}>
      {!asianHandicaps.includes(props.marketName) && !totals.includes(props.marketName) &&
        <SingleBetMarket
          marketName={props.marketName}
          marketList={props.marketList.filter(bet => bet.status === 1)}
          checkSelected={checkSelected}
          close={close}
          setClose={setClose}
        />
      }

      {asianHandicaps.includes(props.marketName) &&
        <AsianHandicapBetMarket
          marketName={props.marketName}
          marketList={props.marketList}
          checkSelected={checkSelected}
          close={close}
          setClose={setClose}
        />
      }

      {totals.includes(props.marketName) &&
        <TotalBetMarket
          marketName={props.marketName}
          marketList={props.marketList}
          checkSelected={checkSelected}
          close={close}
          setClose={setClose}
        />
      }
    </div>
  )
}

export default DesktopBetMarketContainer;
