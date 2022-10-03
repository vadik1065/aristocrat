import React, { useState } from 'react';
import {
  IonContent, IonPage, IonItem, IonInput,
  IonIcon, IonButton, IonButtons, IonRippleEffect
} from '@ionic/react';
import { returnUpBackOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
// Icons
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import { ReactComponent as Logo } from '../../images/logo-aristocrat/logo.svg';
import footballPlayerSmall from '../../images/backgrounds/football-player-main.png';
import footballPlayerBig from '../../images/backgrounds/football-player-main-big.png';
import userPic from '../../images/userpic.svg';
// CSS
import '../../css/login.css';
import i18next from 'i18next';

export default function ForgotPassword(props) {
  const [step, setStep] = useState(0);
  let history = useHistory();
  const [loginInput, setLoginInput] = useState('');
  const [verification, setVerification] = useState(['', '', '', '', '', '']);

  function changeInput(i, e) {

    function filterRange(arr, index, el) {
      let array = arr;
      array.splice(index, 1, el);
      return array;
    }
    if (e && e.length === 1) {
      if (i < 5) {
        setVerification(filterRange(verification, i, e))
        document.getElementsByTagName('input')[i + 1].focus();
      };
      if (e && i === 5) {
        setVerification(filterRange(verification, i, e));
        document.getElementsByTagName('input')[5].blur();
      }
    } if (e && e.length > 1) {
      setVerification([...e]);
    }


  }
  return (
    <IonPage className="login">
      <div className="login-toolbar" >
        <IonButtons slot="start" className="login-back-btn">
          <IonButton onClick={() => history.push('/login')}>
            <IonIcon slot="start" icon={returnUpBackOutline} />
          </IonButton>
        </IonButtons>
      </div>

      <IonContent>
        <div className="login-container forgot-password-container">

          {step === 0 &&
            <div className="login-left-block">
              <div className="login-fields">
                <div className="login-title">
                  {i18next.t("Forgot password")}
                </div>
                <div className="login-description">
                  {i18next.t("Enter your login, email or phone number to get verification code")}
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setStep(1)
                }}>
                  <div className="login-input-container">
                    <IonItem lines="none">
                      <IonInput
                        type="text"
                        value={loginInput}
                        placeholder={i18next.t("Login")}
                        onIonChange={e => setLoginInput(e.detail.value)}
                      >
                      </IonInput>
                      <IonIcon
                        slot="start"
                        icon={userPic}
                      >
                      </IonIcon>
                    </IonItem>
                  </div>

                  <IonButton
                    className="main-button"
                    type="submit"
                  >
                    {i18next.t("Send")}
                  </IonButton>
                </form>
              </div>
            </div>
          }

          {step === 1 &&
            <div className="login-left-block">
              <div className="login-fields">
                <div className="login-title">
                  {i18next.t("Forgot password")}
                </div>
                <div className="login-description">
                  {i18next.t("Enter verification code")}
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setVerification(['', '', '', '', '', ''])
                }}>
                  <div className="verify-input-container flex">
                    <IonInput
                      type="text"
                      value={verification[0]}
                      onIonChange={e => { changeInput(0, e.detail.value) }}
                      placeholder="_"
                    />

                    <IonInput
                      type="text"
                      value={[...verification][1]}
                      onIonChange={e => { changeInput(1, e.detail.value) }}
                      placeholder="_"
                    >
                    </IonInput>

                    <IonInput
                      type="text"
                      value={[...verification][2]}
                      onIonChange={e => { changeInput(2, e.detail.value) }}
                      placeholder="_"
                    >
                    </IonInput>

                    <IonInput
                      type="text"
                      value={[...verification][3]}
                      onIonChange={e => { changeInput(3, e.detail.value) }}
                      placeholder="_"
                    >
                    </IonInput>

                    <IonInput
                      type="text"
                      value={[...verification][4]}
                      onIonChange={e => { changeInput(4, e.detail.value) }}
                      placeholder="_"
                    >
                    </IonInput>

                    <IonInput
                      type="text"
                      value={[...verification][5]}
                      onIonChange={e => { changeInput(5, e.detail.value) }}
                      placeholder="_"
                    >
                    </IonInput>
                  </div>

                  <button
                    className="main-button ion-activatable"
                    type="submit"
                  >
                    <span>
                      {i18next.t("Verify")}
                    </span>
                    <IonRippleEffect />
                  </button>
                </form>
              </div>
            </div>
          }
          {
            /*onClick={() => history.push('/live')}*/
          }
          <div className="login-right-block">
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
      </IonContent>
    </IonPage>
  );
};
