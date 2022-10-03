import { IonRippleEffect } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import moment from 'moment';
import {
  clearAllBets, setBetQuotes, toggleErrorToast, toggleErrorToastText,
  toggleToast, toggleToastText, updateUserInfo
} from '../../store/actions';
import BetSlipMobile from '../BetSlipMobile';
import BetSlipTablet from '../BetSlipTablet.js';
import BetSlipBottomQuote from './BetSlipBottomQuote.js';
import ConfirmRequestModal from './ConfirmRequestModal.js';
import i18next from 'i18next';



const BetSlipMobileQuoteMultiple = (props) => {
  const dispatch = useDispatch();
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const token = useSelector(state => state.token);
  const betslip = useSelector(state => state.betslip);
  const currency = useSelector(state => state.user.currency);
  const dropBets = useSelector(state => state.dropBets);
  const matches = useSelector(state => state.matches);
  const bets = useSelector(state => state.bets);
  const [multipleRequestInput, setMultipleRequestInput] = useState(0);
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
    let obj = {};
    let newBets = betslip.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      return obj;
    })
    let coeff = newBets.map(el => el.price).reduce((acc, rec) => acc * rec, 0);
    // let coeff = betslip.map(el => el.value).reduce((acc, rec) => acc * rec, 0);
    if (multipleRequestInput >= +props.minMax.bet_min && 
      multipleRequestInput <= +props.minMax.bet_max_quote && 
      coeff <= +props.minMax.coefficient_max && 
      betslip.length <= +props.minMax.events_max && 
      totalProfit <= +props.minMax.win_max_quote
    ) {
      setAllowedShowModal(true);
    } else {
      setAllowedShowModal(false);
    }
  }, [multipleRequestInput, totalProfit]);

  function showModal() {
    setShowConfirmModal(true);
  }

  function setRequest(items) {
    setMobileLoader(true);
    let obj = {};
    let newBets = items.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      return obj;
    })
    let coeff = newBets.map(el => el.price).reduce((acc, rec) => acc * rec);
    // let coeff = items.map(el => el.value).reduce((acc, rec) => acc * rec);
    const quoteArrMultiple = {
      bet_request: 'Request',
      id: items[0].betId,
      type: 'Multiple',
      summa_bet: multipleRequestInput,
      price: coeff,
      summa_win: totalProfit,
      currency_id: currency,
      events: items.map(el => {
        return {
          type: matches.find(match => match.id === el.matchId).matchstatus === 2 ? 'live' : 'prematch',
          fixture_id: el.matchId,
          market_id: bets.find(bet => bet.id === el.buttonId).market_id.split('_')[0],
          bet_id: bets.find(bet => bet.id === el.buttonId).bet_id,
          provider_id: bets.find(bet => bet.id === el.buttonId).provider_id,
          price: bets.find(bet => bet.id === el.buttonId).price
        }
      })
    }

    API.setBet(token, quoteArrMultiple)
      .then(response => {
        setMobileLoader(false);
        setShowConfirmModal(false);
        if (response.data.data[0].status === 'OK') {
          dispatch(toggleToastText('Your request will be processed.'));
          dispatch(toggleToast(true));
          setMultipleRequestInput(0);
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
        <BetSlipMobile key={i} el={el} betOrQuote={props.betOrQuote} />
      )}
      {isMobile &&
        <BetSlipBottomQuote
          isSingle={false}
          multipleRequestInput={multipleRequestInput}
          setMultipleRequestInput={setMultipleRequestInput}
          el={betslip[0]}
          setTotalProfit={setTotalProfit}
          minMax={props.minMax}
          setRiskOrWin={setRiskOrWin}
        />
      }

      {isTablet &&
        <div className="betslip-bet-item">
          {betslip.map((el, i) =>
            <BetSlipTablet key={i} el={el} betOrQuote={props.betOrQuote} />
          )}
          <BetSlipBottomQuote
            isSingle={false}
            multipleRequestInput={multipleRequestInput}
            setMultipleRequestInput={setMultipleRequestInput}
            el={betslip[0]}
            setTotalProfit={setTotalProfit}
            minMax={props.minMax}
            setRiskOrWin={setRiskOrWin}
          />
        </div>
      }

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
            {i18next.t("Request")}
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
              {i18next.t("Request")}
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
        multipleRequestInput={multipleRequestInput}
        totalProfit={totalProfit}
        riskOrWin={riskOrWin}
        isSingle={false}
      />
    </>
  )
}

export default BetSlipMobileQuoteMultiple;
