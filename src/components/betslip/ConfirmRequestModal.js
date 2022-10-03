import React, { useEffect, useState } from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../Loader';
import { getDate, getParticipantName, getTime, getСompetitionLogo, getСompetitionName } from '../../utils/utils';
import i18next from 'i18next';

const EventInfo = (props) => {
  const matches = useSelector(state => state.matches);
  const [match, setMatch] = useState({});
  const bets = useSelector(state => state.bets);
  const [bet, setBet] = useState({});
  const participants = useSelector(state => state.participants);
  const competitions = useSelector(state => state.competitions);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  useEffect(() => {
    setMatch(matches.find(el => el.id === props?.event?.matchId));
  }, [matches, props.event]);

  useEffect(() => {
    setBet(bets.find(el => el.id === props?.event?.buttonId));
  }, [bets, props.event]);

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

  // function getTypeString(string) {
  //   switch (string) {
  //     case 'win1':
  //       return `${'Win ' + props.event.team1}`
  //     case 'win2':
  //       return `${'Win ' + props.event.team2}`
  //     case 'win3':
  //       return `${'Draw'}`
  //     case true:
  //       return 'Both teams to score Yes'
  //     case false:
  //       return 'Both teams to score No'
  //     default:
  //       return `${string}`
  //   }
  // }

  return (
    <>
      <div className="betslip-header">
        <div className="betslip-header-top flex">
          <p className="match-info">
            {getParticipantName(participants[match.team1_id]) || match.team1} — {getParticipantName(participants[match.team2_id]) || match.team2}
          </p>
        </div>
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
      </div>
      <div className="betslip-body">
        <div className="betslip-cont">
          <div className="betslip-title">
            <p>{getTypeString({ m_name: bet.market_name, name: bet.name, line: bet.line !== null ? bet.line : '' })}</p>
          </div>
          <div className="betslip-val quote">
            <p>
              {i18next.t("To be quoted")}
            </p>
          </div>
        </div>
      </div>
      {props.isSingle &&
        <div className="to-risk-to-win-container">
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Lose")}
            </div>
            <div className="to-risk-to-win-item-value">
              {props.riskOrWin === 'risk' ? props.requestInput : 'Will be calculated'}
            </div>
          </div>
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Win")}
            </div>
            <div className="to-risk-to-win-item-value">
              {props.riskOrWin === 'win' ? props.totalProfit : 'Will be calculated'}
            </div>
          </div>
        </div>
      }
      {!props.isSingle && props.lastIdx === props.idx &&
        <div className="to-risk-to-win-container">
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Lose")}
            </div>
            <div className="to-risk-to-win-item-value">
              {props.riskOrWin === 'risk' ? props.multipleRequestInput : 'Will be calculated'}
            </div>
          </div>
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Win")}
            </div>
            <div className="to-risk-to-win-item-value">
              {props.riskOrWin === 'win' ? props.totalProfit : 'Will be calculated'}
            </div>
          </div>
        </div>
      }
    </>
  )
}

const ConfirmRequestModal = (props) => {
  const betslip = useSelector(state => state.betslip);
  const themeAccent = useSelector(state => state.settings.theme.accent);

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={`auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>
            {i18next.t("Confirmation")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item w100">
          {betslip.length > 0 && props.isSingle &&
            <EventInfo
              event={betslip[0]}
              requestInput={props.requestInput}
              totalProfit={props.totalProfit}
              isSingle={props.isSingle}
              riskOrWin={props.riskOrWin}
            />
          }
          {betslip.length > 0 && !props.isSingle &&
            betslip.map((event, i) =>
              <EventInfo
                key={i}
                event={event}
                multipleRequestInput={+props.multipleRequestInput}
                totalProfit={+props.totalProfit}
                lastIdx={betslip.length - 1}
                idx={i}
                isSingle={props.isSingle}
                riskOrWin={props.riskOrWin}
              />
            )
          }
          <Loader loader={props.mobileLoader}></Loader>
          <div className="input-container buttons flex">
            <div
              onClick={() => props.setRequest(betslip)}
              className="repay-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Confirm quote")}
            </div>
            <div
              onClick={() => props.close(false)}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Cancel")}
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default ConfirmRequestModal;
