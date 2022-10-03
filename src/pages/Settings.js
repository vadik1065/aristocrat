import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
// Components
import Sidebar from '../components/settings/Sidebar.js';
import Interface from "../components/settings/Interface.js";
import General from "../components/settings/General.js";
import Dealing from "../components/settings/Dealing.js";
import Notifications from "../components/settings/Notifications.js";
import Leagues from "../components/settings/Leagues.js";
import Markets from "../components/settings/Markets.js";
import Security from "../components/account/Security.js";
import SettnigsMobLinks from '../components/settings/SettnigsMobLinks.js';
// CSS
import '../css/settings.css';
import i18next from 'i18next';

const Settings = (props) => {
  const width = useSelector(state => state.width);
  const [cards, setCards] = useState({
    interface: true,
    general: true,
    dealing: true,
    notifications: true,
    leagues: true,
    markets: true,
    security: true,
  })
  const isDesktop = width >= 1025;
  const isTablet = width <= 1024 && width >= 601;
  const isMobile = width <= 600;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const location = useLocation();

  return (
    <IonPage className="settings">
      <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
        <div className={`main-big main-account-big main-settings-big ${isDesktop ? themeAccent : ''}`}>

          {isDesktop &&
            <>
              <Sidebar cards={cards} setCards={setCards} />
              <div className="dashboard-container">
                {cards.interface && <Interface setCards={setCards} cards={cards} />}
                {cards.dealing && <Dealing setCards={setCards} cards={cards} />}
                {/* {cards.general && <General setCards={setCards} cards={cards} />} */}
                {cards.notifications && <Notifications setCards={setCards} cards={cards} />}
                {cards.leagues && <Leagues setCards={setCards} cards={cards} />}
                {cards.markets && <Markets setCards={setCards} cards={cards} />}
                {cards.security && (
                  <div className="rectangular-area-wrapper security set-small">
                    <Security />
                  </div>
                )}
              </div>
            </>
          }

          {isTablet &&
            <div className="account-tablet-wrapper rectangular-area-wrapper">
              <div className="account-tablet-container">
                <div className="mobile-title">
                  <span>{i18next.t("All Settings")}</span>
                </div>
                <div className="account-other-containers">
                  <Interface setCards={setCards} cards={cards} />
                  <Dealing setCards={setCards} cards={cards} />
                  {/* <General setCards={setCards} cards={cards} /> */}
                  <Notifications setCards={setCards} cards={cards} />
                  <Leagues setCards={setCards} cards={cards} />
                  <Markets setCards={setCards} cards={cards} />
                  <div className="rectangular-area-wrapper security set-small">
                    <Security />
                  </div>
                </div>
              </div>
            </div>
          }

          {isMobile &&
            <>
              {(location.pathname === '/settings' || location.pathname === '/settings/') && <div className="mobile-title">
                <span>{i18next.t("All Settings")}</span>
              </div>}
              {(location.pathname === '/settings' || location.pathname === '/settings/') && <SettnigsMobLinks />}
              {location.pathname === '/settings/interface' && <Interface />}
              {location.pathname === '/settings/dealing' && <Dealing />}
              {/* {location.pathname === '/settings/general' && <General />} */}
              {location.pathname === '/settings/notifications' && <Notifications />}
              {location.pathname === '/settings/leagues' && <Leagues />}
              {location.pathname === '/settings/markets' && <Markets />}
              {location.pathname === '/settings/security' && <Security />}
            </>
          }

        </div>
      </IonContent>
    </IonPage>
  )
}

export default Settings;
