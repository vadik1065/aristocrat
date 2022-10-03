import React from 'react';
import {
  IonContent, IonPage, IonButton
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import { ReactComponent as Logo } from '../../images/logo-aristocrat/logo.svg';
import footballPlayerSmall from '../../images/backgrounds/football-player-main.png';
import footballPlayerBig from '../../images/backgrounds/football-player-main-big.png';
import '../../css/login.css';
import i18next from 'i18next';

export default function Rules() {
  const history = useHistory();



  return (
    <IonPage className="rules">
      <IonContent fullscreen>

        {/* rules-container */}
        <div className="rules-container flex">

          {/* rules-content */}
          <div className="rules-left-block rules-content">
            <div className="rules-title">
              {i18next.t("Rules")}
            </div>

            {/* rules-text */}
            <div className="rules-text">
              <p>
                {i18next.t("Bet/Wager/Deal")}<br />
                {i18next.t("There are 4 betting categories in the System")}:
              </p>
              <p>
                {i18next.t("Pending placed bets for which")}<br />
                {i18next.t("Graded bets for which")}<br />
                {i18next.t("Canceled trades that have not been")}<br />
                {i18next.t("Voided unsuccessful transactions")}<br />
                {i18next.t("Event any public competition")}
              </p>
              <p>
                {i18next.t("Market a specific type or category")}
              </p>
              <p>
                {i18next.t("The deal can be implemented in the following markets")}:
              </p>
              <p>
                {i18next.t("Money Line")}<br />
                {i18next.t("Double Chance")}<br />
                {i18next.t("Handicap")}<br />
                {i18next.t("Totals")}<br />
                {i18next.t("Individual Total")}<br />
                {i18next.t("Both Teams To Score")}<br />
                {i18next.t("To Win To Nil")}<br />
                {i18next.t("Advanced To The Next Round")}<br />
                {i18next.t("First Team to Score")}<br />
                {i18next.t("Team To Score")}<br />
                {i18next.t("Next Team To Score")}<br />
                {i18next.t("Correct Score")}<br />
                {i18next.t("Price/Line/Odds")}<br />
              </p>
              <p>
                {i18next.t("Net profit/net gain")}
              </p>
              <p>
                {i18next.t("The outcome a possible result")}
              </p>
              <p>
                {i18next.t("Prematch a period of time")}
              </p>
            </div>
            {/* rules-text */}
            <div className="rules-button-container flex">
              <IonButton
                className="main-button rules-button"
                ripple={true}
                onClick={() => history.push('/edit')}
              >
                {i18next.t("I’ve read and agreed the Terms of Use")}
              </IonButton>
            </div>
          </div>
          {/* rules-content */}

          <div className="rules-right-block">
            <ResponsiveImage className="right-block-image">
              <ResponsiveImageSize
                default
                minWidth={0}
                path={footballPlayerSmall}
              />
              <ResponsiveImageSize
                minWidth={1921}
                path={footballPlayerBig}
              />
            </ResponsiveImage>
            <div className="right-block-logo">
              <Logo className="center-logo center-logo-dark" />
            </div>
          </div>

        </div>
        {/* rules-container */}
      </IonContent>
    </IonPage>
  );
};
