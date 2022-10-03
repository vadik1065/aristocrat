import React, { useState, useEffect } from 'react';
import { ReactComponent as Arrow } from '../../images/arrow.svg';
import EventsCard from "../cards/EventsCard.js";
// import FavoritesCard from "../cards/FavoritesCard.js";
import Loader from "../../components/Loader.js";
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getСompetitionLogo, getСompetitionName } from '../../utils/utils.js';
import i18next from 'i18next';
import moment from 'moment';



const LeagueContainer = (props) => {
  const matches = useSelector(state => state.matches.filter(el => el.competition_id === props.leagueId && el.matchstatus === (props.matchTypeValue === 'Live' ? 2 : 1)));
  const [filteredMatches, setFilteredMatches] = useState([]);
  const gl_matches = useSelector(state => state.matches);
  const [favorites, setFavorites] = useState([]);
  const competitions =  useSelector(state => state.competitions);
  const [competition, setCompetition] = useState({});
  const location = useLocation();
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [open, setOpen] = useState(false);
  const [curEvent, setCurEvent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const competitionsDict = useSelector(state => state.competitionsDict);

  useEffect(() => {
    if (competitions.some(el => el.id === props.leagueId)) {
      setCompetition(competitions.find(el => el.id === props.leagueId));
    }
  }, [competitions]);

  useEffect(() => {
    if (props.currentId === props.leagueId) {
      setOpen(true);
    }

    if (props.currentId !== props.leagueId) {
      setOpen(false);
    }
  }, [props.currentId, location.pathname]);

  useEffect(() => {
    if (!open) {
      setCurEvent('');
    }
  }, [open]);

  useEffect(() => {
    if (gl_matches.length) {
      setFavorites(gl_matches.filter(match => match.favorite === 1));
    }
  }, [gl_matches]);

  function getEvents(id) {
    props.setCurrentId(id);
    // !open && matches.length === 0 && setIsLoading(true);
    !open && props.propGetEvents(id); 
  }

  useEffect(() => {
    if (matches.length > 0) {
      setIsLoading(false);
    }
  }, [matches]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setFilter(props.segmentValue);
  }, [props.segmentValue]);

  function setFilter(e) {
    let today = moment();
    let tomorrow = moment().add(1, 'day');
    let more = moment().add(2, 'day');
    if (e === 'today') {
      setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(today, 'day')));
    } else if (e === 'tomorrow') {
      setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(tomorrow, 'day')));
    } else if (e === 'soon') {
      setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(more, 'day')));
    } else if (e === 'all') {
      setFilteredMatches(matches);
    }
  };

  return (
    <>
      {location.pathname !== '/favorites' && 
        <div className={"event-container " + (open ? 'open ' : 'closed ') + (themeAccent)}>
          <div
            onClick={() => {
              setOpen(!open);
              getEvents(props.leagueId);
            }}
            className={"league-title-container flex"}
          >
            <img src={getСompetitionLogo(competitionsDict[props.leagueId])} alt="img" />
            <div className='title-header-event-container'>
              <p className="league-title">{getСompetitionName(competitionsDict[props.leagueId]) || competition.name}</p>
            </div>
            <div className="badge-count flex">
              <p className="count">{props.count}</p>
            </div>
            <Arrow className="arrow-down" />
          </div>

          {location.pathname !== '/events' && !isLoading && open && matches.map(el => {
            return (
              <EventsCard
                dropBets={props.dropBets}
                matchId={el.id}
                key={el.id}
                curEvent={curEvent}
                setCurEvent={setCurEvent}
              />
            )})
          }

          {location.pathname === '/events' && !isLoading && open && filteredMatches.map(el => {
            return (
              <EventsCard
                dropBets={props.dropBets}
                matchId={el.id}
                key={el.id}
                curEvent={curEvent}
                setCurEvent={setCurEvent}
              />
            )})
          }

          {location.pathname !== '/events' && !isLoading && matches.length === 0 && (
            <p className="no-events">
              {i18next.t("No events on this date.")}
            </p>
          )}

          {location.pathname === '/events' && !isLoading && filteredMatches.length === 0 &&
            <div className='no-games'>
              {i18next.t("No events on this date.")}
            </div>
          }
          
          <Loader loader={isLoading}></Loader>
        </div>
      }

      {location.pathname === '/favorites' && 
        <div className={"event-container open " + (themeAccent)}>
          {favorites.map(el => 
            <EventsCard
              dropBets={props.dropBets}
              matchId={el.id}
              key={el.id}
              curEvent={curEvent}
              setCurEvent={setCurEvent}
            />
          )}
          {/* <Loader loader={isLoading}></Loader> */}
        </div>
      }
      
    </>
  )
}

export default LeagueContainer;
