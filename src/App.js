import React, { useEffect, useState } from 'react';
import firebase, { getFirebaseToken, onMessageListener } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeWidth, changeTheme, setToken,
  setPusher, setChatId, getUserInfo, toggleErrorToast, toggleToast,
  toggleLoader, setPaymentSystems, setNonCryptoPaymentSystems, toggleErrorToastText,
  setCurrencies, setTransactions, setSportsId, changeInterfaceView, setQuoteData,
  setBetQuotes, setParticipants, changeLanguage, changeFontSize, changeAccent, setCommaSeparator, changeDateFormat, changeTimeZone, changeDealingView, setSportsList, mutateAllEvents, setCompetitionsDict, getEvents, setHeaderColorful, refreshSports, refreshMatch, setDisplayHandicap, setDisplayZeroHandicap, setNotifications, toggleToastText, setAllInterfaceSettings
} from './store/actions/index.js';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonToast
} from '@ionic/react';
import { setupConfig } from '@ionic/core';
import { IonReactRouter } from '@ionic/react-router';
import moment from 'moment';
import './css/main.css';
import i18next from 'i18next';
import Login from './pages/auth/Login.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import Rules from './pages/auth/Rules.js';
import EditLogin from './pages/auth/EditLogin.js';
import TechnicalProblem from './pages/errors/TechnicalProblem.js';
import ConnectionProblem from './pages/errors/ConnectionProblem.js';
import Page404 from './pages/errors/Page404.js';
import Menu from './components/Menu.js';
import RightMenu from './components/RightMenu.js';
import Header from "./components/Header.js";
import Tabs from './components/Tabs.js';
import PrivateRoute from './components/PrivateRoute.js';
import * as API from './api/functions.js';
import { convertArrayToObject } from './utils/utils.js';
import './css/media-darya.css';
import './css/media-darya4k.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Pusher from 'pusher-js';

/* Theme variables */
import './theme/variables.css';
import './css/redux.css';
import './css/redux-mode.css';
import ConfirmResponseModal from './components/betslip/ConfirmResponseModal.js';
import Home from './pages/Home.js';
import Account from './pages/Account.js';
import Wallet from './pages/Wallet.js';
import Events from './pages/Events.js';
import Live from './pages/Live.js';
import Settings from './pages/Settings.js';
import Chat from './pages/Chat.js';
import Favorites from './pages/Favorites.js';
import Bets from './pages/Bets.js';



const App = () => {
  // const currency = useSelector(state => state.user.currency);
  // const balanceInfo = useSelector(state => state.user.balanceInfo);
  let channel = '';
  const loader = useSelector(state => state.loader);
  const toast = useSelector(state => state.toast);
  const errorToast = useSelector(state => state.errorToast);
  const errorToastText = useSelector(state => state.errorToastText);
  const toastText = useSelector(state => state.toastText);
  const token = useSelector(state => state.token);
  const user = useSelector(
    ({ user }) => ({
      currency: user.currency,
      balanceInfo: user.balanceInfo
    })
  );
  const userId = useSelector(state => state.user.id);
  const dispatch = useDispatch();
  const language = useSelector(state => state.settings.language);
  const [segmentValue, setSegmentValue] = useState('all');
  const sportsId = useSelector(state => state.sportsId);
  const refreshSport = useSelector(state => state.refreshSport);
  const refreshMatchId = useSelector(state => state.refreshMatchId);
  const matches = useSelector(state => state.matches);
  const handleWindowSizeChange = () => {
    dispatch(changeWidth(window.innerWidth));
  };
  const accent = useSelector(state => state.settings.accent);
  const pusher = useSelector(state => state.pusher);
  const pusherUser = useSelector(state => state.pusher);
  const betQuotes = useSelector(state => state.betQuotes);
  const quoteData = useSelector(state => state.quoteData);
  const notifications = useSelector(state => state.settings.notifications);
  // const [isFcmTokenFound, setFcmTokenFound] = useState(false);
  const [showConfirmResponseModal, setShowConfirmResponseModal] = useState(false);
  const pagesWithoutBars = [
    '/login', '/forgot', '/rules',
    '/edit', '/error1', '/error2', '/404'
  ];

  useEffect(() => {
    if (token !== '') {
      dispatch(toggleLoader(true));
      // Если нужно будет выводить push при открытом приложении, то включить это
      // onMessageListener().then(payload => {
      //   // dispatch(toggleToastText(payload.notification.title + '\n' + payload.notification.body))
      //   // dispatch(toggleToast(true));
      // }).catch(err => console.log('failed: ', err));
      

      API.getChatId(token).then(res => dispatch(setChatId(res.data.data.chat_id)))

      const pusher = new Pusher('12345', {
        cluster: 'mt1',
        wsHost: 'admin.aristocrat.net',
        authEndpoint: 'https://admin.aristocrat.net/api/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          },
        },
        wsPort: 6001,
        wssPort: 6001,
        enabledTransports: ['ws'],
        forceTLS: true
      });

      connectToChannel(pusher);
      dispatch(setPusher(pusher));

      API.getListSports(token).then(res => {
        dispatch(setSportsList(res.data.data.listSports));
        dispatch(toggleLoader(false));
        if (!res.data.data.listSports.some(el => el.id === 6046)) {
          // если футбола нет в списке или нет футбольных матчей, то ставим первый, у которого есть live-матчи
          if (res.data.data.listSports.some(sport => sport.cnt_inplay > 0 || sport.cnt_prematch > 0)) {
            dispatch(setSportsId(res.data.data.listSports.find(sport => sport.cnt_inplay > 0 || sport.cnt_prematch > 0).id));
          }
        }

        // по умолчанию дефолтный sportsId = 9 (футбол)
        // if (res.data.data.listSports.find(el => el.id === 9 && el.cnt_inplay > 0) === undefined) {
        //   const promise = new Promise((resolve) => {
        //     // если футбола нет в списке или нет футбольных матчей в live, то ставим первый, у которого есть live-матчи
        //     if (res.data.data.listSports.some(sport => sport.cnt_inplay > 0)) {
        //       dispatch(setSportsId(res.data.data.listSports.find(sport => sport.cnt_inplay > 0).id));
        //     }
        //     resolve();
        //   })
        //   promise.then(() => {
        //     dispatch(setSportsList(res.data.data.listSports));
        //   });
        // } else {
        //   dispatch(setSportsList(res.data.data.listSports));
        // }
      });

      API.getInfo(token)
        .then(res => {
          dispatch(getUserInfo(res));
          
          let settings = {};
          if (res.player.settings && res.player.settings !== null) {
            dispatch(setAllInterfaceSettings(res));
            settings = JSON.parse(res.player.settings);
            if (settings.notifications.allEnabled) {
              getFirebaseToken(token);              
            }

            if (settings.theme) {
              dispatch(changeTheme({ darkMode: settings.theme.darkMode, accent: settings.theme.accent }));
            }

            if (settings.language) {
              i18next.changeLanguage(settings.language).then(() => {
                i18next.options.lng = settings.language;
              })
            }
          }

          checkLoan(res);
          if (res.player.verified_date !== null) {
            API.getTransactionsHistory(token, {
              from: moment(res.player.verified_date).unix(),
              to: moment(new Date()).unix()
            }).then(res => {
              dispatch(setTransactions(res.history));
            });
          }
        });

      API.getCryptoPaymentSystemList(token).then(res => {
        dispatch(setPaymentSystems(res));
      });

      API.getNonCryptoPaymentSystemList(token).then(res => {
        dispatch(setNonCryptoPaymentSystems(res));
      });

      API.getCurrencies().then(res => {
        dispatch(setCurrencies(res.data))
      });

      // проверка quote
      API.getBets(token, {
        type: 'history',
        dateFrom: moment().subtract(1, 'days').format("YYYY-MM-DD"),
        dateTo: moment().format("YYYY-MM-DD")
      }).then((result) => {
        if (result.some(el => el.state === 'Request')) {
          console.log(result.filter(el => el.state === 'Request'));
          dispatch(setBetQuotes(result.filter(el => el.state === 'Request')));
          connectToUserChannel();
        }
      }).catch((err) => {
        console.log(err.response);
      });

      if (language !== '') {
        // справочник турниров        
        API.getListCompetitions(token, language).then(res => {
          let list = res.data.data.list;
          let obj = convertArrayToObject(list, 'id');
          dispatch(setCompetitionsDict(obj));
          // let cc = 'a9f76ead-91f3-4c4c-83fb-47072ee1d2ab'
          // console.log(obj[cc].jurisdiction_lg);
        });

        // справочник команд
        API.getListParticipants(token, language).then(res => {
          let list = res.data.data.list;
          let obj = convertArrayToObject(list, 'id');
          dispatch(setParticipants(obj));
        })
      }
    }
  }, [token]);

  useEffect(() => {
    if (betQuotes.length) {
      connectToUserChannel();
    }
    if (betQuotes !== '' && betQuotes.length === 0) {
      disconnectToUserChannel();
    }
  }, [betQuotes]);

  useEffect(() => {
    if (quoteData.id) {
      setShowConfirmResponseModal(true);
    }
  }, [quoteData]);

  useEffect(() => {
    if (refreshSport) {
      API.getListSports(token).then(res => {
        dispatch(setSportsList(res.data.data.listSports));

        API.getEvents(token, { sportsId }).then(res => {
          if (res.data.data.listFixtures) {
            dispatch(getEvents(res.data.data.listFixtures));
            dispatch(refreshSports(false));
          }
        })
      });
    }
  }, [refreshSport]);

  useEffect(() => {
    if (refreshMatchId) {
      API.getEventDetails(refreshMatchId, token).then(res => {
        dispatch(getEvents([res.data.data.infoFixture]));
        dispatch(refreshMatch(''));
      });
    }
  }, [refreshMatchId]);

  // useEffect(() => {
  //   if (notificationsEnabled) {
  //     console.log('notifications enabled');
  //     getFirebaseToken(setFcmTokenFound, token, notificationsEnabled);
        
  //     onMessageListener().then(payload => {
  //       console.log(payload);
  //     }).catch(err => console.log('failed: ', err));
  //   } else {
  //     console.log('notifications disabled');
  //     getFirebaseToken(setFcmTokenFound, token, notificationsEnabled);
  //   }
  // }, [notificationsEnabled]);

  function connectToChannel(pusher) {
    channel = pusher.subscribe(`private-Live.channel`);
    channel.bind("App\\Events\\RealTimeMessage",
      function (data) {
        let socket = JSON.parse(data.message);
        // if (!matches.some(match => match.id === socket.FixtureId)) {
        //   API.getEventDetails(socket.FixtureId, token).then(res => {
        //     dispatch(getEvents([res.data.data.infoFixture]));
        //   })
        // } else {
          dispatch(mutateAllEvents(socket));
        // }
      });
  };

  function disconnectFromChannel() {
    pusher.unsubscribe('private-Live.channel');
  };

  function connectToUserChannel() {
    channel = pusherUser.subscribe(`private-Player.${userId}`);
    channel.bind("App\\Events\\RealTimeMessage", (data) => {
      if (JSON.parse(data.message).bet_request.state === 'Answer') {
        // console.log(JSON.parse(data.message).bet_request);
        dispatch(setQuoteData(JSON.parse(data.message).bet_request));
      }
      if (JSON.parse(data.message).bet_request.state === 'CancelRequest') {
        console.log(JSON.parse(data.message).bet_request);
        dispatch(setBetQuotes([]));
        dispatch(toggleErrorToastText('Your bet request has been rejected'));
        dispatch(toggleErrorToast(true));
      }
    });
  };


  function disconnectToUserChannel() {
    // if (channel !== '') {
    pusherUser.unsubscribe(`private-Player.${userId}`);
    // }
  }


  function checkLoan(res) {
    res.balance.forEach((item) => {
      if (item.currency_id === res.player.currency_id && item.credit_status === 2) {
        if (+item.credit_time < moment(new Date()).unix()) {
          dispatch(toggleErrorToastText('You have an overdue loan.'))
          dispatch(toggleErrorToast(true));
        }
      }
    });
  }


  useEffect(() => {
    // disable swipe back
    setupConfig({
      swipeBackEnabled: false
    });

    // check for token in LS
    if (localStorage.getItem("token") !== null) {
      dispatch(setToken(localStorage.getItem("token")));
    }

    // window resize listener
    window.addEventListener('resize', handleWindowSizeChange);

    //check for LS variable
    // if (localStorage.getItem("theme") !== null) {
    //   let obj = JSON.parse(localStorage.getItem("theme"));
    //   dispatch(changeTheme(obj));
    // } else {
    //   let obj = {darkMode: true, accent: 'dark'}
    //   dispatch(changeTheme(obj));
    // }

    // check price view in LS
    // if (localStorage.getItem("interfaceView") !== null) {
    //   dispatch(changeInterfaceView(localStorage.getItem("interfaceView")));
    // } else {
    //   localStorage.setItem("interfaceView", "Price");
    //   dispatch(changeInterfaceView("Price"));
    // }

    // check language in LS
    // if (localStorage.getItem("language") !== null) {
    //   let lang = localStorage.getItem("language");
    //   dispatch(changeLanguage(lang));
    //   i18next.changeLanguage(lang).then(() => {
    //     i18next.options.lng = lang;
    //   })
    // } else {
    //   localStorage.setItem("language", "EN");
    //   dispatch(changeLanguage("EN"));
    // }

    // check dateFormat in LS
    // if (localStorage.getItem("dateFormat") !== null) {
    //   dispatch(changeDateFormat(localStorage.getItem("dateFormat")));
    // } else {
    //   localStorage.setItem("dateFormat", "DD.MM.YY");
    //   dispatch(changeDateFormat("DD.MM.YY"));
    // }

    // check dateFormat in LS
    // if (localStorage.getItem("timeZone") !== null) {
    //   let timeZone = localStorage.getItem("timeZone");
    //   dispatch(changeTimeZone(timeZone));
    // } else {
    //   localStorage.setItem("timeZone", 'auto');
    //   dispatch(changeTimeZone('auto'));
    // }

    // check dateFormat in LS
    // if (localStorage.getItem("dealingView") !== null) {
    //   let dealingView = localStorage.getItem("dealingView");
    //   dispatch(changeDealingView(dealingView));
    // } else {
    //   localStorage.setItem("dealingView", 'cis');
    //   dispatch(changeDealingView('cis'));
    // }

    // check accentColor in LS
    // if (localStorage.getItem("accentColor") !== null) {
    //   let obj = JSON.parse(localStorage.getItem("accentColor"));
    //   dispatch(changeAccent(obj.color));
    // } else {
    //   let obj = {color: "redux-accent-orange", isGradient: false}
    //   localStorage.setItem("accentColor", JSON.stringify(obj));
    //   dispatch(changeAccent(obj.color));
    // }

    // check headerColor in LS
    // if (localStorage.getItem("headerColorful") !== null) {
    //   let isColorful = JSON.parse(localStorage.getItem("headerColorful"));
    //   dispatch(setHeaderColorful(isColorful));
    // } else {
    //   dispatch(setHeaderColorful(false));
    // }

    // check dealing separator in LS
    // if (localStorage.getItem("isComma") !== null) {
    //   let separator = JSON.parse(localStorage.getItem("isComma"));
    //   dispatch(setCommaSeparator(separator));
    // } else {
    //   dispatch(setCommaSeparator(false));
    // }

    // check display handicap in LS
    // if (localStorage.getItem("displayHandicap") !== null) {
    //   let displayHandicap = localStorage.getItem("displayHandicap");
    //   dispatch(setDisplayHandicap(displayHandicap));
    // } else {
    //   dispatch(setDisplayHandicap('plain'));
    // }

    // check display zero handicap in LS
    // if (localStorage.getItem("displayZeroHandicap") !== null) {
    //   let displayZeroHandicap = localStorage.getItem("displayZeroHandicap");
    //   dispatch(setDisplayZeroHandicap(displayZeroHandicap));
    // } else {
    //   dispatch(setDisplayZeroHandicap('decimal'));
    // }

    // check chatFontSize in LS
    // if (localStorage.getItem("chatFontSize") !== null) {
    //   dispatch(changeFontSize(localStorage.getItem("chatFontSize")));
    // } else {
    //   localStorage.setItem("chatFontSize", "medium");
    //   dispatch(changeFontSize("medium"));
    // }

    // check notifications in LS
    // console.log('check notificationsEnabled');
    // if (localStorage.getItem("notifications") !== null) {
    //   let notifications = JSON.parse(localStorage.getItem("notifications"));
    //   dispatch(setNotifications(notifications));
    // } else {
    //   dispatch(setNotifications(false));
    // }

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);



  return (
    <IonApp className={(accent.color)} >
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <IonReactRouter >
        <IonToast
          cssClass='custom-toast wrong'
          mode="ios"
          position="top"
          isOpen={errorToast}
          onDidDismiss={() => dispatch(toggleErrorToast(false))}
          message={errorToastText}
          duration={5000}
        />
        <IonToast
          cssClass='custom-toast good'
          mode="ios"
          position="top"
          isOpen={toast}
          onDidDismiss={() => dispatch(toggleToast(false))}
          message={toastText}
          duration={3000}
        />

        <Header pagesWithoutBars={pagesWithoutBars} />
        <Tabs pagesWithoutBars={pagesWithoutBars} />
        <Menu setSegmentValue={setSegmentValue} pagesWithoutBars={pagesWithoutBars} />
        <RightMenu setSegmentValue={setSegmentValue} pagesWithoutBars={pagesWithoutBars} />
        <ConfirmResponseModal
          open={showConfirmResponseModal}
          close={setShowConfirmResponseModal}
          quoteData={quoteData}
        />

        <IonRouterOutlet id="main" >
          <Route path="/login" render={() => <Login />} exact />
          <Route path="/forgot" render={() => <ForgotPassword />} exact />
          <PrivateRoute path="/rules" component={Rules} exact />
          <PrivateRoute path="/edit" component={EditLogin} exact />
          <Route path="/error1" render={() => <TechnicalProblem />} exact={true} />
          <Route path="/error2" render={() => <ConnectionProblem />} exact={true} />
          <Route path="/404" render={() => <Page404 />} exact={true} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute path="/favorites" component={Favorites} />
          {/* <PrivateRoute path="/wallet" component={Wallet} /> */}
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/account/:page" component={Account} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/settings/:page" component={Settings} />
          {/* <Route path="/home" render={() => <Home setSegmentValue={setSegmentValue} segmentValue={segmentValue} />} /> */}
          {/* <Route path="/live" render={() => <Live setSegmentValue={setSegmentValue} segmentValue={segmentValue} />} /> */}
          {/* <Route path="/events" render={() => <Events setSegmentValue={setSegmentValue} segmentValue={segmentValue} />} /> */}
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/live" component={Live} />
          <PrivateRoute 
            path="/events" 
            component={Events} 
            props={{ setSegmentValue: setSegmentValue, segmentValue: segmentValue }} 
          />
          <PrivateRoute exact path="/bets" component={Bets} />
          {/* <PrivateRoute exact path="/news" component={News} /> */}
          {/* <PrivateRoute exact path="/promotions" component={Promotions} /> */}
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          <Redirect to="/home" />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
  )
}

export default App;