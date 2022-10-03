import React, { useState, useEffect } from "react";
import BetsCard from "../components/BetsCard.js";
// import QuotesCard from "../components/QuotesCard.js";
import {
  IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher,
  IonRefresherContent, IonSegmentButton, IonSegment, IonLabel,
  IonPage, IonContent, IonSelect, IonSelectOption,
  useIonViewWillLeave, useIonViewWillEnter,
} from "@ionic/react";
import { useSelector } from "react-redux";
import * as API from '../api/functions.js';
import DesktopLeftBar from "../components/DesktopLeftBar.js";
import { ReactComponent as Edit } from '../images/edit.svg';
import { ReactComponent as Filter } from '../images/filter.svg';
import { ReactComponent as SearchIcon } from '../images/search-mini.svg';
import WalletMobile from '../components/WalletMobile';
import { ReactComponent as Calendar } from "../images/calendar.svg";
import moment from "moment";
import "../css/bets.css";
import CalendarPicker from "../components/CalendarPicker.js";
import i18next from "i18next";
import { getDateFromUnix } from "../utils/utils.js";

const Bets = (props) => {
  const width = useSelector(state => state.width);
  const token = useSelector(state => state.token);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const [listOfBets, setListOfBets] = useState([]);
  const [totalBets, setTotalBets] = useState([]);
  const [totalHistoryBets, setTotalHistoryBets] = useState([]);
  const is4k = width >= 3400;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const betFilter = useSelector(state => state.betFilter);
  const [disableInfiniteScroll] = useState(false);
  const [innerSegmentValue, setInnerSegmentValue] = useState("graded");
  const [selectSport, setSelectSport] = useState('soccer');
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const language = useSelector(state => state.settings.language);
  const [historyDate, setHistoryDate] = useState({
    dateFrom: moment().subtract(7, 'days').format("YYYY-MM-DD"),
    dateTo: moment().format("YYYY-MM-DD")
  });


  useEffect(() => {
    if (betFilter !== '') {
      setListOfBets(totalBets.filter(el => el.data.some(elem => elem.Sport === betFilter)))
    }
  }, [betFilter]);


  //временная переменная для демо-рендера
  const [n, sn] = useState(
    Array.apply(null, Array(5)).map(function (x, i) {
      return i;
    })
  );


  //загрузка новых карточек - бесконечный скролл
  function searchNext(e) {
    setTimeout(() => {
      sn(
        Array.apply(null, Array(n.length + 10)).map(function (x, i) {
          return i;
        })
      );
      //выключение бесконечного скролла при необходимости
      // setDisableInfiniteScroll(true);
      (e.target).complete();
    }, 500);
  }


  useEffect(() => {
    if (innerSegmentValue === 'graded') {
      API.getBets(token, { type: 'open' }).then((result) => {
        setListOfBets(result);
        setTotalBets(result);
      }).catch((err) => {
        console.log(err.response);
      });
    }

    if (innerSegmentValue === 'pending') {
      API.getBets(token, {
        type: 'history',
        dateFrom: moment().subtract(7, 'days').format("YYYY-MM-DD"),
        dateTo: moment().format("YYYY-MM-DD")
      }).then((result) => {
        // console.log(result);
        setListOfBets(result.filter(el => el.state === 'Request'));
        setTotalHistoryBets(result);
      }).catch((err) => {
        console.log(err.response);
      });
    }

    if (innerSegmentValue === 'canceled') {
      API.getBets(token, {
        type: 'history',
        dateFrom: moment().subtract(7, 'days').format("YYYY-MM-DD"),
        dateTo: moment().format("YYYY-MM-DD")
      }).then((result) => {
        setListOfBets(result.filter(el => el.state === 'Cancel'));
        setTotalHistoryBets(result);
      }).catch((err) => {
        console.log(err.response);
      });
    }

    if (innerSegmentValue === 'history') {
      API.getBets(token, {
        type: 'history',
        dateFrom: historyDate.dateFrom,
        dateTo: historyDate.dateTo,
      }).then((result) => {
        setListOfBets(result.filter(el => (el.state === 'Lose' || el.state === 'Win')));
        setTotalHistoryBets(result);
      }).catch((err) => {
        console.log(err.response);
      });
    }
  }, [innerSegmentValue, historyDate])


  function doRefresh(event) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }


  function filterBets(e) {
    setListOfBets(totalBets.filter(el => el.data.some((element) => element.Sport === e)));
  };


  useIonViewWillLeave(() => {
    setInnerSegmentValue('graded');
    setShowCalendarPicker(false);
  });


  useIonViewWillEnter(() => {
    API.getBets(token, { type: 'open' }).then((result) => {
      setListOfBets(result);
      setTotalBets(result);
    }).catch((err) => {
      console.log(err.response);
    });

    API.getBets(token, {
      type: 'history',
      dateFrom: historyDate.dateFrom,
      dateTo: historyDate.dateTo,
    }).then((result) => {
      setTotalHistoryBets(result);
    }).catch((err) => {
      console.log(err.response);
    });
  });


  // useEffect(() => {
  //   setTotalHistoryBets(totalHistoryBets);
  // }, [totalHistoryBets]);

  return (
    <IonPage>
      {
        //true && <Redirect to="/login" />
      }
      {isMobile &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <IonRefresher
            className="ios"
            pullFactor={0.7}
            pullMin={50}
            pullMax={90}
            slot="fixed"
            onIonRefresh={doRefresh}
          >
            <IonRefresherContent
              pullingIcon={"circular"}
              refreshingSpinner={"circular"}
            />
          </IonRefresher>
          <div className="main-mobile">
            <WalletMobile />
            <div className="bets-container">
              <div className="segment-container home-top-container">
                <div className="home-top-container-label">
                  {i18next.t("Bets")}
                </div>
                <div className="home-top-container-btns mobile">
                  <div
                    className="calendar-container flex"
                    onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                  >
                    <div className="calendar-label">
                      {i18next.t("Calendar")}
                      {innerSegmentValue === 'history' &&
                        <span>
                          {getDateFromUnix(historyDate.dateFrom, dateFormat, timeZone)} - {getDateFromUnix(historyDate.dateTo, dateFormat, timeZone)}
                        </span>
                      }
                    </div>
                    <Calendar />
                  </div>
                  {showCalendarPicker &&
                    <CalendarPicker
                      setShowCalendarPicker={setShowCalendarPicker}
                      showCalendarPicker={showCalendarPicker}
                      setHistoryDate={setHistoryDate}
                      historyDate={historyDate}
                      setInnerSegmentValue={setInnerSegmentValue}
                      language={language}
                    />
                  }
                </div>
              </div>
              <div className="bets-cards-container">
                <IonSegment
                  mode={"ios"}
                  value={innerSegmentValue}
                  className="home-top-segment"
                  onIonChange={e => setInnerSegmentValue(e.detail.value)}
                >
                  <IonSegmentButton value="graded">
                    <IonLabel>
                      {i18next.t("Graded")} <span>{totalBets.filter(el => el.state === 'Open').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="pending">
                    <IonLabel>
                      {i18next.t("Pending")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Request').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="canceled">
                    <IonLabel>
                      {i18next.t("Canceled")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Cancel').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="history">
                    <IonLabel>
                      {i18next.t("History")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => (el.state === 'Lose' || el.state === 'Win')).length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                {listOfBets.map((el, i) => (
                  <BetsCard
                    bets={el}
                    key={i}
                    setListOfBets={setListOfBets}
                    setTotalBets={setTotalBets}
                  />
                ))}
                {listOfBets.length === 0 &&
                  <p className="title mobile-nobets ">
                    {i18next.t("No bets history.")}
                  </p>
                }
              </div>
            </div>

            <IonInfiniteScroll
              threshold="100px"
              disabled={disableInfiniteScroll}
              onIonInfinite={(e) => searchNext(e)}
            >
              <IonInfiniteScrollContent />
            </IonInfiniteScroll>
          </div>
        </IonContent>
      }


      {isTablet &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <IonRefresher
            className="ios"
            pullFactor={0.7}
            pullMin={50}
            pullMax={90}
            slot="fixed"
            onIonRefresh={doRefresh}
          >
            <IonRefresherContent
              pullingIcon={"circular"}
              refreshingSpinner={"circular"}
            />
          </IonRefresher>
          <div className={`main-tablet`}>
            {/* <div className="main-tablet-top bets-main-tablet-top flex">
              <IonSelect
                className="select sport-games-select"
                interface="popover"
                value={selectSport}
                onIonChange={(e) => setSelectSport(e.detail.value)}
                mode={'md'}
              >
                <IonSelectOption value="soccer">Soccer</IonSelectOption>
                <IonSelectOption value="baseball">Baseball</IonSelectOption>
                <IonSelectOption value="tennis">Tennis</IonSelectOption>
                <IonSelectOption value="basketball">Basketball</IonSelectOption>
                <IonSelectOption value="voleyball">Voleyball</IonSelectOption>
                <IonSelectOption value="table-tennis">Table tennis</IonSelectOption>
                <IonSelectOption value="football">Football</IonSelectOption>
                <IonSelectOption value="bowling">Bowling</IonSelectOption>
              </IonSelect>
            </div> */}
            <div className="tablet-cards-container">
              <div className="home-top-container">
                <div className="home-top-container-label">
                  {i18next.t("Bets")}
                </div>
                <div className="home-top-container-btns">
                  {/* <button className="btn-edit">
                    <Edit className="filters-icon" />
                  </button>
                  <button className="btn-filter">
                    <Filter className="filters-icon" />
                  </button>
                  <button className="btn-search">
                    <SearchIcon className="filters-icon" />
                  </button> */}
                  <div
                    className="calendar-container flex"
                    onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                  >
                    <div className="calendar-label">
                      {i18next.t("Calendar")}
                      {innerSegmentValue === 'history' &&
                        <span>
                          {getDateFromUnix(historyDate.dateFrom, dateFormat, timeZone)} - {getDateFromUnix(historyDate.dateTo, dateFormat, timeZone)}
                          {/* {moment(historyDate.dateFrom).format("DD.MM.YYYY")} - {moment(historyDate.dateTo).format("DD.MM.YYYY")} */}
                        </span>
                      }
                    </div>
                    <Calendar />
                  </div>
                  {showCalendarPicker &&
                    <CalendarPicker
                      setShowCalendarPicker={setShowCalendarPicker}
                      showCalendarPicker={showCalendarPicker}
                      setHistoryDate={setHistoryDate}
                      historyDate={historyDate}
                      setInnerSegmentValue={setInnerSegmentValue}
                      language={language}
                    />
                  }
                </div>
              </div>

              <div className="bets-tabs">
                <IonSegment
                  mode={"ios"}
                  value={innerSegmentValue}
                  onIonChange={(e) => setInnerSegmentValue(e.detail.value)}
                  className="home-top-segment"
                >
                  <IonSegmentButton value="graded">
                    <IonLabel>
                      {i18next.t("Graded")} <span>{totalBets.filter(el => el.state === 'Open').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="pending">
                    <IonLabel>
                      {i18next.t("Pending")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Request').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="canceled">
                    <IonLabel>
                      {i18next.t("Canceled")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Cancel').length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="history">
                    <IonLabel>
                      {i18next.t("History")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => (el.state === 'Lose' || el.state === 'Win')).length}</span>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </div>
              <div className="tablet-bets-cards">
                {listOfBets.map((el, i) =>
                  <BetsCard
                    bets={el}
                    key={i}
                    setListOfBets={setListOfBets}
                    setTotalBets={setTotalBets}
                  />
                )}
                {listOfBets.length === 0 &&
                  <p className="title">
                    {i18next.t("No bets history.")}
                  </p>
                }
              </div>
            </div>

          </div>
        </IonContent>
      }


      {(isDesktop || is4k) &&
        <IonContent className='desktop-main-page' id="main">
          <div className={`main-big ${themeAccent}`}>
            {/* <DesktopLeftBar filterBets={filterBets} /> */}
            <div className={`desktop-live-main-wrapper desktop-bets-main-wrapper ${themeAccent} ${is4k && 'ultra'}`}>
              <div className="desktop-live-main-container desktop-bets-main-container">
                <div className="desktop-live-container-header flex">
                  <p className="title">
                    {i18next.t("Bets")}
                  </p>
                  <div className="home-top-container-btns">
                    {/* <button className="btn-edit">
                      <Edit className="filters-icon" />
                    </button>
                    <button className="btn-filter">
                      <Filter className="filters-icon" />
                    </button>
                    <button className="btn-search">
                      <SearchIcon className="filters-icon" />
                    </button> */}
                    <div
                      className="calendar-container flex"
                      onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                    >
                      <div className="calendar-label">
                        {i18next.t("Calendar")}
                        {innerSegmentValue === 'history' &&
                          <span>
                            {getDateFromUnix(historyDate.dateFrom, dateFormat, timeZone)} - {getDateFromUnix(historyDate.dateTo, dateFormat, timeZone)}
                            {/* {moment(historyDate.dateFrom).format("DD.MM.YYYY")} - {moment(historyDate.dateTo).format("DD.MM.YYYY")} */}
                          </span>
                        }
                      </div>
                      <Calendar />
                    </div>
                    {showCalendarPicker &&
                      <CalendarPicker
                        setShowCalendarPicker={setShowCalendarPicker}
                        showCalendarPicker={showCalendarPicker}
                        setHistoryDate={setHistoryDate}
                        historyDate={historyDate}
                        setInnerSegmentValue={setInnerSegmentValue}
                        language={language}
                      />
                    }
                    {/* <button className="btn-new-bet">+ New Bet</button> */}
                  </div>
                </div>
                <div className="bets-tabs">
                  <IonSegment
                    mode={"ios"}
                    value={innerSegmentValue}
                    onIonChange={(e) => setInnerSegmentValue(e.detail.value)}
                    className="home-top-segment"
                  >
                    <IonSegmentButton value="graded">
                      <IonLabel>
                        {i18next.t("Graded")} <span>{totalBets.filter(el => el.state === 'Open').length}</span>
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="pending">
                      <IonLabel>
                        {i18next.t("Pending")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Request').length}</span>
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="canceled">
                      <IonLabel>
                        {i18next.t("Canceled")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => el.state === 'Cancel').length}</span>
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="history">
                      <IonLabel>
                        {i18next.t("History")} <span>{totalHistoryBets.length > 0 && totalHistoryBets.filter(el => (el.state === 'Lose' || el.state === 'Win')).length}</span>
                      </IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </div>
                <div className="desktop-bets-list">
                  {listOfBets.map((el, i) =>
                    <BetsCard
                      bets={el}
                      key={i}
                      setListOfBets={setListOfBets}
                      setTotalBets={setTotalBets}
                    />)
                  }
                  {listOfBets.length === 0 &&
                    <p className="title">
                      {i18next.t("No bets history on this dates.")}
                    </p>
                  }
                </div>
              </div>

              {/* <div className="desktop-live-main-container desktop-bets-main-container">
                <div className="desktop-live-container-header flex">
                  <p className="title">Quotes</p>
                  <div className="home-top-container-btns">
                    <button className="btn-edit">
                      <Edit className="filters-icon" />
                    </button>
                    <button className="btn-filter">
                      <Filter className="filters-icon" />
                    </button>
                    <button className="btn-search">
                      <SearchIcon className="filters-icon" />
                    </button>
                    <div className="calendar-container flex">
                      <div className="calendar-label">Calendar</div>
                      <Calendar />
                    </div>
                  </div>
                </div>
                <div className="desktop-quotes-list">
                  {n.map((el, i) => <QuotesCard key={i} />)}
                </div>
              </div> */}
            </div>
          </div>
        </IonContent>
      }
    </IonPage>
  )
}

export default Bets;
