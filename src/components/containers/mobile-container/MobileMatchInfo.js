import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate, getParticipantLogo, getParticipantName, getTime } from '../../../utils/utils';
import { ReactComponent as More } from '../../../images/more.svg';
import { ReactComponent as Update } from '../../../images/update.svg';
import { ReactComponent as Star } from '../../../images/star.svg';
import { ReactComponent as Watch } from '../../../images/show.svg';
import { ReactComponent as Selected } from '../../../images/selected.svg';
import { setLiveWidgetMatchId } from '../../../store/actions';

const MobileMatchInfo = (props) => {
  const dispatch = useDispatch();
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const matches = useSelector(state => state.matches);
  const [match, setMatch] = useState({});

  useEffect(() => {
    if (props.matchId && matches.some(el => el.id === props.matchId)) {
      setMatch(matches.find(el => el.id === props.matchId));
    }
  }, [matches, props.matchId]);

  return (
    <>
      {isMobile && 
        <>
          <div className="event-card-header flex">
            <div className="left-side">
              <p className="time">{getTime(match.starttime, timeZone)}</p>
              <p className="date">{getDate(match.starttime, dateFormat, timeZone)}</p>
            </div>
            {match.matchstatus === 2 && match.matchsummary !== null &&
              <div className="card-event-live-time">{match.matchsummary.split(' ')[1].split(':')[0]}{'`'}</div>
            }
            <div className="right-side flex">
              <Watch
                onClick={() => {
                  dispatch(setLiveWidgetMatchId(match.id));
                  props.setShowWidgetModal(true)
                }}
                className={`watch-icon ${props.showWidgetModal ? 'activated' : ''}`}
              />
              <Star
                onClick={() => props.setFav(match.id, match.favorite ? 0: 1)}
                className={"star-icon " + (match.favorite === 1 ? 'activated' : '')}
              />
              <More
                className={`more-icon ${props.isLarge ? 'orange' : ''}`}
                onClick={() => props.toggleAllBets()}
              />
            </div>
          </div>
          <div className="teams-vs flex">
            <div className="team flex">
              <p>{getParticipantName(participants[match.team1_id]) || match.team1}</p>
              {/* <img src={getParticipantLogo(participants[match.team1_id])} alt="participant1" /> */}
            </div>
            <div className="dash">—</div>
            <div className="team flex team-2">
              {/* <img src={getParticipantLogo(participants[match.team2_id])} alt="participant2" /> */}
              <p>{getParticipantName(participants[match.team2_id]) || match.team2}</p>
            </div>
          </div>
          {match.matchstatus === 2 && match.matchsummary !== null &&
            <div className="match-item-score flex">
              <p className={(match.matchsummary.split(' ')[0].split('-')[0] > match.matchsummary.split(' ')[0].split('-')[1] ? 'leader' : "")}>
                {match.matchsummary.split(', ')[0].split('-')[0]}
              </p>
              <span>—</span>
              <p className={(match.matchsummary.split(' ')[0].split('-')[1] > match.matchsummary.split(' ')[0].split('-')[0] ? 'leader' : "")}>
                {match.matchsummary.split(', ')[0].split('-')[1]}
              </p>
            </div>
          }
        </>
      }

      {isTablet && 
        <div className="event-card-header flex">
          <div className="left-side">
            <p className="time">{getTime(match.starttime, timeZone)}</p>
            <p className="date">{getDate(match.starttime, dateFormat, timeZone)}</p>
          </div>
          {match.matchstatus === 2 && match.matchsummary !== null &&
            <div className="card-event-live-time">{match.matchsummary.split(' ')[1].split(':')[0]}{'`'}</div>
          }
          {/* <img src={getParticipantLogo(participants[match.team1_id])} alt="participant1" className="event-card-team-pic" /> */}
          {/* <img src={getParticipantLogo(participants[match.team2_id])} alt="participant2" className="event-card-team-pic" /> */}
          <div className="teams-vs">
            <div className="team flex">
              <p>{getParticipantName(participants[match.team1_id]) || match.team1}</p>
              {match.matchstatus === 2 && match.matchsummary !== null &&
                <div className="card-event-match-item-score">
                  {match.matchsummary.split(' ')[0].split('-')[0] > match.matchsummary.split(' ')[0].split('-')[1] ? <Selected className="selected arrow-right" /> : ""}
                  <p className={(match.matchsummary.split(' ')[0].split('-')[0] > match.matchsummary.split(' ')[0].split('-')[1] ? 'leader' : "")}>
                    {match.matchsummary.split(' ')[0].split('-')[0].split(',')[0]}
                  </p>
                </div>
              }
            </div>
            <div className="team flex team-2">
              <p>{getParticipantName(participants[match.team2_id]) || match.team2}</p>
              {match.matchstatus === 2 && match.matchsummary !== null &&
                <div className="card-event-match-item-score">
                  {match.matchsummary.split(' ')[0].split('-')[1] > match.matchsummary.split(' ')[0].split('-')[0] ? <Selected className="selected arrow-right" /> : ""}
                  <p className={(match.matchsummary.split(' ')[0].split('-')[1] > match.matchsummary.split(' ')[0].split('-')[0] ? 'leader' : "")}>
                    {match.matchsummary.split(' ')[0].split('-')[1].split(',')[0]}
                  </p>
                </div>
              }
            </div>
          </div>
          <div className="right-side flex">
            <Watch
              onClick={() => {
                dispatch(setLiveWidgetMatchId(match.id));
                props.setShowWidgetModal(true)
              }}
              className={`watch-icon ${props.showWidgetModal ? 'activated' : ''}`}
            />
            <Star
              onClick={() => props.setFav(match.id, match.favorite ? 0: 1)}
              className={"star-icon " + (match.favorite === 1 ? 'activated' : '')}
            />
            {/* <Update className="update-icon" /> */}
            <More
              className={`more-icon ${props.isLarge ? 'orange' : ''}`}
              onClick={() => props.toggleAllBets()}
            />
          </div>
        </div>
      }
    </>
  )
}

export default MobileMatchInfo;
