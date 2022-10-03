import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import "../../css/home.css";
import "../../css/colors.css";
import "../../css/isMobileV.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import LeagueContainer from "../containers/LeagueContainer";
import { getEvents, setCompetitionId, toggleLoader } from "../../store/actions";

const TabletContainer = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(state => state.token);
  const [disableInfiniteScroll] = useState(false);
  const [smallDeviceCounter, setSmallDeviceCounter] = useState(5);
  const sportsId = useSelector(state => state.sportsId);
  const [competitions, setCompetitions] = useState([]);
  const gl_matches = useSelector(state => state.matches);
  const [favorites, setFavorites] = useState([]);
  const dropBets = useSelector(state => state.dropBets);
  const [smallDevicesOpenCard, setSmallDevicesOpenCard] = useState('');

  useEffect(() => {
    if (gl_matches.length) {
      setCompetitions(
        Array.from(new Set(gl_matches.filter(el => el.sport_id === sportsId && el.matchstatus === (props.matchTypeValue === 'Live' ? 2 : 1)).map(elem => elem.competition_id)))
      );

      if (!smallDevicesOpenCard) {
        if (gl_matches.some(el => el.matchstatus == (props.matchTypeValue === 'Live' ? 2 : 1))) {
          setSmallDevicesOpenCard(gl_matches.find(elem => elem.matchstatus == (props.matchTypeValue === 'Live' ? 2 : 1) && elem.competition_id).competition_id);
        } else {
          setSmallDevicesOpenCard(gl_matches.find(elem => elem.competition_id).competition_id);
        }
      }

      setFavorites(gl_matches.filter(match => match.favorite === 1));
    }
  }, [gl_matches, props.matchTypeValue]);

  function searchNext(event) {
    function callback() {
      setSmallDeviceCounter(smallDeviceCounter => smallDeviceCounter + 5)
    }
    setTimeout(() => {
      //добавляем матчи в redux
      // dispatch(addMatches());
      callback();
      //выключение бесконечного скролла при необходимости
      // setDisableInfiniteScroll(true);
      (event.target).complete();
    }, 500);
  } 

  function propGetEvents(tourId) {
    // dispatch(toggleLoader(true));
    dispatch(setCompetitionId(tourId));
    // API.getEvents(token, { sportsId, live: true }).then(res => {
    //   if (res.data.data.listFixtures) {
    //     dispatch(getEvents(listFixtures));
    //     // dispatch(getEvents(res.data.data.listFixtures));
    //     dispatch(toggleLoader(false));
    //   }
    // })
  }

  return (
    <div className="tablet-cards-container">
      <div className={`home-top-container flex ${location.pathname === '/favorites' ? 'favs' : ''}`}>
        {location.pathname === '/home' &&
          <>
            <div className="home-top-container-label home-page">
              <div>{i18next.t(`${props.matchTypeValue === 'Live' ? 'Sports betting - live' : 'Prematch betting'}`)}</div>
              <Link to={`${props.matchTypeValue === 'Live' ? '/live' : '/events'}`}>
                {i18next.t(`View all`)} &gt;
              </Link>
            </div>
          </>
        }

        {location.pathname !== '/home' && 
          <>
            <div className="home-top-container-label">
              {location.pathname === '/live' && i18next.t("Live Games")}
              {location.pathname === '/events' && i18next.t("Events")}
              {location.pathname === '/favorites' && i18next.t("Favorites")}
            </div>
            {/* <div className="home-top-container-btns">
              <button className="btn-filter">
                <Filter className="filters-icon" />
              </button>
              <button className="btn-search">
                <SearchIcon className="filters-icon" />
              </button>
            </div> */}
          </>
        }
      </div>

      {location.pathname !== '/favorites' && gl_matches.filter(match => match.matchstatus === (props.matchTypeValue === 'Live' ? 2 : 1)).length === 0 &&
        <div className='no-games'>
          {i18next.t(`There are currently no ${props.matchTypeValue === 'Live' ? 'live' : ''} events.`)}
        </div>
      }

      {location.pathname === '/favorites' && favorites.length === 0 &&
        <div className='no-games'>
          {i18next.t("You have no favorite events.")}
        </div>
      }

      {location.pathname !== '/favorites' && competitions.map((comp, i) =>
        i < smallDeviceCounter &&
          <LeagueContainer
            key={comp}
            setCurrentId={setSmallDevicesOpenCard}
            currentId={smallDevicesOpenCard}
            propGetEvents={propGetEvents}
            count={gl_matches.filter(match =>  match.competition_id === comp && match.matchstatus === (props.matchTypeValue === 'Live' ? 2 : 1) ).length}
            dropBets={dropBets}
            leagueId={comp}
            matchTypeValue={props.matchTypeValue}
            segmentValue={props.segmentValue}
          />
      )}

      {location.pathname === '/favorites' && favorites.length > 0 &&
        <LeagueContainer dropBets={dropBets} />
      }

      <IonInfiniteScroll
        threshold="100px"
        disabled={disableInfiniteScroll}
        onIonInfinite={(e) => searchNext(e)}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </div>
  )
}

export default TabletContainer;
