import React from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
// import { useHistory } from "react-router-dom";
// Icons
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import { ReactComponent as Logo } from '../../images/logo-aristocrat/logo.svg';
import footballPlayerSmall from '../../images/backgrounds/football-player-main.png';
import footballPlayerBig from '../../images/backgrounds/football-player-main-big.png';
import error from '../../images/error-settings.svg';
// CSS
import '../../css/errors.css';
import i18next from 'i18next';

export default function Page404() {
  // const history = useHistory();


  return (
    <IonPage className="error">
      <IonContent fullscreen>
        <div className="error-container">
          <div className="error-left-block">
            <div className="error-content">
              <div className="error-title">
                {i18next.t("Error 404")}
              </div>
              <div className="error-description">
                {i18next.t("The page you are looking for does not exist. It may have been moved, or removed altogether.")}
              </div>

              <IonButton
                className="error-button"
                onClick={() => {
                  // history.push('/live');
                  window.location.href = '/home';
                }}
                ripple={true}
              >
                {i18next.t("To the main page")}
              </IonButton>

            </div>
          </div>

          <div className="error-right-block">
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
              <img src={error} alt="Error" className="error-icon" />
              <Logo className="center-logo center-logo-dark" />
            </div>
          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};
