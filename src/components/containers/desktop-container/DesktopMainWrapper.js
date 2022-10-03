import { IonLabel, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import i18next from 'i18next';
import moment from 'moment';
import DesktopMatchContainer from '../DesktopMatchContainer';
import Loader from '../../Loader';
import { toggleLOB } from '../../../store/actions';

const DesktopMainWrapper = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const lob = useSelector(state => state.lob);
  const sportsId = useSelector(state => state.sportsId);
  const competitionId = useSelector(state => state.competitionId);
  const gl_matches = useSelector(state => state.matches);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState('');
  const is4k = useSelector(state => state.width >= 3400);
  const loader = useSelector(state => state.loader);
  const dropBets = useSelector(state => state.dropBets);
  const dealing = useSelector(state => state.settings.dealingView);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  // const [toggleTime, setToggleTime] = useState('ft');
  const [showListOfBets, setShowListOfBets] = useState(false);
  const [cardsIndex, setCardsIndex] = useState(15);
  const [link1X2, setLink1X2] = useState(false);

  useEffect(() => {
    if (gl_matches.length) {
      if (competitionId === 'all') {
        setMatches(gl_matches.filter(el => el.sport_id === sportsId && el.matchstatus === props.matchstatus));
      } else {
        setMatches(gl_matches.filter(el => el.sport_id === sportsId && el.competition_id === competitionId && el.matchstatus === props.matchstatus));
      }

      setFavorites(gl_matches.filter(match => match.favorite === 1));
    }
  }, [gl_matches]);

  useEffect(() => {
    if (matches.length) {
      if (page !== '/favorites') {
        setLink1X2(matches.some(match => match.markets.some(mark => mark === '1X2')));
      }

      if (props.segmentValue === 'all') {
        setFilteredMatches(matches);
      } else if (props.segmentValue === 'today') {
        setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(moment(), 'day')));
      } else if (props.segmentValue === 'tomorrow') {
        setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(moment().add(1, 'day'), 'day')));
      } else if (props.segmentValue === 'soon') {
        setFilteredMatches(matches.filter(el => moment.unix(el.starttime).isSame(moment().add(2, 'day'), 'day')));
      }
    }
  }, [matches]);

  useEffect(() => {
    if (page === '/favorites' && favorites.length === 0) {
      dispatch(toggleLOB(false));
    }
  }, [favorites]);

  useEffect(() => {
    setPage(location.pathname);
    if (location.pathname === '/favorites') {
      setLink1X2(true);
    }
  }, [location.pathname]);

  function setFilter(e) {
    props.setSegmentValue(e);
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

  //загрузка новых карточек - бесконечный скролл на десктопе
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      function callback() {
        setCardsIndex(cardsIndex => cardsIndex + 10);
      }
      setTimeout(() => {
        callback();
      }, 500);
    }
  }

  function desktopMainWrapperClassName(isHomePage) {
    return (
      `desktop-live-main-wrapper ${isHomePage ? 'h-50' : ''} ${is4k ? 'ultra' : ''} ${lob ? 'small' : 'big'} ${isHomePage && props.matchstatus === 1 ? 'prematch' : ''} ${themeAccent} ${page === '/favorites' ? 'desktop-favorites-main-wrapper' : ''}`
    )
  }

  function desktopMainBodyClassName() {
    return (
      `desktop-live-main-body ${page === '/home' && matches.length === 0 ? 'h-auto' : ''} ${page === '/events' && filteredMatches.length === 0 ? 'h-auto' : ''} ${page === '/favorites' && favorites.length === 0 ? 'h-auto' : ''}`
    )
  }

  function desktopEventCardsClassName() {
    return (
      `desktop-event-cards ${page === '/home' ? 'home-page' : ''} ${lob ? 'small' : ''} ${dealing === 'classic' ? 'classic' : ''} ${dealing === 'asian' ? 'asian' : ''}`
    )
  }

  return (
    <div className={desktopMainWrapperClassName(page === '/home')} >
      <div className={`desktop-live-main-container flex ${lob ? 'small' : 'big'}`}>
        <div className={`desktop-live-container-header ${page === '/home' ? 'home-page' : ''} flex`}>
          <p className="title">
            {page === '/home' &&
              <>
                {props.matchstatus === 2 && i18next.t("Sports betting - live")}
                {props.matchstatus === 1 && i18next.t("Prematch betting")}
              </>
            }
            {page === '/live' && i18next.t("Live Games")}
            {page === '/events' && i18next.t("Events")}
            {page === '/favorites' && i18next.t("Favorites")}
          </p>
          {page === '/home' &&
            <p className="label">
              <Link to={`${props.matchstatus === 2 ? '/live' : '/events'}`}>
                {i18next.t("View all")} &gt;
              </Link>
            </p>
          }
        </div>

        {page === '/live' &&
          <>
            {/* {!lob && <Loader/>} */}
            {loader ?
              <IonSpinner className="spinner-large center" name="lines" /> :
              <>
                {dealing == 'cis' && matches.length > 0 &&
                  <div className="titles-stakes flex">
                    {/* <p className="list-events-title">
                      {i18next.t("List of matches")}
                    </p> */}
                    {!lob &&
                      <>
                        {/* <IonSegment
                          mode={"ios"}
                          onClick={(e) => e.stopPropagation()}
                          onIonChange={e => setToggleTime(e.detail.value)}
                          value={toggleTime}
                          className="desktop-live-container-toggle horizontal"
                        >
                          <IonSegmentButton value="ft">
                            <IonLabel>FT</IonLabel>
                          </IonSegmentButton>
                          <IonSegmentButton value="1h">
                            <IonLabel>1H</IonLabel>
                          </IonSegmentButton>
                        </IonSegment> */}
                        <div className="titles-stakes-labels flex">
                          <div className='first-title flex'>
                            <span className="first-label">1</span>
                            {link1X2 && <span className="second-label">x</span>}
                            <span className="third-label">2</span>
                          </div>
                          <div className='second-title flex'>
                            <span>
                              {i18next.t("Handicap")}
                            </span>
                            <div className='gap'></div>
                          </div>
                          <div className='third-title flex'>
                            <span>
                              {i18next.t("Under/over")}
                            </span>
                            <div className='gap'></div>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                }
                {matches.length > 0 &&
                  <div className={`split-container flex ${dealing === 'classic' ? 'classic' : ''}`}>
                    <div className="desktop-live-cards">
                      {matches.map((el, i) => {
                        return (
                          <DesktopMatchContainer
                            key={i}
                            isodd={i}
                            dropBets={dropBets}
                            link={el.id}
                            showListOfBets={showListOfBets}
                            setShowListOfBets={setShowListOfBets}
                            setCurrentMatchDetails={props.setCurrentMatchDetails}
                            currentMatchDetails={props.currentMatchDetails}
                          />
                        )
                      })}
                    </div>
                  </div>
                }
              </>
            }
          </>
        }

        {(page === '/home' || page === '/events' || page === '/favorites') &&
          <>
            {loader ?
              <IonSpinner className="spinner-large center" name="lines" /> :
              <>
                <div className={desktopMainBodyClassName()}>
                  {page === '/events' &&
                    <div className="toggler-container">
                      <IonSegment
                        mode={"ios"}
                        value={props.segmentValue}
                        className="home-top-segment"
                        onIonChange={e => setFilter(e.detail.value)}
                      >
                        <IonSegmentButton type={"button"} value="all">
                          <IonLabel>
                            {i18next.t("All")} <span>{matches.length}</span></IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton type={"button"} value="today">
                          <IonLabel>
                            {i18next.t("Today")} <span>{matches.filter(el => moment.unix(el.starttime).isSame(moment(), 'day')).length}</span></IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton type={"button"} value="tomorrow">
                          <IonLabel>
                            {i18next.t("Tomorrow")} <span>{matches.filter(el => moment.unix(el.starttime).isSame(moment().add(1, 'day'), 'day')).length}</span></IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton type={"button"} value="soon">
                          <IonLabel>
                            {i18next.t("Soon")} <span>{matches.filter(el => moment.unix(el.starttime).isSameOrAfter(moment().add(2, 'day'), 'day')).length}</span></IonLabel>
                        </IonSegmentButton>
                      </IonSegment>
                      {/* <p className="list-events-title">
                        {i18next.t("List of matches")}
                      </p> */}
                    </div>
                  }
                  {((page === '/home' && matches.length > 0) || (page === '/events' && filteredMatches.length > 0) || (page === '/favorites' && favorites.length > 0)) &&
                    dealing == 'cis' &&
                    <div className="titles-stakes flex">
                      {!lob &&
                        <>
                          {/* <IonSegment
                              mode={"ios"}
                              onClick={(e) => e.stopPropagation()}
                              onIonChange={e => setToggleTime(e.detail.value)}
                              value={toggleTime}
                              className="desktop-live-container-toggle horizontal"
                            >
                              <IonSegmentButton value="ft">
                                <IonLabel>FT</IonLabel>
                              </IonSegmentButton>
                              <IonSegmentButton value="1h">
                                <IonLabel>1H</IonLabel>
                              </IonSegmentButton>
                            </IonSegment> */}
                          <div className="titles-stakes-labels flex">
                            <div className='first-title flex'>
                              <span className="first-label">1</span>
                              {link1X2 && <span className="second-label">x</span>}
                              <span className="third-label">2</span>
                            </div>
                            <div className='second-title flex'>
                              <span>
                                {i18next.t("Handicap")}
                              </span>
                              <div className='gap'></div>
                            </div>
                            <div className='third-title flex'>
                              <span>
                                {i18next.t("Under/over")}
                              </span>
                              <div className='gap'></div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                  }

                  <div onScroll={e => handleScroll(e)} className={desktopEventCardsClassName()} >
                    {page === '/home' && matches.map((el, i) => (
                      i < cardsIndex &&
                      <DesktopMatchContainer
                        key={i}
                        isodd={i}
                        dropBets={dropBets}
                        link={el.id}
                        showListOfBets={showListOfBets}
                        setShowListOfBets={setShowListOfBets}
                        setCurrentMatchDetails={props.setCurrentMatchDetails}
                        currentMatchDetails={props.currentMatchDetails}
                        isHomePage={true}
                      />
                    ))}
                    {page === '/events' && filteredMatches.map((el, i) => (
                      i < cardsIndex &&
                      <DesktopMatchContainer
                        key={i}
                        isodd={i}
                        dropBets={dropBets}
                        link={el.id}
                        showListOfBets={showListOfBets}
                        setShowListOfBets={setShowListOfBets}
                        setCurrentMatchDetails={props.setCurrentMatchDetails}
                        currentMatchDetails={props.currentMatchDetails}
                      />
                    ))}
                    {page === '/favorites' && favorites.map((el, i) => (
                      i < cardsIndex &&
                      <DesktopMatchContainer
                        key={i}
                        isodd={i}
                        dropBets={dropBets}
                        link={el.id}
                        showListOfBets={showListOfBets}
                        setShowListOfBets={setShowListOfBets}
                        setCurrentMatchDetails={props.setCurrentMatchDetails}
                        currentMatchDetails={props.currentMatchDetails}
                      />
                    ))}
                  </div>
                </div>
              </>
            }
          </>
        }

        {(page === '/home' || page === '/live') && matches.length === 0 &&
          <div className='no-games'>
            {i18next.t(`There are currently no ${props.matchstatus === 2 ? 'live' : ''} events.`)}
          </div>
        }
        {page === '/events' && filteredMatches.length === 0 &&
          <div className='no-games'>
            {i18next.t("No events on this date.")}
          </div>
        }
        {page === '/favorites' && favorites.length === 0 &&
          <div className='no-games'>
            {i18next.t("You have no favorite events.")}
          </div>
        }

      </div>
    </div>
  )
}

export default DesktopMainWrapper;
