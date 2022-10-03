import React, { useState } from 'react';
import { IonRippleEffect } from "@ionic/react";
import { ReactComponent as Selected } from '../images/selected.svg';
import CancelBetModal from './CancelBetModal';
import { useSelector } from 'react-redux';
import { getDate, getDateFromUnix, getParticipantName, getTime, getСompetitionLogo, getСompetitionName, mathRound, roundToTwo } from '../utils/utils';
import i18next from 'i18next';



const EventInfo = (props) => {
  // const bet = useSelector(state => state.bets.find(el => el.id == (props?.el?.Bet?.Id).toString()));
  const competitions = useSelector(state => state.competitions);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  function getTypeString({m_name, name, line}) {
    if (m_name === '1X2' || m_name === '12') {
      if (name === '1') {
        return `Win ${props.el.participant1}`;
      }
      if (name === 'X') {
        return `Draw`;
      }
      if (name === '2') {
        return `Win ${props.el.participant2}`;
      }
    } else {
      let result = `${name} ${line}`
      return result;
    }
  }

  return (
    <div className="bet-card-teams">
      <p className="teams-play">
        {getParticipantName(participants[props.el.participant1_id]) || props.el.participant1} — {getParticipantName(participants[props.el.participant2_id]) || props.el.participant2}
      </p>
      <div className='flex'>
        <div className="match-details">
          <img src={getСompetitionLogo(competitions[props.el.competition_id])} alt="logo" />
          <div className="detail flex">
            <p className="where">{getСompetitionName(competitions[props.el.competition_id]) || props.el.League}</p>
            <p className="dot">·</p>
            <p className="when">
              {getDate(props.el.starttime, dateFormat, timeZone)}, {getTime(props.el.starttime, timeZone)}
            </p>
          </div>
        </div>
        <div className="money-line flex">
          <div>
            <p>{getTypeString({ m_name: props.el.Market, name: props.el.Bet.Name, line: props.el.Bet.Line ? props.el.Bet.Line : '' })}</p>            
            {/* <p>{props.el.Selection && props.el.Selection.Tags.name}</p> */}
            {/* <p>{props.el.Market && props.el.Market.name}</p> */}
          </div>
          <div className="money-line-value">
            {mathRound(props.koeff, -2)}
            {/* {roundToTwo(+props.koeff)} */}
            {/* {(+props.koeff).toFixed(2)} */}
          </div>
        </div>
      </div>
    </div>
  )
}

const BetsCard = ({ bets, setListOfBets, setTotalBets }) => {
  const [open, setOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);

  return (
    <>
      {bets.type === 'Single' &&
        <div className="bet-card">
          <div className="bet-card-header flex">
            <p>
              {i18next.t("Bet")} {bets.id}
            </p>
            <p>
              {getDateFromUnix(bets.date_bet, dateFormat, timeZone)}
            </p>
          </div>
          {bets.data.map((el, i) =>
            <EventInfo
              key={i}
              el={el}
              koeff={bets.koefficient_max}
              isSingle={true}
            />
          )}
          <div className="bet-card-footer flex">
            <div className="bet-card-footer-left flex">
              <div className="to-risk">
                <p className="to-risk-top">
                  {i18next.t("To Lose")}
                </p>
                <p className="to-risk-bottom">{bets.summa_bet}</p>
              </div>
              <div className="to-win">
                <p className="to-win-top">
                  {i18next.t("To Win")}
                </p>
                <p className="to-win-bottom">{bets.summa_max}</p>
              </div>
            </div>
            <div className="bet-card-footer-right">
              {(bets.state === 'Lose' || bets.state === 'Win') &&
                <div className={'bet-card-footer-close flex bet-result-state ' + (bets.state.toLowerCase())}><p>{bets.state}</p></div>
              }
              {bets.state === 'Cancel' &&
                <div className={'bet-card-footer-close flex bet-result-state canceled'}>
                  <p>
                    {i18next.t("Canceled")}
                  </p>
                </div>
              }
              {bets.state === 'Open' && bets.refund_possible &&
                <div
                  className="bet-card-footer-close flex ion-activatable"
                  onClick={() => setShowCancelModal(true)}
                >
                  {i18next.t("Cancel")}
                  <IonRippleEffect />
                </div>
              }
            </div>
          </div>
        </div>
      }

      {bets.type === 'Multiple' &&
        <div className="bet-card">
          <div className="bet-card-header flex">
            <p>{i18next.t("Bet")} {bets.id}</p>
            <p>{getDateFromUnix(bets.date_bet, dateFormat, timeZone)}</p>
          </div>
          <div className="bet-card-multiple-container flex">
            <div className="bet-card-multiple-left">
              <p>
                {i18next.t("Multiple bet")}
              </p>
              <p>
                {bets.data.length} {i18next.t("events")}
              </p>
            </div>
            <div className="money-line-value">
              {mathRound(bets.koefficient_max, -2)}
              {/* {roundToTwo(bets.koefficient_max)} */}
              {/* {(bets.koefficient_max).toFixed(2)} */}
            </div>
          </div>
          <div className="bet-card-footer flex">
            <div className="bet-card-footer-left flex">
              <div className="to-risk">
                <p className="to-risk-top">
                  {i18next.t("To Lose")}
                </p>
                <p className="to-risk-bottom">{bets.summa_bet}</p>
              </div>
              <div className="to-win">
                <p className="to-win-top">
                  {i18next.t("To Win")}
                </p>
                <p className="to-win-bottom">{bets.summa_max}</p>
              </div>
            </div>
            <div className="bet-card-footer-right">
              {(bets.state === 'Lose' || bets.state === 'Win') &&
                <div className={'bet-card-footer-close flex bet-result-state ' + (bets.state.toLowerCase())}><p>{bets.state}</p></div>
              }
              {bets.state === 'Cancel' &&
                <div className={'bet-card-footer-close flex bet-result-state canceled'}>
                  <p>
                    {i18next.t("Canceled")}
                  </p>
                </div>
              }
              {bets.state === 'Open' && bets.refund_possible &&
                <div
                  className="bet-card-footer-close flex ion-activatable"
                  onClick={() => setShowCancelModal(true)}
                >
                  {i18next.t("Cancel")}
                  <IonRippleEffect />
                </div>
              }
            </div>
          </div>
          {bets.data.map((el, i) => {
            return (
              <div key={i} className={`bet-card-details ${open ? 'open' : ''}`}>
                <EventInfo
                  key={i}
                  el={el}
                  koeff={el.Bet.Price}
                  isSingle={false}
                  open={open}
                />
              </div>
            )
          })}
          <div
            className="show-bets-list flex ion-activatable"
            onClick={() => setOpen(!open)}
          >
            <IonRippleEffect />
            <p className="show-bets-list-p">{open ? 'Hide bet list' : 'Show bet list'}</p>
            <Selected className={`show-bets-list-image ${open ? 'rotate' : ''}`} />
          </div>
        </div>
      }

      <CancelBetModal
        open={showCancelModal}
        close={setShowCancelModal}
        bets={bets}
        setListOfBets={setListOfBets}
        setTotalBets={setTotalBets}
      />
    </>
  )
}

export default BetsCard;
