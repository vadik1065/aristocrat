import { IonRippleEffect } from '@ionic/react';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js'
import {
  clearAllBets, editBetslip, toggleErrorToast, toggleErrorToastText,
  toggleToast, toggleToastText, updateUserInfo
} from '../../store/actions';
import { getCurrency, mathRound, roundToTwo } from '../../utils/utils.js';
import BetSlipMobile from '../BetSlipMobile';
import BetSlipTablet from '../BetSlipTablet.js';
import BetslipBottom from './BetSlipBottom';
import ConfirmBetModal from './ConfirmBetModal';



const BetSlipMobileSingle = (props) => {
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
  const [betInputs, setBetInputs] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mobileLoader, setMobileLoader] = useState(false);
  const [allowedShowModal, setAllowedShowModal] = useState(false);

  useEffect(() => {
    if (betslip.length > 0) {
      setBetInputs(betslip);
    }
  }, [betslip]);

  useEffect(() => {
    if (dropBets) {
      dispatch(clearAllBets(false));
    }
  }, [dropBets]);

  useEffect(() => {
    if (props.minMax.length === betInputs.length) {
      if (betInputs.map((el, i) => el.sumBet >= +props.minMax[i].bet_min && 
        el.sumBet <= +props.minMax[i].bet_max && 
        bets.find(bet => bet.id === el.buttonId).price <= +props.minMax[i].coefficient_max && 
        totalProfit <= +props.minMax[i].win_max).every(elem => elem)
      ) {
        setAllowedShowModal(true)
      } else {
        setAllowedShowModal(false)
      }
    }
  }, [betInputs, props.minMax]);

  function showModal() {
    setShowConfirmModal(true);
  }

  function setBet(items) {
    setMobileLoader(true);
    const betArrSingles = items.map((el, i) => {
      return {
        bet_request: 'Bet',
        id: el.betId,
        type: 'Single',
        summa_bet: betInputs[i].sumBet,
        price: bets.find(bet => bet.id === el.buttonId).price,
        summa_win: betInputs[i].sumWin,
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

    API.setBet(token, betArrSingles)
      .then(response => {
        setMobileLoader(false);
        setShowConfirmModal(false);
        if (response.data.data.every(el => el.status === 'OK')) {
          dispatch(clearAllBets(!dropBets));
          dispatch(toggleToastText('Your bet has been accepted.'));
          dispatch(toggleToast(true));
          setBetInputs([]);
          setTotalProfit(0);
        }
        if (response.data.data.some(el => el.status === 'OK')) {
          let sucObjects = response.data.data.filter(el => el.status === 'OK');
          let successEvents = [];
          sucObjects.map(el => successEvents.push(el.id));
          dispatch(editBetslip(successEvents));

          let temp = response.data.data.reverse();
          let o = temp.find(el => el.balance);
          dispatch(updateUserInfo({ balance: o.balance }));
        }
        if (response.data.data.some(el => el.status === 'Error')) {
          let errTexts = response.data.data.filter(elem => elem.error).map(el => el.error).join('\n');
          console.log(errTexts);
          // Для вывода принятой ставки, нужно будет доделать
          // let temp = response.data.data.filter(elem => elem.status === 'OK');
          // let tempBets = [];
          // let sucTexts = temp.map(el => {
          //   tempBets = betArrSingles.map(bet => {
          //     if (bet.id === el.id) {
          //       return bet.events[0].selection_id
          //     }
          //   })
          //   return el;
          // })
          dispatch(toggleErrorToastText(errTexts));
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
        <div key={i} className="betslip-container-single">
          <BetSlipMobile el={el} betOrQuote={props.betOrQuote} />
          <BetslipBottom
            isSingle={true}
            setBetInputs={setBetInputs}
            betInputs={betInputs}
            el={el}
            setTotalProfit={setTotalProfit}
            minMax={props.minMax[i]}
          />
        </div>
      )}

      {isTablet && betslip.map((el, i) =>
        <div key={i} className="betslip-bet-item">
          <BetSlipTablet el={el} betOrQuote={props.betOrQuote} />
          <BetslipBottom
            isSingle={true}
            setBetInputs={setBetInputs}
            betInputs={betInputs}
            el={el}
            setTotalProfit={setTotalProfit}
            minMax={props.minMax[i]}
          />
        </div>
      )}

      <div className="total-profit flex">
        <span className="font">
          {i18next.t("Total potential profit")}
        </span>
        <span>
          {mathRound(totalProfit, -2)}{getCurrency(currency)}
          {/* {roundToTwo(totalProfit)}{getCurrency(currency)} */}
          {/* {totalProfit.toFixed(2)}{getCurrency(currency)} */}
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
            <span>
              {i18next.t("Clear all")}
            </span>
            <IonRippleEffect />
          </button>
        </div>
      }

      <ConfirmBetModal
        open={showConfirmModal}
        close={setShowConfirmModal}
        setBet={setBet}
        betInputs={betInputs}
        isSingle={true}
        mobileLoader={mobileLoader}
        setMobileLoader={setMobileLoader}
      />
    </>
  )
}

export default BetSlipMobileSingle;
