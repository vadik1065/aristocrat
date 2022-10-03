import React, { useState, useEffect } from 'react';
import '../css/rightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllBets, toggleErrorToast, toggleErrorToastText,
  toggleToast, toggleToastText, updateUserInfo
} from '../store/actions/index.js';
import * as API from '../api/functions.js'
import { IonRippleEffect } from "@ionic/react";
import BetSlipDesktop from './betslip/BetSlipDesktop';
import BetslipBottom from './betslip/BetSlipBottom';
import ConfirmBetModal from './betslip/ConfirmBetModal';
import { getCurrency, mathRound, roundToTwo } from '../utils/utils';
import i18next from 'i18next';



const DesktopRightBarMultiple = (props) => {
  const dispatch = useDispatch();
  const dropBets = useSelector(state => state.dropBets);
  const token = useSelector(state => state.token);
  const currency = useSelector(state => state.user.currency);
  const betslip = useSelector(state => state.betslip);
  const matches = useSelector(state => state.matches);
  const bets = useSelector(state => state.bets);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const [multipleBetInput, setMultipleBetInput] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
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
    let coeff = newBets.map(el => el.price).reduce((acc, rec) => acc * rec, 0);

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
    props.setLoader(true);
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
        props.setLoader(false);
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
        props.setLoader(false);
        dispatch(toggleErrorToastText(err.response.data.message));
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
                <BetSlipDesktop
                  key={i}
                  el={el}
                  betOrQuote={props.betOrQuote}
                />
              )
            })}
            <BetslipBottom
              isSingle={false}
              multipleBetInput={multipleBetInput}
              setMultipleBetInput={setMultipleBetInput}
              el={betslip[0]}
              setTotalProfit={setTotalProfit}
              minMax={props.minMax}
              betOrQuote={props.betOrQuote}
            />
          </div>
          <div className="total-profit flex">
            <span className="font">
              {i18next.t("Total potential profit")}
            </span>
            <span>
              {mathRound(totalProfit, -2)}{getCurrency(currency)}
              {/* {roundToTwo(totalProfit)}{getCurrency(currency)} */}
              {/* {totalProfit}{getCurrency(currency)} */}
            </span>
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
            {allowedShowModal && <IonRippleEffect />}
            {i18next.t("Make a bet")}
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

      <ConfirmBetModal
        open={showConfirmModal}
        close={setShowConfirmModal}
        setBet={setBet}
        multipleBetInput={multipleBetInput}
        totalProfit={totalProfit}
        isSingle={false}
      />
    </>
  )
}

export default DesktopRightBarMultiple;
