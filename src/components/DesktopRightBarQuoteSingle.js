import React, { useState, useEffect } from 'react';
import '../css/rightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  clearAllBets, editBetslip, setBetQuotes, toggleErrorToast,
  toggleErrorToastText, toggleToast, toggleToastText, updateUserInfo
} from '../store/actions/index.js';
import * as API from '../api/functions.js'
import { IonRippleEffect, useIonViewWillLeave } from "@ionic/react";
import BetSlipDesktop from './betslip/BetSlipDesktop';
import BetSlipBottomQuote from './betslip/BetSlipBottomQuote';
import ConfirmRequestModal from './betslip/ConfirmRequestModal';
import i18next from 'i18next';



const DesktopRightBarQuoteSingle = (props) => {
  const dispatch = useDispatch();
  const dropBets = useSelector(state => state.dropBets);
  const token = useSelector(state => state.token);
  const currency = useSelector(state => state.user.currency);
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const matches = useSelector(state => state.matches);
  const bets = useSelector(state => state.bets);
  const [requestInput, setRequestInput] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [riskOrWin, setRiskOrWin] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [allowedShowModal, setAllowedShowModal] = useState(false);

  useEffect(() => {
    if (dropBets) {
      dispatch(clearAllBets(false));
    }
  }, [dropBets]);

  useEffect(() => {
    if (betslip.length === 1 && 
      +requestInput >= +props.minMax[0].bet_min && 
      +requestInput <= +props.minMax[0].bet_max_quote && 
      bets.find(bet => bet.id === betslip[0].buttonId).price <= +props.minMax[0].coefficient_max && 
      +totalProfit <= +props.minMax[0].win_max_quote
    ) {
      setAllowedShowModal(true)
    } else {
      setAllowedShowModal(false)
    }
  }, [requestInput, betslip]);

  function showModal() {
    setShowConfirmModal(true);
  }

  function setRequest(items) {
    props.setLoader(true);
    const quoteArrSingles = items.map(el => {
      return {
        bet_request: 'Request',
        id: el.betId,
        type: 'Single',
        summa_bet: requestInput,
        price: bets.find(bet => bet.id === el.buttonId).price,
        summa_win: totalProfit,
        currency_id: currency,
        events: [
          {
            type: matches.find(match => match.id === el.matchId).matchstatus === 2 ? 'live' : 'prematch',
            fixture_id: el.matchId,
            market_id: bets.find(bet => bet.id === el.buttonId).market_id.split('_')[0],
            bet_id: bets.find(bet => bet.id === el.buttonId).bet_id,
            provider_id: bets.find(bet => bet.id === el.buttonId).provider_id,
            price: bets.find(bet => bet.id === el.buttonId).price
          }
        ]
      }
    })

    API.setBet(token, quoteArrSingles)
      .then(response => {
        props.setLoader(false);
        if (response.data.data[0].status === 'OK') {
          dispatch(toggleToastText('Your request will be processed.'));
          dispatch(toggleToast(true));
          setRequestInput(0);
          setTotalProfit(0);
          API.getBets(token, {
            type: 'history',
            dateFrom: moment().subtract(1, 'days').format("YYYY-MM-DD"),
            dateTo: moment().format("YYYY-MM-DD")
          }).then(res => {
            dispatch(setBetQuotes(res.filter(el => el.state === 'Request')));
          })
          dispatch(clearAllBets(!dropBets));
        }
        if (response.data.data[0].status !== 'OK') {
          console.log(response.data.data[0].error);
          dispatch(toggleErrorToastText(response.data.data[0].error));
          dispatch(toggleErrorToast(true));
        }
      })
      .catch(err => {
        console.log(err.response.data.error);
        props.setLoader(false);
        dispatch(toggleErrorToastText(err.response.data.error));
        dispatch(toggleErrorToast(true));
      })
  }



  return (
    <>
      {betslip.length > 0 &&
        <div className="betslips">
          <div className="betslip-container">
            {betslip.map((el, i) => {
              return (
                <div key={i} className="betslip-container-single">
                  <BetSlipDesktop
                    el={el}
                    betOrQuote={props.betOrQuote}
                  />
                  <BetSlipBottomQuote
                    isSingle={true}
                    setRequestInput={setRequestInput}
                    requestInput={requestInput}
                    el={el}
                    setTotalProfit={setTotalProfit}
                    minMax={props.minMax[i]}
                    setRiskOrWin={setRiskOrWin}
                  />
                </div>
              )
            })}
          </div>
        </div>
      }

      {betslip.length > 0 &&
        <div className="right-bar-footer">
          <div
            onClick={() => {
              if (allowedShowModal) {
                showModal();
              }
            }}
            className={`make-bet flex ion-activatable ${allowedShowModal ? '' : 'disabled'}`}
          >
            <IonRippleEffect />
            {betslip.length === 1 && i18next.t('Request')}
            {betslip.length > 1 && i18next.t('Max 1 quote per request')}
          </div>
          <div
            onClick={() => {
              dispatch(clearAllBets(!dropBets));
              setTotalProfit(0)
            }}
            className="clear-all flex ion-activatable"
          >
            <IonRippleEffect />
            {i18next.t("Clear all")}
          </div>
        </div>
      }

      <ConfirmRequestModal
        open={showConfirmModal}
        close={setShowConfirmModal}
        setRequest={setRequest}
        requestInput={requestInput}
        totalProfit={totalProfit}
        riskOrWin={riskOrWin}
        isSingle={true}
      />
    </>
  )
}

export default DesktopRightBarQuoteSingle;
