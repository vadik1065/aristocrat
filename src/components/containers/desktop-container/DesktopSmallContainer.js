import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDate, getFullDate, getParticipantName, getTime } from "../../../utils/utils";
import { ReactComponent as Star } from '../../../images/star.svg';
import { ReactComponent as Watch } from '../../../images/show.svg';
import MoneyLine from "./MoneyLine";
import { setLiveWidgetMatchId } from "../../../store/actions";

const DesktopSmallContainer = (props) => {
  const dispatch = useDispatch();
  const match = useSelector(state => state.matches.find(el => el.id === props.link));
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const participants = useSelector(state => state.participants);
  const [markName, setMarkName] = useState('');

  useEffect(() => {
    if (match.id) {
      if (match.markets.some(mark => mark === '1X2')) {
        setMarkName('1X2');
      } 
      if (match.markets.some(mark => mark === '12')) {
        setMarkName('12');
      }
    }
  }, [match]);

  return (
    <div className={`small-desktop-live`}>
      <div className="small-desktop-header flex">
        <div className="small-desktop-header-left flex">
          <Star
            onClick={(e) => {
              e.stopPropagation();
              props.setFav(match.id, match.favorite ? 0: 1)
            }}
            className={"star-icon " + (match.favorite === 1 ? 'activated' : '')}
          />
          <Watch
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setLiveWidgetMatchId(match.id));
              props.setShowWidgetModal(true);
            }}
            className={`watch-icon ${props.showWidgetModal ? 'activated' : ''}`}
          />
          <p>{getParticipantName(participants[match.team1Id]) || match.team1} — {getParticipantName(participants[match.team2Id]) || match.team2}</p>
        </div>
        <p className="date">
          {match.matchstatus !== 2 && getFullDate(match.starttime, dateFormat, timeZone)}
          {match.matchstatus === 2 && getTime(match.starttime, dateFormat, timeZone)}
        </p>
        {match.matchsummary !== null &&
          <div className="card-event-live-time">{match.matchsummary.split(' ')[1].split(':')[0]}{'`'}</div>
        }
      </div>
      <div className="small-desktop-body">
        <MoneyLine
          matchId={props.link}
          marketId={markName}
          checkSelected={props.checkSelected}
        />
      </div>
    </div>
  )
}

export default DesktopSmallContainer;
