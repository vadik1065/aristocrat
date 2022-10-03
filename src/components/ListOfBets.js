import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../api/functions.js';
import { ReactComponent as SettingsIcon } from '../images/settings.svg';
import { ReactComponent as More } from '../images/more.svg';
import { ReactComponent as Update } from '../images/update.svg';
import { ReactComponent as Star } from '../images/star.svg';
import '../css/listOfBets.css';
import { changeFavorite, getEventDetails, toggleLOB } from '../store/actions/index.js';
import { ReactComponent as Close } from '../images/close.svg';
import Loader from './Loader';
import { capitalize, getFullDate, getParticipantName } from '../utils/utils.js';
import i18next from 'i18next';
import DesktopBetMarketContainer from './containers/desktop-container/DesktopBetMarketContainer.js';
import useSortMarkets from '../hooks/useSortMarkets.js';

const ListOfBets = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const matchId = useSelector(state => state.matchId);
  const match = useSelector(state => state.matches.find(el => el.id === matchId));
  // const bets = useSelector(state => state.bets.filter(el => el.match_id === matchId));
  const gl_bets = useSelector(state => state.bets);
  const sortMarkets = useSortMarkets(matchId);
  const is4k = useSelector(state => state.width >= 3400);
  const participants = useSelector(state => state.participants);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [isFirstHalf, setFirstHalf] = useState(false);
  const [filter, setFilter] = useState(['all']);

  const chooseFilter = (name, arr) => {
    let tempArr = arr;

    if (name === 'all') {
      setFilter(['all']);
    } else if (!tempArr.includes(name)) {
      tempArr = tempArr.filter(el => el !== 'all');
      setFilter([...tempArr, name]);
    } else if (tempArr.includes(name)) {
      tempArr = tempArr.filter(el => el !== 'all' && el !== name);
      if (tempArr.length === 0) {
        setFilter(['all']);
      } else {
        setFilter(tempArr);
      }
    }
  }

  function setFav(id, favorite) {
    API.setFavorite(token, { id, favorite });
    dispatch(changeFavorite({ id, favorite }));
  }

  return (
    <div className={`desktop-list-of-bets-wrapper`}>
      <div className={`list-of-bets ${themeAccent} ${is4k ? 'ultra' : ''}`}>
        <Loader />
        {match.id &&
          <>
            <div className="desktop-live-container-header flex">
              <div className="title">
                {getParticipantName(participants[match.team1Id]) || match.team1} — {getParticipantName(participants[match.team2Id]) || match.team2}
              </div>
              <div className="time">
                {getFullDate(match.starttime, dateFormat, timeZone)}
              </div>
              <Close className="close-betslip-icon" onClick={() => {
                dispatch(getEventDetails([]));
                dispatch(toggleLOB(false));
              }

              } />
            </div>
            <div className="list-of-bets-body">
              <div className="list-of-bets-filter-container flex">
                <div className="list-of-bets-filter-btns flex">
                  <div
                    className={`list-of-bets-filter-btn ${filter.includes('all') && 'bright'}`}
                    onClick={() => chooseFilter('all', [])}
                  >
                    {i18next.t("All")}
                    {filter.includes('all') && <div className="btn-hl"></div>}
                  </div>

                  {sortMarkets.map((bet, i) => {
                    return (
                      <div
                        key={i}
                        className={`list-of-bets-filter-btn ${filter.includes(bet) && 'bright'}`}
                        onClick={() => chooseFilter(bet, filter)}
                      >
                        {capitalize(bet)}
                        {filter.includes(bet) && <div className="btn-hl"></div>}
                      </div>
                    )
                  })}
                </div>
                {/* <div className="list-of-bets-filter-settings flex">
                  <SettingsIcon />
                </div> */}
              </div>

              <div className="list-of-bets-header flex">
                <div className="list-of-bets-header-left">
                  {i18next.t("List of bets")}
                </div>
                <div className="list-of-bets-header-right flex">
                  {/* <div className="card-event-toggle-container">
                    <div className="card-event-toggle-first-label">FT</div>
                    <IonToggle
                      className='toggle-card full-half'
                      checked={isFirstHalf}
                      onIonChange={e => setFirstHalf(e.detail.checked)}
                    />
                    <div className="card-event-toggle-second-label">1H</div>
                  </div> */}
                  {/* <More className="more-icon" /> */}
                  {/* <Update className="update-icon" /> */}
                  <Star
                    onClick={() => setFav(match.id, match.favorite ? 0: 1)}
                    className={"star-icon " + (match.favorite === 1 ? 'activated' : '')}
                  />
                </div>
              </div>

              <div className="desktop-stakes-line">
                {sortMarkets.map(mark =>
                  ((filter.includes('all') || filter.includes(mark)) &&
                    <DesktopBetMarketContainer
                      key={mark}
                      marketName={mark}
                      marketList={gl_bets.filter(el => el.match_id === matchId && el.market_name === mark)}
                    />
                  )
                )}
                
                {/* {match.markets
                  .filter(el => bets.some(bet => bet.market_name === el && bet.status === 1 && !asianHandicaps.includes(bet.market_name)))
                  .map(mark =>
                    ((filter.includes('all') || filter.includes(mark)) &&
                      <SingleBetMarket
                        team1={match.team1}
                        team2={match.team2}
                        team1Id={match.team1_id}
                        team2Id={match.team2_id}
                        tournamentId={match.competition_id}
                        tournament={competitionName}
                        matchId={match.id}
                        matchstatus={match.matchstatus}
                        time={match.starttime}
                        marketName={mark}
                        marketList={bets.filter(el => el.market_name === mark)}
                        key={mark} 
                      />
                    )
                  )
                }

                {match.markets
                  .filter(el => bets.some(bet => bet.market_name === el && asianHandicaps.includes(bet.market_name)))
                  .map((mark, i) =>
                    ((filter.includes('all') || filter.includes(mark)) &&
                      <AsianHandicapBetMarket
                        team1={match.team1}
                        team2={match.team2}
                        team1Id={match.team1_id}
                        team2Id={match.team2_id}
                        tournamentId={match.competition_id}
                        tournament={competitionName}
                        matchId={match.id}
                        matchstatus={match.matchstatus}
                        time={match.starttime}
                        marketName={mark}
                        marketList={bets.filter(el => el.market_name === mark)}
                        key={i} 
                      />
                    )
                  )
                } */}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default ListOfBets;
