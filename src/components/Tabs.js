import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
// Components
import home from '../images/bar/home.png';
import bets from '../images/bar/bets.png';
import chat from '../images/bar/chat.png';
import account from '../images/bar/account.png';
import i18next from 'i18next';



const Tabs = ({ pagesWithoutBars }) => {
  const location = useLocation();
  const isSmallWidth = useSelector(state => state.width < 768);
  const pagesArr = pagesWithoutBars.filter(page => location.pathname == page);
  const themeAccent = useSelector(state => state.settings.theme.accent);

  return <>
    {isSmallWidth && pagesArr.length == 0 &&
      <IonTabBar slot="bottom" className={`main-toolbar ${themeAccent}`}>
        {/* <IonTabButton tab="live" href="/live">
          <img src={home} alt="live" />
          <IonLabel>
            {i18next.t("Live")}
          </IonLabel>
        </IonTabButton> */}
        <IonTabButton tab="home" href="/home">
          <img src={home} alt="home" />
          <IonLabel>
            {i18next.t("Home")}
          </IonLabel>
        </IonTabButton>
        <IonTabButton tab="bets" href="/bets">
          <img src={bets} alt="bets" />
          <IonLabel>
            {i18next.t("Bets")}
          </IonLabel>
        </IonTabButton>
        <IonTabButton tab="chat" href="/chat">
          <img src={chat} alt="chat" />
          <IonLabel>
            {i18next.t("Chat")}
          </IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/account">
          <img src={account} alt="account" />
          <IonLabel>
            {i18next.t("Account")}
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    }
  </>
}

export default Tabs;
