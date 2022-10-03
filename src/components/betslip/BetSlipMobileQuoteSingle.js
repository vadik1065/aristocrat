import { IonRippleEffect } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import moment from 'moment';
import {
  clearAllBets, editBetslip, setBetQuotes, toggleErrorToast,
  toggleErrorToastText, toggleToast, toggleToastText, updateUserInfo
} from '../../store/actions';
import BetSlipMobile from '../BetSlipMobile';
import BetSlipTablet from '../BetSlipTablet.js';
import BetslipBottom from './BetSlipBottom';
import BetSlipBottomQuote from './BetSlipBottomQuote.js';
import ConfirmBetModal from './ConfirmBetModal';
import ConfirmRequestModal from './ConfirmRequestModal.js';
import i18next from 'i18next';



const BetSlipMobileQuoteSingle = (props) => {
  const dispatch = useDispatch();
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const token = useSelector(state => state.token);
  const betslip = useSelector(state => state.betslip);
  const matches = useSelector(state => state.matches);
  const bets = useSelector(state => state.bets);
  const currency = useSelector(state => state.user.currency);
  const dropBets = useSelector(state => state.dropBets);
  const [requestInput, setRequestInput] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [riskOrWin, setRiskOrWin] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [allowedShowModal, setAllowedShowModal] = useState(false);
  const [mobileLoader, setMobileLoader] = useState(false);

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
    setMobileLoader(true);
    const quoteArrSingles = items.map((el, i) => {
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
        setMobileLoader(false);
        setShowConfirmModal(false);
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
      {isMobile && betslip.map((el, i) =>
        <div key={i} className="betslip-container-single">
          <BetSlipMobile el={el} betOrQuote={props.betOrQuote} />
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
      )}

      {isTablet && betslip.map((el, i) =>
        <div key={i} className="betslip-bet-item">
          <BetSlipTablet el={el} betOrQuote={props.betOrQuote} />
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
      )}

      {isMobile &&
        <div className="bet-buttons-container">
          <button
            className={`bet-button make-bet ion-activatable ${allowedShowModal ? '' : 'disabled'}`}
            onClick={() => {
              if (allowedShowModal) {
                showModal();
              }
            }}
          >
            <IonRippleEffect />
            <span className="long-text">
              {betslip.length === 1 && i18next.t('Request')}
              {betslip.length > 1 && i18next.t('Max 1 quote')}
            </span>
          </button>
          <button
            className={`bet-button clear-all ion-activatable`}
            onClick={() => {
              dispatch(clearAllBets(!dropBets));
              setTotalProfit(0);
            }}
          >
            <span>
              {i18next.t("Clear all")}
            </span>
            <IonRippleEffect />
          </button>
        </div>
      }

      {isTablet &&
        <>
          <div className="total-profit flex"></div>
          <div className="betslip-bet-buttons-container">
            <button
              className={`bet-button orange ion-activatable ${allowedShowModal ? '' : 'disabled'}`}
              onClick={() => {
                if (allowedShowModal) {
                  showModal();
                }
              }}
            >
              <IonRippleEffect />
              <span className="long-text">
                {betslip.length === 1 && i18next.t('Request')}
                {betslip.length > 1 && i18next.t('Max 1 quote per request')}
              </span>
            </button>
            <button
              className="bet-button ion-activatable"
              onClick={() => {
                dispatch(clearAllBets(!dropBets));
                setTotalProfit(0);
              }}
            >
              <span>
                {i18next.t("Clear all")}
              </span>
              <IonRippleEffect />
            </button>
          </div>
        </>
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

export default BetSlipMobileQuoteSingle;
