import React, { useEffect, useState } from 'react';
import { getEvents, favoritesFilter, toggleLoader, setSportsId, betsFilter, getEventDetails, toggleLOB, setCompetitionId } from '../store/actions/index.js';
import '../css/leftbar.css';
import { IonSpinner, useIonViewWillLeave, } from "@ionic/react";
import { useDispatch, useSelector } from 'react-redux';
import url from '../axios.js';
import { ReactComponent as Filter } from '../images/filter.svg';
import { ReactComponent as Doots } from '../images/doots.svg';
import { ReactComponent as Clock } from '../images/clock.svg';
import { ReactComponent as SelectArrows } from '../images/select-arrows.svg';
import { ReactComponent as SearchIcon } from '../images/search-mini.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import * as API from '../api/functions.js';
import i18next from 'i18next';
import { useLocation } from 'react-router';
import { getСompetitionLogo, getСompetitionName } from '../utils/utils.js';
import { listFixtures } from '../store/tempSamples.js';

const SingleSport = (props) => {
  return (
    <li 
      onClick={() => {
        if (props.isChangeSports) {
          props.changeSportsDropdown(props.sport.id)
        }
      }}
      className={`flex ${props.isChangeSports ? '' : 'not-active'}`}
    >
      {props.sport.image && 
        <img
          className="sport-pic"
          alt="pic"
          src={`${url}/${props.sport.image}`}
        />
      }
      <p>{props.sport.name}</p>
    </li>
  )
}

const TournamentsList = (props) => {
  const competitionId = useSelector(state => state.competitionId);

  return (
    <>
      {props.competitions.length > 0 && 
        <div
          onClick={() => props.selectTournament('all')}
          className={`desktop-left-bar-list-item flex ${competitionId === 'all' ? 'choosen' : ''}`}
        >
          <div className='sport-type flex'>
            <p>{i18next.t("All")}</p>
            <Arrow className={`pic-right ${competitionId === 'all' ? 'choosen' : ''}`} />
          </div>
        </div>
      }
      {props.competitions.map((el, i) => {
        return (
          <SingleTournament
            key={i}
            el={el}
            selectTournament={props.selectTournament}
          />
        )})
      }
    </>
  )
}

const SingleTournament = (props) => {
  const competitionsDict = useSelector(state => state.competitionsDict);
  const competitionId = useSelector(state => state.competitionId);

  return (
    <div onClick={() => props.selectTournament(props.el.id)} className={`desktop-left-bar-list-item flex ${competitionId === props.el.id ? 'choosen' : ''}`}>
      <div className='sport-type flex'>
        <img
          className="sport-pic"
          alt="pic"
          src={getСompetitionLogo(competitionsDict[props.el.id])}
        />
        <p>{getСompetitionName(competitionsDict[props.el.id]) || props.el.name}</p>
        <Arrow className={`pic-right ${competitionId === props.el.id ? 'choosen' : ''}`} />
      </div>
    </div>
  );
}

const SingleFavTournament = (props) => {
  const competitionsDict = useSelector(state => state.competitionsDict);
  const competitionId = useSelector(state => state.competitionId);

  return (
    <div onClick={() => props.selectTournament(props.el.id)} className={`desktop-left-bar-list-item flex ${competitionId === props.el.id ? 'choosen' : ''}`}>
      <div className='sport-type flex'>
        <img
          className="sport-pic"
          alt="pic"
          src={getСompetitionLogo(competitionsDict[props.el.id])}
        />
        <p>{getСompetitionName(competitionsDict[props.el.id]) || props.el.name}</p>
        <Arrow className={`pic-right ${competitionId === props.el ? 'choosen' : ''}`} />
      </div>
    </div>
  );
}


const DesktopLeftBar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sportsId = useSelector(state => state.sportsId);
  const competitionId = useSelector(state => state.competitionId);
  const sports = useSelector(state => state.sports);
  const gl_competitions = useSelector(state => state.competitions);
  const matches = useSelector(state => state.matches);
  const token = useSelector(state => state.token);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const is4k = useSelector(state => state.width >= 3400);
  const loader = useSelector(state => state.loader);
  const favorites = useSelector(state => state.favorites);
  const [favsFilter, setFavsFilter] = useState([]);
  const [listToShow, setListToShow] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  const [leagueFilter, setLeagueFilter] = useState('');
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const temp_matches = useSelector(state => state.temp_matches);
  const allMatches = useSelector(state => state.allMatches);

  useEffect(() => {
    setFavsFilter(favorites)
  }, [favorites]);

  useEffect(() => {
    // dispatch(toggleLoader(true));
    if (gl_competitions.length) {
      // dispatch(toggleLoader(false));
      let arr = [];
      if (location.pathname === '/home') {
        arr = matches.filter(el => el.sport_id === sportsId).map(elem => elem.competition_id);
      }

      if (location.pathname === '/live') {
        arr = matches.filter(el => el.sport_id === sportsId && el.matchstatus === 2).map(elem => elem.competition_id);
      }

      if (location.pathname === '/events') {
        arr = matches.filter(el => el.sport_id === sportsId && el.matchstatus === 1).map(elem => elem.competition_id);
      }
      
      setCompetitions(gl_competitions.filter(comp => arr.some(el => el === comp.id)));
      // dispatch(setCompetitionId('all'));
    }
  }, [location.pathname, gl_competitions]);

  function selectTournament(id) {
    dispatch(toggleLoader(true));
    dispatch(getEventDetails([]));
    dispatch(toggleLOB(false));

    if (location.pathname === '/home') {
      if (id === 'all') {
        API.getEvents(token, { sportsId }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false))
          };
        })
      } else {
        API.getEvents(token, { sportsId, id }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false))
          };
        })
      }
    }

    if (location.pathname === '/live') {
      if (id === 'all') {
        API.getEvents(token, { sportsId, live: true }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false))
          };
        })
      } else {
        API.getEvents(token, { sportsId, id, live: true }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false))
          };
        })
      }
    }

    if (location.pathname === '/events') {
      if (id === 'all') {
        API.getEvents(token, { sportsId, live: false }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false));
            if (props.setSegmentValue) {
              props.setSegmentValue('all');
            }
          };
        })
      } else {
        API.getEvents(token, { sportsId, id, live: false }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(toggleLoader(false));
            if (props.setSegmentValue) {
              props.setSegmentValue('all');
            }
          }
        });
      }
    }

    dispatch(setCompetitionId(id));
  }

  function changeSportsDropdown(id) {
    dispatch(getEventDetails([]));
    dispatch(toggleLOB(false));
    setDropdownOpen(false);
    dispatch(setSportsId(id));

    dispatch(toggleLoader(true));
    API.getEvents(token, { sportsId: id }).then(res => {
      if (res.data.data.listFixtures) {
        dispatch(getEvents(res.data.data.listFixtures));
        dispatch(toggleLoader(false));
        dispatch(setCompetitionId('all'));
      };
    })
  }

  useIonViewWillLeave(() => {
    dispatch(getEventDetails([]));
    dispatch(toggleLOB(false));
    dispatch(setCompetitionId('all'));
    dispatch(betsFilter(''));
    // dispatch(getEvents([]));
  });

  // useEffect(() => {
  //   setActiveSport(sportsId);
  // }, [sportsId]);

  function changeBetsDropdown(id, name) {
    // setActiveSport(id);
    setDropdownOpen(false);
    dispatch(betsFilter(name));
  }

  function switchFavs(name) {
    dispatch(favoritesFilter(name));
    dispatch(setCompetitionId(name));
  }

  return (
    <div className={`desktop-left-bar-wrapper ${is4k ? 'ultra' : ''} ${themeAccent}`}>
      <div className={`desktop-left-bar ${themeAccent}`}>
        <div className={`left-bar-header flex ${themeAccent}`}>
          {/* <Doots className="doots filters-icon" />
          <div className="calendar-container flex">
            <Clock className="filters-icon" />
            <div className="calendar-label">Set time</div>
            <SelectArrows className="filters-icon" />
          </div>
          <div className="home-top-container-btns">
            <button className="btn-filter">
              <Filter className="filters-icon" />
            </button>
            <button className="btn-search">
              <SearchIcon className="filters-icon" />
            </button>
          </div> */}
        </div>

        {loader ? 
          <IonSpinner className="spinner-large center" name="lines" /> :
          <>
            {sports.length > 0 &&
              <div className="left-menu-selected-container">
                {/* {location.pathname === '/bets' && sportsList.length > 0 && sportsId &&
                  <div onClick={() => setDropdownOpen(!dropdownOpen)} className={`menu-sport-select-btn ${dropdownOpen ? 'open' : ''}`}>
                    <img
                      className="sport-pic"
                      alt="pic"
                      src={require('../images/games-icons/' + links.find(el => el.name === sportsList.find(el => el.id === sportsId).name).pic + '.png')}
                    />
                    <p>{sportsList.find(el => el.id === sportsId).name}</p>
                    <Arrow className="pic-right"/>
                  </div>
                }
                {dropdownOpen &&  location.pathname === '/bets' && 
                  <ul className="dropdown-menu">
                    {
                      sportsList.map((el, i) => {
                      
                            return (
                              <li onClick={() => {changeBetsDropdown(el.id, el.name)}} className='flex' key={i}>
                                <img
                                  className="sport-pic"
                                  alt="pic"
                                  src={require('../images/games-icons/' + links.find(elem => elem.name === el.name).pic + '.png')}
                                />
                                <p>{el.name}</p>
                              </li>
                            )
                          
                        })
                    }
                  </ul>
                } */}
                {location.pathname !== '/favorites' && location.pathname !== '/bets' &&
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`menu-sport-select-btn ${dropdownOpen ? 'open' : ''}`}
                  >
                    <img
                      className="sport-pic"
                      alt="pic"
                      src={`${url}/${sports.find(el => el.id === sportsId).image}`}
                    />
                    <p>{sports.find(el => el.id === sportsId).name}</p>
                    <Arrow className="pic-right" />
                  </div>
                }
                {dropdownOpen && location.pathname !== '/bets' &&
                  <ul className="dropdown-menu">
                    {location.pathname === '/home' &&
                      sports
                        // .filter((elem) => elem.cnt_inplay > 0 || elem.cnt_prematch > 0)
                        .map((el, i) => {
                          if (sports.find(el => el.id === sportsId).name !== el.name) {
                            return (
                              <SingleSport 
                                key={i}
                                sport={el}
                                changeSportsDropdown={changeSportsDropdown}
                                isChangeSports={el.cnt_inplay > 0 || el.cnt_prematch > 0}
                              />
                            )
                          }
                        })
                    }

                    {location.pathname === '/live' &&
                      sports
                        // .filter((elem) => elem.cnt_inplay > 0)
                        .map((el, i) => {
                          if (sports.find(el => el.id === sportsId).name !== el.name) {
                            return (
                              <SingleSport 
                                key={i}
                                sport={el}
                                changeSportsDropdown={changeSportsDropdown}
                                isChangeSports={el.cnt_inplay > 0}
                              />
                            )
                          }
                        })
                    }

                    {location.pathname === '/events' &&
                      sports
                        // .filter((elem) => elem.cnt_prematch > 0)
                        .map((el, i) => {
                          if (sports.find(el => el.id === sportsId).name !== el.name) {
                            return (
                              <SingleSport 
                                key={i}
                                sport={el}
                                changeSportsDropdown={changeSportsDropdown}
                                isChangeSports={el.cnt_prematch > 0}
                              />
                            )
                          }
                        })
                    }
                  </ul>
                }
                <hr className='hor-line' />

                {location.pathname === '/home' &&
                  <TournamentsList 
                    competitions={competitions}
                    selectTournament={selectTournament}
                  />
                }

                {location.pathname === '/live' &&
                  <TournamentsList 
                    competitions={competitions}
                    selectTournament={selectTournament}
                  />
                }

                {location.pathname === '/events' &&
                  <TournamentsList 
                    competitions={competitions}
                    selectTournament={selectTournament}
                  />
                }
              </div>
            }
          </>
        }

        {/* {location.pathname === '/favorites' && favorites.map(elem => elem.tournament).filter((v, i, a) => a.indexOf(v) === i).map((el, i) => (
          <SingleFavTournament
            key={i}
            el={el}
            selectTournament={switchFavs}
          />
        ))} */}
      </div>
    </div>
  )
}

export default DesktopLeftBar;
