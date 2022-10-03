import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IonInput, IonSpinner } from "@ionic/react";
import i18next from "i18next";
import { mathRound, roundToTwo } from "../../utils/utils";

const BetSlipBottomQuote = (props) => {
  const betslip = useSelector(state => state.betslip);
  const bets = useSelector(state => state.bets);
  const [reqInput, setReqInput] = useState('');
  const [winInput, setWinInput] = useState('');
  const [focusInput, setFocusInput] = useState(false);

  function changeRequestInputSingle(val) {
    if (!focusInput) {
      setReqInput(val);
      setWinInput('');
      props.setRiskOrWin('risk');
      props.setRequestInput(val);
      props.setTotalProfit(mathRound(val * bets.find(bet => bet.id === props.el.buttonId).price, -2));
      // props.setTotalProfit(roundToTwo(val * bets.find(bet => bet.id === props.el.buttonId).price));
      // props.setTotalProfit((val * bets.find(bet => bet.id === props.el.buttonId).price).toFixed(2));
    }
  }

  function changeWinInputSingle(val) {
    if (focusInput) {
      setWinInput(val);
      setReqInput('');
      props.setRiskOrWin('win');
      props.setTotalProfit(val);
      props.setRequestInput(mathRound(val / bets.find(bet => bet.id === props.el.buttonId).price, -2));
      // props.setRequestInput(roundToTwo(val / bets.find(bet => bet.id === props.el.buttonId).price));
      // props.setRequestInput((val / bets.find(bet => bet.id === props.el.buttonId).price).toFixed(2));
    }
  }

  function changeRequestInputMultiple(val) {
    let obj = {};
    let newBets = betslip.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      return obj;
    })
    let tempWin = newBets.map(el => el.price).reduce((acc, rec) => acc * rec);
    // let tempWin = betslip.map(el => el.value).reduce((acc, rec) => acc * rec);
    if (!focusInput) {
      setReqInput(val);
      setWinInput('');
      props.setRiskOrWin('risk');
      props.setMultipleRequestInput(val);
      props.setTotalProfit(mathRound(val * tempWin, -2));
      // props.setTotalProfit(roundToTwo(val * tempWin));
      // props.setTotalProfit((val * tempWin).toFixed(2));
    }
  }

  function changeWinInputMultiple(val) {
    if (focusInput) {
      let obj = {};
      let newBets = betslip.map(el => {
        obj = bets.find(bet => bet.id === el.buttonId);
        return obj;
      })

      setWinInput(val);
      setReqInput('');
      props.setRiskOrWin('win');
      props.setTotalProfit(val);
      props.setMultipleRequestInput(mathRound((val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)), -2));
      // props.setMultipleRequestInput(roundToTwo(val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)));
      // props.setMultipleRequestInput((val / newBets.map(el => el.price).reduce((acc, rec) => acc * rec)).toFixed(2));
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
          disabled={props.isSingle && betslip.length !== 1}
          className="to-risk"
          inputmode="numeric"
          type="number"
          value={reqInput}
          placeholder={i18next.t("Will be calculated")}
          onIonChange={e => {
            if (props.isSingle) {
              changeRequestInputSingle(e.detail.value);
            }
            if (!props.isSingle) {
              changeRequestInputMultiple(e.detail.value);
            }
          }}
        >
        </IonInput>
        <IonInput
          disabled={props.isSingle && betslip.length !== 1}
          inputmode="numeric"
          type="number"
          value={winInput}
          placeholder={i18next.t("Will be calculated")}
          onIonFocus={() => setFocusInput(true)}
          onIonBlur={() => setFocusInput(false)}
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
      {((betslip.length === 1 && props.isSingle) || !props.isSingle) &&
        <div className="betslip-fields buttons flex">
          <div
            className="label min"
            onClick={() => props.minMax && setReqInput((+props.minMax.bet_min).toFixed(0))}
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
            onClick={() => setReqInput(0)}
          >
            <span className="colored">
              {i18next.t("Preset")}
            </span>
            <span>0</span>
          </div>
          <div
            className="label max"
            onClick={() => props.minMax && setReqInput((+props.minMax.bet_max_quote).toFixed(0))}
          >
            <span className="colored">
              {i18next.t("Max")}
            </span>
            <span>
              {props.minMax ? (+props.minMax.bet_max_quote).toFixed(0) : <IonSpinner className="spinner-small" name="lines" />}
            </span>
          </div>
          <div onClick={() => setReqInput(prev => +prev + 2000)}>+2K</div>
          <div onClick={() => setReqInput(prev => +prev + 5000)}>+5K</div>
          <div onClick={() => setReqInput(prev => +prev + 10000)}>+10K</div>
        </div>
      }
    </>
  )
}

export default BetSlipBottomQuote;
