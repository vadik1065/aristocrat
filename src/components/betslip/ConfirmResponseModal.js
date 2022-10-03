import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IonModal, IonRippleEffect, IonSpinner } from '@ionic/react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import moment from 'moment';
import Loader from '../Loader';
import {
  clearAllBets, setBetQuotes, setQuoteData, toggleErrorToast, toggleErrorToastText,
  toggleToast, toggleToastText, updateUserInfo
} from '../../store/actions';
import { getFullDate, getFullDateFromFullFormat, getParticipantName, getPrice, getСompetitionLogo, getСompetitionName } from '../../utils/utils';
import i18next from 'i18next';



const EventInfo = (props) => {
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const competitionsDict = useSelector(state => state.competitionsDict);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  function getTypeString({m_name, name, line}) {
    if (m_name === '1X2' || m_name === '12') {
      if (name === '1') {
        return `Win ${props.event.participant1}`;
      }
      if (name === 'X') {
        return `Draw`;
      }
      if (name === '2') {
        return `Win ${props.event.participant2}`;
      }
    } else {
      let result = `${name} ${line}`
      return result;
    }
  }

  return (
    <>
      <div className="betslip-header">
        <div className="betslip-header-top flex">
          <p className="match-info">
            {getParticipantName(participants[props.event.participant1_id]) || props.event.participant1} — {getParticipantName(participants[props.event.participant2_id]) || props.event.participant2}
          </p>
        </div>
        <div className="match-details">
          <img src={getСompetitionLogo(competitionsDict[props.event.competition_id])} alt="logo" />
          <div className="detail flex">
            <p className="where">{getСompetitionName(competitionsDict[props.event.competition_id]) || props.event.League}</p>
            <p className="dot">·</p>
            <p className="when">
              {getFullDate(props.event.starttime, dateFormat, timeZone)}
            </p>
          </div>
        </div>
      </div>
      <div className="betslip-body">
        <div className="betslip-cont">
          <div className="betslip-title">
            <p>{getTypeString({ m_name: props.event.Market, name: props.event.Bet.Name, line: props.event.Bet.Line !== null ? props.event.Bet.Line : '' })}</p>
          </div>
          <div className="betslip-val">
            {props.isSingle && <p>{getPrice(props.quoteData.koefficient_max, interfaceView, isComma)}</p>}
            {!props.isSingle && <p>{getPrice(props.quoteDataEvent.koefficient, interfaceView, isComma)}</p>}
          </div>
        </div>
        {props.isSingle &&
          <div className="to-risk-to-win-container">
            <div className="to-risk-to-win-item">
              <div className="to-risk-to-win-item-label">
                {i18next.t("To Lose")}
              </div>
              <div className="to-risk-to-win-item-value">{props.quoteData && props.quoteData.summa_bet}</div>
            </div>
            <div className="to-risk-to-win-item">
              <div className="to-risk-to-win-item-label">
                {i18next.t("To Win")}
              </div>
              <div className="to-risk-to-win-item-value">{props.quoteData && props.quoteData.summa_max}</div>
            </div>
          </div>
        }
      </div>
      {!props.isSingle && props.lastIdx === props.idx &&
        <div className="to-risk-to-win-container">
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Lose")}
            </div>
            <div className="to-risk-to-win-item-value">{props.quoteData && props.quoteData.summa_bet}</div>
          </div>
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Win")}
            </div>
            <div className="to-risk-to-win-item-value">{props.quoteData && props.quoteData.summa_max}</div>
          </div>
        </div>
      }
    </>
  )
}

const ConfirmResponseModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const theme = useSelector(state => state.settings.theme);
  // const betslip = useSelector(state => state.betslip);
  const betQuotes = useSelector(state => state.betQuotes);
  const quoteData = useSelector(state => state.quoteData);
  const matches = useSelector(state => state.matches);
  const bets = useSelector(state => state.bets);
  const currency = useSelector(state => state.user.currency);
  const dropBets = useSelector(state => state.dropBets);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(30);

  const dropAllBets = useCallback(() => {
    dispatch(clearAllBets(false))
  }, []);

  useEffect(() => {
    if (dropBets) {
      setTimeout(dropAllBets, 300);
    }
  }, [dropAllBets, dropBets]);

  useInterval(() => {
    // Your custom logic here
    if (props.quoteData.koefficient_max && timer > 0) {
      setTimer(timer - 1);
    }
    if (timer == 0) {
      props.close(false);
    }
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function setConfirmBet(type, item) {
    setLoader(true);
    let bet = {};
    if (type === 'Single') {
      bet = {
        bet_request: 'Confirm',
        id: item.id,
        type: 'Single',
        summa_bet: quoteData.summa_bet,
        price: quoteData.koefficient_max,
        summa_win: quoteData.summa_max,
        currency_id: currency,
        events: [
          {
            type: matches.find(match => match.id === item.data[0].fixture_id).matchstatus === 2 ? 'live' : 'prematch',
            fixture_id: item.data[0].fixture_id,
            market_id: item.data[0].market_id,
            bet_id: item.data[0].Bet.Id,
            provider_id: item.data[0].Provider_id,
            price: quoteData.koefficient_max,
          }
        ]
      }
    }

    if (type === 'Multiple') {
      bet = {
        bet_request: 'Confirm',
        id: item.id,
        type: 'Multiple',
        summa_bet: quoteData.summa_bet,
        price: quoteData.koefficient_max,
        summa_win: quoteData.summa_max,
        currency_id: currency,
        events: item.data.map(el => {
          return {
            type: matches.find(match => match.id === el.fixture_id).matchstatus === 2 ? 'live' : 'prematch',
            fixture_id: el.fixture_id,
            market_id: el.market_id,
            bet_id: el.Bet.Id,
            provider_id: el.Provider_id,
            price: quoteData.koefficient_max,
          }
        })
      }
    }

    API.setBet(token, bet)
      .then(response => {
        setLoader(false);
        props.close(false);
        if (response.data.data[0].status === 'OK') {
          dispatch(setBetQuotes([]));
          dispatch(toggleToastText('Your bet has been accepted.'));
          dispatch(toggleToast(true));
          dispatch(updateUserInfo({ balance: response.data.data[0].balance }));
        }
        if (response.data.data[0].status !== 'OK') {
          console.log(response.data.data[0].error);
          dispatch(toggleErrorToastText(response.data.data[0].error));
          dispatch(toggleErrorToast(true));
        }
      })
      // .catch(err => {
      //   console.log(err.response.data.data.message);
      //   setLoader(false);
      //   dispatch(toggleErrorToastText(err.response.data.data.message));
      //   dispatch(toggleErrorToast(true));
      // })
  }

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => {
        dispatch(setBetQuotes([]));
        dispatch(setQuoteData({}));
        setTimer(30);
        props.close(false);
      }}
      cssClass={`auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>
            {i18next.t("Confirmation")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item w100">
          {betQuotes.length && quoteData.type === 'Single' &&
            betQuotes[0].data.map((el, i) =>
              <EventInfo
                key={i}
                event={el}
                quoteData={quoteData}
                isSingle={true}
              />
            )
            // betslip.map(event => event.betId === quoteData.id &&
            //   <EventInfo
            //     key={event.betId}
            //     event={event}
            //     quoteData={quoteData}
            //     isSingle={true}
            //   />
            // )
          }

          {betQuotes.length && quoteData.type === 'Multiple' &&
            betQuotes[0].data.map((el, i) =>
              <EventInfo
                key={i}
                event={el}
                quoteData={quoteData}
                quoteDataEvent={quoteData.events[i]}
                lastIdx={betQuotes[0].data.length - 1}
                idx={i}
                isSingle={false}
              />
            )
            // betslip.map((event, i) =>
            //   <EventInfo
            //     key={event.betId}
            //     event={event}
            //     quoteData={quoteData}
            //     quoteDataEvent={quoteData.events[i]}
            //     lastIdx={betslip.length - 1}
            //     idx={i}
            //     isSingle={false}
            //   />
            // )
          }

          {/* <Loader loader={loader}></Loader> */}
          {loader && <IonSpinner color={theme.darkMode ? 'light' : ''} className="spinner-large center" name="lines" />}
          <div className="input-container buttons confirm-response flex">
            <div
              onClick={() => {
                if (betQuotes.length && quoteData.type === 'Single') {
                  setConfirmBet('Single', betQuotes[0])
                }
                if (betQuotes.length && quoteData.type === 'Multiple') {
                  setConfirmBet('Multiple', betQuotes[0])
                }
              }}
              className="repay-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Confirm bet")}
            </div>
            <div
              onClick={() => props.close(false)}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              <span>
                {i18next.t("Decline")}
              </span>
              <span className="timer">{timer}</span>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default ConfirmResponseModal;
