import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBetslip } from "../store/actions";
import url from '../axios';
import moment from 'moment';
import defaultTourLogo from "../images/leagues/uefa.png";
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import { getDate, getParticipantName, getPrice, getTime, getСompetitionLogo, getСompetitionName } from "../utils/utils";
import i18next from "i18next";
import ChValue from "./ChValue";



const BetSlipTablet = (props) => {
  const dispatch = useDispatch();
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const competitions = useSelector(state => state.competitions);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const match = useSelector(state => state.matches.find(el => el.id == props.el.matchId));
  const bet = useSelector(state => state.bets.find( el => el.id == props.el.buttonId));

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
    <div className="betslip-bet-item-top">
      <div className="betslip-bet-item-header flex">
        <div className="betslip-bet-item-teams">
          {getParticipantName(participants[match.team1_id]) || match.team1} — {getParticipantName(participants[match.team2_id]) || match.team2}
        </div>
        <CloseIcon
          className="close-icon"
          onClick={() => deleteBetSlip(props.el.matchId, props.el.buttonId)}
        />
      </div>
      <div className="betslip-bet-match-details flex">
        <img src={getСompetitionLogo(competitions[match.competition_id])} alt="logo" />
        <div className="detail flex">
          <p className="where">{getСompetitionName(competitions[match.competition_id]) || match.competition_name}</p>
          <p className="dot">·</p>
          <p className="when">
            {getDate(match.starttime, dateFormat, timeZone)}, {getTime(match.starttime, timeZone)}
          </p>
        </div>
      </div>
      <div className="betslip-bet-item-center flex">
        <div className="betslip-bet-label">
          <p>{getTypeString({ m_name: bet.market_name, name: bet.name, line: bet.line !== null ? bet.line : '' })}</p>
        </div>
        {/* <div className="betslip-graph-btn-container">
          <div
            className={`graph-button ${openGraph && 'pressed'}`}
            onClick={() => setOpenGraph(!openGraph)}
          />
        </div> */}
        <div className="betslip-bet-value">
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
      {/* {openGraph && <div className="betslip-graph-container"></div>} */}
    </div>
  );
};

export default BetSlipTablet;
