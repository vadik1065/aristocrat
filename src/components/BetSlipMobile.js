import React from "react";
import { IonRippleEffect } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { addBetslip } from "../store/actions";
import moment from 'moment';
import { getDate, getParticipantName, getPrice, getTime, getСompetitionLogo, getСompetitionName } from "../utils/utils";
import i18next from "i18next";
import ChValue from "./ChValue";

const BetSlipMobile = (props) => {
  const dispatch = useDispatch();
  const match = useSelector(state => state.matches.find(el => el.id === props.el.matchId));
  const bet = useSelector(state => state.bets.find(el => el.id === props.el.buttonId));
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const competitions = useSelector(state => state.competitions);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  function getTypeString({m_name, name, line}) {
    if (m_name === '1X2' || m_name === '12') {
      if (name === '1') {
        return `Win ${match.team1}`;
      }
      if (name === 'X') {
        return `Draw`;
      }
      if (name === '2') {
        return `Win ${match.team2}`;
      }
    } else {
      let result = `${name} ${line}`
      return result;
    }
  }

  function deleteBetSlip(match, button) {
    dispatch(addBetslip({
      matchId: match,
      buttonId: button,
    }))
  }


  return (
    <div className="fullwidth">
      <div className="betslip-cont">
        <div className="betslip-title">
          <p>{getTypeString({ m_name: bet.market_name, name: bet.name, line: bet.line !== null ? bet.line : '' })}</p>
        </div>
        {/* <div className="betslip-btn">
          <div
            className={`graph-button ${openGraph && 'pressed'}`}
            onClick={() => setOpenGraph(!openGraph)}
          />
        </div> */}
        <div className="betslip-val">
          {props.betOrQuote === 'bet' && 
            <ChValue value={getPrice(bet.price, interfaceView, isComma)} />
            // <p>{getPrice(bet.price, interfaceView, isComma)}</p>
          }
          {props.betOrQuote === 'quote' && 
            <p className="text">
              {i18next.t("To be quoted")}
            </p>
          }
        </div>
      </div>
      <div className="betslip-info">
        <p className="match-info">
          {getParticipantName(participants[match.team1_id]) || match.team1} — {getParticipantName(participants[match.team2_id]) || match.team2}
        </p>
        <div className="match-details">
          <img src={getСompetitionLogo(competitions[match.competition_id])} alt="logo" />
          <div className="detail flex">
            <p className="where">{getСompetitionName(competitions[match.competition_id]) || match.competition_name}</p>
            <p className="dot">·</p>
            <p className="when">
              {getDate(match.starttime, dateFormat, timeZone)}, {getTime(match.starttime, timeZone)}
            </p>
          </div>
        </div>
        <button className="delete-bet ion-activatable" onClick={() => deleteBetSlip(props.el.matchId, props.el.buttonId)}>
          {i18next.t("Delete Bet")}
          <IonRippleEffect />
        </button>
      </div>
      {/* {openGraph && <div className="betslip-graph-container mobile"></div>} */}
    </div>
  );
};

export default BetSlipMobile;
