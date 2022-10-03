import React from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../Loader';
import { getDate, getParticipantName, getPrice, getTime, getСompetitionLogo, getСompetitionName } from '../../utils/utils';
import i18next from 'i18next';
import ChValue from '../ChValue';



const EventInfo = (props) => {
  const match = useSelector(state => state.matches.find(el => el.id === props.event.matchId));
  const bet = useSelector(state => state.bets.find(el => el.id === props.event.buttonId));
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
          <div className="betslip-val">
            <ChValue value={getPrice(bet.price, interfaceView, isComma)} />
            {/* <p>{getPrice(bet.price, interfaceView, isComma)}</p> */}
          </div>
        </div>
        {props.isSingle &&
          <div className="to-risk-to-win-container">
            <div className="to-risk-to-win-item">
              <div className="to-risk-to-win-item-label">
                {i18next.t("To Lose")}
              </div>
              <div className="to-risk-to-win-item-value">{props.eventInputs && props.eventInputs.sumBet}</div>
            </div>
            <div className="to-risk-to-win-item">
              <div className="to-risk-to-win-item-label">
                {i18next.t("To Win")}
              </div>
              <div className="to-risk-to-win-item-value">
                {props.eventInputs && props.eventInputs.sumWin}
              </div>
            </div>
          </div>
        }
      </div>
      {!props.isSingle && props.lastIdx === props.idx &&
        <div className="to-risk-to-win-container">
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Lose")}
            </div>
            <div className="to-risk-to-win-item-value">{props.multipleBetInput && props.multipleBetInput}</div>
          </div>
          <div className="to-risk-to-win-item">
            <div className="to-risk-to-win-item-label">
              {i18next.t("To Win")}
            </div>
            <div className="to-risk-to-win-item-value">{props.totalProfit && props.totalProfit}</div>
          </div>
        </div>
      }
    </>
  )
}



const ConfirmBetModal = (props) => {
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
          {props.isSingle &&
            betslip.map((event, i) =>
              <EventInfo
                key={i}
                event={event}
                eventInputs={props.betInputs[i]}
                isSingle={props.isSingle}
              />
            )
          }
          {!props.isSingle &&
            betslip.map((event, i) =>
              <EventInfo
                key={i}
                event={event}
                multipleBetInput={+props.multipleBetInput}
                totalProfit={+props.totalProfit}
                lastIdx={betslip.length - 1}
                idx={i}
                isSingle={props.isSingle}
              />
            )
          }
          <Loader loader={props.mobileLoader}></Loader>
          <div className="input-container buttons flex">
            <div
              onClick={() => props.setBet(betslip)}
              className="repay-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Confirm bet")}
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

export default ConfirmBetModal;
