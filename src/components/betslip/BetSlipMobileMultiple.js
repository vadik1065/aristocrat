import { IonRippleEffect } from '@ionic/react';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js'
import {
  clearAllBets, toggleErrorToast, toggleErrorToastText, toggleToast,
  toggleToastText, updateUserInfo
} from '../../store/actions';
import { getCurrency, mathRound, roundToTwo } from '../../utils/utils.js';
import BetSlipMobile from '../BetSlipMobile';
import BetSlipTablet from '../BetSlipTablet.js';
import BetslipBottom from './BetSlipBottom';
import ConfirmBetModal from './ConfirmBetModal';



const BetSlipMobileMultiple = (props) => {
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
  const [multipleBetInput, setMultipleBetInput] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [mobileLoader, setMobileLoader] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [allowedShowModal, setAllowedShowModal] = useState(false);

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
    let coeff = newBets.map(el => el.price).reduce((acc, rec) => acc * rec);

    if (multipleBetInput >= +props.minMax.bet_min && 
      multipleBetInput <= +props.minMax.bet_max && 
      coeff <= +props.minMax.coefficient_max && 
      betslip.length <= +props.minMax.events_max && 
      totalProfit <= +props.minMax.win_max
    ) {
      setAllowedShowModal(true);
    } else {
      setAllowedShowModal(false);
    }
  }, [multipleBetInput, totalProfit]);

  function showModal() {
    setShowConfirmModal(true);
  }

  function setBet(items) {
    setMobileLoader(true);
    let obj = {};
    let newBets = items.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      return obj;
    })
    let coeff = newBets.map(el => el.price).reduce((acc, rec) => acc * rec);
    // let coeff = items.map(el => el.value).reduce((acc, rec) => acc * rec);
    const betArrMultiple = {
      bet_request: 'Bet',
      id: items[0].betId,
      type: 'Multiple',
      summa_bet: multipleBetInput,
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

    API.setBet(token, betArrMultiple)
      .then(response => {
        setMobileLoader(false);
        setShowConfirmModal(false);
        if (response.data.data[0].status === 'OK') {
          dispatch(clearAllBets(!dropBets));
          dispatch(toggleToastText('Your bet has been accepted.'));
          dispatch(toggleToast(true));
          dispatch(updateUserInfo({ balance: response.data.data[0].balance }));
          setMultipleBetInput(0);
          setTotalProfit(0);
        }
        if (response.data.data[0].status !== 'OK') {
          console.log(response.data.data[0].error);
          dispatch(toggleErrorToastText(response.data.data[0].error));
          dispatch(toggleErrorToast(true));
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
        setMobileLoader(false);
        dispatch(toggleErrorToastText(err.response.data.message));
        dispatch(toggleErrorToast(true));
      })
  }



  return (
    <>
      {isMobile && betslip.map((el, i) =>
        <BetSlipMobile key={i} el={el} betOrQuote={props.betOrQuote} />
      )}
      {isMobile &&
        <BetslipBottom
          isSingle={false}
          multipleBetInput={multipleBetInput}
          setMultipleBetInput={setMultipleBetInput}
          el={betslip[0]}
          setTotalProfit={setTotalProfit}
          minMax={props.minMax}
        />
      }

      {isTablet &&
        <div className="betslip-bet-item">
          {betslip.map((el, i) =>
            <BetSlipTablet key={i} el={el} betOrQuote={props.betOrQuote} />
          )}
          <BetslipBottom
            isSingle={false}
            multipleBetInput={multipleBetInput}
            setMultipleBetInput={setMultipleBetInput}
            el={betslip[0]}
            setTotalProfit={setTotalProfit}
            minMax={props.minMax}
          />
        </div>
      }

      <div className="total-profit flex">
        <span className="font">
          {i18next.t("Total potential profit")}
        </span>
        <span>
          {mathRound(totalProfit, -2)}{getCurrency(currency)}
          {/* {roundToTwo(+totalProfit)}{getCurrency(currency)} */}
          {/* {(+totalProfit).toFixed(2)}{getCurrency(currency)} */}
        </span>
      </div>

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
            {i18next.t("Bet")}
            {allowedShowModal && <IonRippleEffect />}
          </button>
          <button
            className="bet-button clear-all ion-activatable"
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
        <div className="betslip-bet-buttons-container">
          <button
            className={`bet-button orange ion-activatable ${allowedShowModal ? '' : 'disabled'}`}
            onClick={() => {
              if (allowedShowModal) {
                showModal();
              }
            }}
          >
            <span>
              {i18next.t("Make a bet")}
            </span>
            {allowedShowModal && <IonRippleEffect />}
          </button>
          <button
            className="bet-button ion-activatable"
            onClick={() => {
              dispatch(clearAllBets(!dropBets));
              setTotalProfit(0);
            }}
          >
            <span></span>
            {i18next.t("Clear all")}
            <IonRippleEffect />
          </button>
        </div>
      }

      <ConfirmBetModal
        open={showConfirmModal}
        close={setShowConfirmModal}
        setBet={setBet}
        multipleBetInput={multipleBetInput}
        totalProfit={totalProfit}
        isSingle={false}
        mobileLoader={mobileLoader}
        setMobileLoader={setMobileLoader}
      />
    </>
  )
}

export default BetSlipMobileMultiple;
