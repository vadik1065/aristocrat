import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
// Components
import MyAccountTop from '../components/account/account-general/MyAccountTop.js';
import Sidebar from '../components/account/Sidebar.js';
import Notifications from "../components/account/Notifications.js";
import Personal from "../components/account/Personal.js";
import ChangePassword from "../components/account/ChangePassword.js";
import Finances from "../components/account/Finances.js";
import Security from "../components/account/Security.js";
import MyAccountMob from "../components/account/MyAccountMob.js";
import LogoutButton from '../components/LogoutButton.js';
// CSS
import "../css/account.css";
import "../css/account-responsive.css";
// Other
import i18next from 'i18next';

const Account = () => {
  const width = useSelector(state => state.width);
  const [cards, setCards] = useState({
    notifications: true,
    personal: true,
    changePassword: true,
    finances: true,
    security: true
  })
  const isDesktop = width >= 1025;
  const isTablet = width <= 1024 && width >= 601;
  const isMobile = width <= 600;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const location = useLocation();


  return (
    <IonPage className="account-page">
      <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
        <div className={`main-big main-account-big ${isDesktop ? themeAccent : ''}`}>
          {isDesktop &&
            <>
              <Sidebar cards={cards} setCards={setCards} />
              <div className="dashboard-container">
                {cards.finances && <Finances setCards={setCards} cards={cards} />}
                {cards.security && (
                  <div className="rectangular-area-wrapper security big">
                    <Security />
                  </div>
                )}
                {cards.notifications && <Notifications setCards={setCards} cards={cards} />}
                {cards.changePassword && <ChangePassword setCards={setCards} cards={cards} />}
                {cards.personal && <Personal setCards={setCards} cards={cards} />}
              </div>
            </>
          }

          {isTablet &&
            <div className="account-tablet-wrapper rectangular-area-wrapper">
              <div className="account-tablet-container">
                <div className="mobile-title">
                  <span>{i18next.t("My Account")}</span>
                </div>
                <MyAccountTop />
                <div className="account-other-containers">
                  <Notifications setCards={setCards} cards={cards} />
                  <Finances />
                  <div className="rectangular-area-wrapper security big">
                    <Security />
                  </div>
                  <Personal setCards={setCards} cards={cards} />
                  <ChangePassword setCards={setCards} cards={cards} />
                  <LogoutButton />
                </div>
              </div>
            </div>
          }

          {isMobile &&
            <>
              {(location.pathname === '/account' || location.pathname === '/account/') && <MyAccountMob />}
              {location.pathname === '/account/notifications' && <Notifications setCards={setCards} cards={cards} />}
              {location.pathname === '/account/finances' && <Finances setCards={setCards} cards={cards} />}
              {location.pathname === '/account/security' && <Security setCards={setCards} cards={cards} />}
              {location.pathname === '/account/personal' && <Personal setCards={setCards} cards={cards} />}
              {location.pathname === '/account/password-change' && <ChangePassword setCards={setCards} cards={cards} />}
            </>
          }
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Account;
