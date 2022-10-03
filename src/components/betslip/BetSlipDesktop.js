import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBetslip } from "../../store/actions";
import moment from 'moment';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { getDate, getParticipantName, getPrice, getTime, getСompetitionLogo, getСompetitionName } from "../../utils/utils.js";
import i18next from "i18next";
import ChValue from "../ChValue";

const BetSlipDesktop = (props) => {
  const dispatch = useDispatch();
  const matches = useSelector(state => state.matches);
  const [match, setMatch] = useState({});
  const bets = useSelector(state => state.bets);
  const [bet, setBet] = useState({});
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const competitions = useSelector(state => state.competitions);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  useEffect(() => {
    setMatch(matches.find(el => el.id === props.el.matchId));
  }, [matches]);

  useEffect(() => {
    setBet(bets.find(el => el.id === props.el.buttonId));
  }, [bets]);

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

    // switch (string) {
    //   case 'win1':
    //     return `${'Win ' + match.team1}`
    //   case 'win2':
    //     return `${'Win ' + match.team2}`
    //   case 'win3':
    //     return `${'Draw'}`
    //   case true:
    //     return 'Both teams to score Yes'
    //   case false:
    //     return 'Both teams to score No'
    //   default:
    //     return `${string}`
    // }
  }

  function deleteBetSlip(match, button) {
    dispatch(addBetslip({
      matchId: match,
      buttonId: button,
    }))
  }

  return (
    <>
      {match.id && 
        <>
          <div className="betslip-header">
            <div className="betslip-header-top flex">
              <p className="match-info">
                {getParticipantName(participants[match.team1_id]) || match.team1} — {getParticipantName(participants[match.team2_id]) || match.team2}
              </p>
              <CloseIcon className="close-icon" onClick={() => deleteBetSlip(props.el.matchId, props.el.buttonId)} />
            </div>
            <div className="match-details">
              <img src={getСompetitionLogo(competitions[match.competition_id])} alt="logo" />
              <div className="detail flex">
                <p className="where">{getСompetitionName(competitions[match.competition_id]) || match.competition_name}</p>
                <p className="dot">·</p>
                <p className="when">
                  {getDate(match.starttime, dateFormat, timeZone)}
                  {', '}
                  {getTime(match.starttime, timeZone)}
                </p>
              </div>
            </div>
          </div>
          <div className="betslip-body">
            <div className="betslip-cont">
              <div className="betslip-title">
                <p>{getTypeString({ m_name: bet.market_name, name: bet.name, line: bet.line !== null ? bet.line : '' })}</p>
              </div>
              <div className={`betslip-val`}>
                {props.betOrQuote === 'bet' && 
                  <ChValue value={getPrice(bet.price, interfaceView, isComma)} />
                  // <p>{getPrice(bet.price, interfaceView, isComma)}</p>
                }
                {props.betOrQuote === 'quote' && <p className="text">
                  {i18next.t("To be quoted")}
                </p>}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default BetSlipDesktop;
