import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IonInput, IonSpinner } from "@ionic/react";
import i18next from "i18next";
import { mathRound, roundToTwo } from "../../utils/utils";

const BetslipBottom = (props) => {
  const betslip = useSelector(state => state.betslip);
  const bets = useSelector(state => state.bets);
  const [betInput, setBetInput] = useState('');
  const [winInput, setWinInput] = useState('');
  const [focusWinInput, setFocusWinInput] = useState(false);
  const [focusBetInput, setFocusBetInput] = useState(false);

  function changeBetInputSingle(val) {
    if (!focusWinInput) {
      let bet = {};
      let arr = props.betInputs.map(el => {
        bet = bets.find(bet => bet.id === el.buttonId);
        if (el.matchId === props.el.matchId) {
          el.sumBet = +val;
          el.sumWin = mathRound(val * bet.price, -2);
          // el.sumWin = roundToTwo(+val * bet.price);
          // el.sumWin = (+val * bet.price).toFixed(2);
        }
        return el;
      })

      setBetInput(val);
      setWinInput(mathRound(val * bets.find(bet => bet.id === props.el.buttonId).price, -2));
      // setWinInput(roundToTwo(val * bets.find(bet => bet.id === props.el.buttonId).price));
      // setWinInput(val * bets.find(bet => bet.id === props.el.buttonId).price);
      props.setBetInputs(arr);
      props.setTotalProfit(arr.filter(it => it.sumWin).map(elem => +elem.sumWin).reduce((acc, rec) => acc + rec, 0));
    }

    if (!focusBetInput) {
      setBetInput(mathRound(val, -2));
      // setBetInput(roundToTwo(val));
      // setBetInput((+val).toFixed(2));
    }
  }

  function changeWinInputSingle(val) {
    if (focusWinInput) {
      let bet = {};
      let arr = props.betInputs.map(el => {
        bet = bets.find(bet => bet.id === el.buttonId);
        if (el.matchId === props.el.matchId) {
          el.sumWin = mathRound(+val / bet.price, -2);
          // el.sumWin = roundToTwo(+val / bet.price);
          // el.sumBet = (+val / bet.price).toFixed(2);
          el.sumWin = +val
        }
        return el;
      })

      setWinInput(val);
      setBetInput(val / bets.find(bet => bet.id === props.el.buttonId).price);
      props.setBetInputs(arr);
      props.setTotalProfit(arr.filter(it => it.sumWin).map(elem => +elem.sumWin).reduce((acc, rec) => acc + rec, 0));
    }
    if (!focusWinInput) {
      setWinInput(mathRound(val, -2));
      // setWinInput(roundToTwo(val));
      // setWinInput((+val).toFixed(2));
    }
  }

  function changeBetInputMultiple(val) {
    let obj = {};
    let newBets = betslip.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      return obj;
    })
    let tempWin = newBets.map(el => el.price).reduce((acc, rec) => acc * rec);

    if (!focusWinInput) {
      setBetInput(val);
      setWinInput(mathRound(val * tempWin, -2));
      // setWinInput(roundToTwo(val * tempWin));
      // setWinInput(val * tempWin);
      props.setMultipleBetInput(val);
      props.setTotalProfit(mathRound(val * tempWin, -2));
      // props.setTotalProfit(roundToTwo(val * tempWin));
      // props.setTotalProfit((val * tempWin).toFixed(2));
    }

    if (!focusBetInput) {
      setBetInput(mathRound(val, -2));
      // setBetInput(roundToTwo(+val));
      // setBetInput((+val).toFixed(2));
    }
  }

  function changeWinInputMultiple(val) {
    if (focusWinInput) {
      let obj = {};
      let newBets = betslip.map(el => {
        obj = bets.find(bet => bet.id === el.buttonId);
        return obj;
      })

      setWinInput(val);
      setBetInput(val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec));
      props.setMultipleBetInput(mathRound((val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)) , -2));
      // props.setMultipleBetInput(roundToTwo(val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)));
      // props.setMultipleBetInput((val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)).toFixed(2));
      props.setTotalProfit(val);
    }

    if (!focusWinInput) {
      setWinInput(mathRound(val, -2));
      // setWinInput(roundToTwo(+val));
      // setWinInput((+val).toFixed(2));
    }
  }



  return (
    <>
      <div className="betslip-fields labels flex">
        <div>
          {i18next.t("To Lose")}
        </div>
        <div>
          {i18next.t("To Win")}
        </div>
      </div>
      <div className="betslip-fields flex">
        <IonInput
          className="to-risk"
          inputmode="numeric"
          type="number"
          value={betInput}
          placeholder={i18next.t("Bet amount")}
          onIonFocus={() => setFocusBetInput(true)}
          onIonBlur={() => setFocusBetInput(false)}
          onIonChange={e => {
            if (props.isSingle) {
              changeBetInputSingle(e.detail.value);
            }
            if (!props.isSingle) {
              changeBetInputMultiple(e.detail.value);
            }
          }}
        >
        </IonInput>
        <IonInput
          inputmode="numeric"
          type="number"
          value={winInput}
          placeholder={i18next.t("Win amount")}
          onIonFocus={() => setFocusWinInput(true)}
          onIonBlur={() => setFocusWinInput(false)}
          onIonChange={e => {
            if (props.isSingle) {
              changeWinInputSingle(e.detail.value);
            }
            if (!props.isSingle) {
              changeWinInputMultiple(e.detail.value);
            }
          }}
        >
        </IonInput>
      </div>
      <div className="betslip-fields buttons flex">
        <div
          className="label min"
          onClick={() => props.minMax && setBetInput((+props.minMax.bet_min).toFixed(0))}
        >
          <span className="colored">
            {i18next.t("Min")}
          </span>
          <span>
            {props.minMax ? (+props.minMax.bet_min).toFixed(0) : <IonSpinner className="spinner-small" name="lines" />}
          </span>
        </div>
        <div
          className="label"
          onClick={() => setBetInput(0)}
        >
          <span className="colored">
            {i18next.t("Preset")}
          </span>
          <span>0</span>
        </div>
        <div
          className="label max"
          onClick={() => props.minMax && setBetInput((+props.minMax.bet_max).toFixed(0))}
        >
          <span className="colored">
            {i18next.t("Max")}
          </span>
          <span>
            {props.minMax ? (+props.minMax.bet_max).toFixed(0) : <IonSpinner className="spinner-small" name="lines" />}
          </span>
        </div>
        <div onClick={() => setBetInput(prev => +prev + 2000)}>+2K</div>
        <div onClick={() => setBetInput(prev => +prev + 5000)}>+5K</div>
        <div onClick={() => setBetInput(prev => +prev + 10000)}>+10K</div>
      </div>
    </>
  )
}

export default BetslipBottom;
