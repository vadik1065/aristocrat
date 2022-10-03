import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonContent, IonPage, IonItem, IonInput,
  IonIcon, IonToast, IonRippleEffect
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import * as API from '../../api/functions.js';
// Icons
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import { ReactComponent as Logo } from '../../images/logo-aristocrat/logo.svg';
import monkeyBlack from '../../images/logo-aristocrat/monkey-black.png';
import monkeyWhite from '../../images/logo-aristocrat/monkey-white.png';
import monkey from '../../images/logo-aristocrat/new-monkey.png';
import footballPlayerSmall from '../../images/backgrounds/football-player-main.png';
import footballPlayerBig from '../../images/backgrounds/football-player-main-big.png';
import userPic from '../../images/userpic.svg';
import passwordPic from '../../images/password.svg';
import passIconOpen from '../../images/eye-opened.svg';
import passIconClose from '../../images/eye-closed.svg';
import { setToken } from '../../store/actions/index.js';
import { Redirect } from 'react-router-dom';

// CSS
import '../../css/login.css';
import i18next from 'i18next';

export default function Login() {
  const dispatch = useDispatch();
  const isMobile = useSelector(state => state.width <= 767);
  const token = useSelector(state => state.token);
  const theme = useSelector(state => state.settings.theme);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [mode2fa, setMode2fa] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(false);  
  const [nomonkey, setNomonkey] = useState(false);
  const [flexEnd, setFlexEnd] = useState(false);
  const loginInputRef = useRef(null);
  const passInputRef = useRef(null);

  function loginFunction(e) {
    e.preventDefault();
    if (loginInput !== '' && passwordInput !== '') {
      API.login(loginInput, passwordInput).then(res => {
        if (res.data.data.token) {
          dispatch(setToken(res.data.data.token));
          localStorage.setItem("token", res.data.data.token);
          // document.location.reload();
          setMode2fa(false);
        }
        if (res.data.data.mode2fa) {
          setMode2fa(true);
          setToastText("A verification code has been sent to your email.");
          setToast(true);
        }
      }).catch(() => {
        setErrorText("Incorrect login or password.");
        setError(true);
      })
    }
  }

  function confirmationLogin(e) {
    e.preventDefault();
    if (confirmationCode) {
      API.confirmLogin(loginInput, passwordInput, confirmationCode)
        .then(res => {
          dispatch(setToken(res.data.data.token));
          localStorage.setItem("token", res.data.data.token);
        }).catch(() => {
          setErrorText("Incorrect confirmation code.");
          setError(true);
        })
    }
  }

  useEffect(() => {
    window.addEventListener('ionKeyboardDidShow', (ev) => {
      setNomonkey(true);
      // setFlexEnd(true);
      // const { keyboardHeight } = ev.detail;

      // loginInputRef.current.style.setProperty(
      //   'transform',
      //   `translate3d(0, ${keyboardHeight}px, 0)`
      // );
      // passInputRef.current.style.setProperty(
      //   'transform',
      //   `translate3d(0, ${keyboardHeight}px, 0)`
      // );
    });
  }, [])

  useEffect(() => {
    window.addEventListener('ionKeyboardDidHide', () => {
      setNomonkey(false);
      // setFlexEnd(false);
      // loginInputRef.current.style.removeProperty('transform');
      // passInputRef.current.style.removeProperty('transform');
    });
  }, [])



  return (
    <IonPage className="login">
      {token !== '' && <Redirect to="/home" />}
      <IonContent 
        fullscreen 
        // scrollEvents="true"
      >
        <div className="login-container">
          <div className={`login-left-block ${flexEnd ? 'flex-end' : ''}`}>
            <div className={"top-logo-block" + (nomonkey ? " nomonkey" : '')}>

              {/* {theme.darkMode === true &&
                <>
                  <img src={monkeyBlack} alt="Aristocrat" className="monkey-image monkey-black-image" />
                  <Logo className="center-logo center-logo-dark" />
                </>
              }
              {theme.darkMode === false &&
                <>
                  <div className="monkey-image-wrapper">
                    <img src={monkeyWhite} alt="Aristocrat" className="monkey-image monkey-white-image" />
                  </div>
                  <Logo className="center-logo center-logo-light" />
                </>
              } */}
              <img src={monkey} alt="Aristocrat" className="monkey-image monkey-black-image" />
              <Logo className="center-logo center-logo-dark" />

            </div>
            <div className="login-fields">
              <div className="login-title">
                {i18next.t("Authorization")}
              </div>
              <div className="login-description">
                {i18next.t("Private login in the system with protection of personal data.")}
              </div>

              {!mode2fa && 
                <form onSubmit={(e) => loginFunction(e)} >
                  <div className="login-input-container">
                    {isMobile &&
                      <input
                        className="login-input"
                        autoComplete="on"
                        type="text"
                        value={loginInput}
                        placeholder={i18next.t("Login")}
                        onChange={e => setLoginInput(e.target.value)}
                        ref={loginInputRef}
                      >
                      </input>
                    }
                    {!isMobile &&
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
                    }
                  </div>
                  <div className="login-input-container">
                    {isMobile &&
                      <input
                        className="login-input"
                        autoComplete="current-password"
                        type={passVisible ? 'text' : 'password'}
                        value={passwordInput}
                        placeholder={i18next.t("Password")}
                        onChange={e => setPasswordInput(e.target.value)}
                        ref={passInputRef}
                        enterKeyHint="go"
                      >
                      </input>
                    }
                    {!isMobile &&
                      <IonItem lines="none">
                        <IonInput
                          autocomplete="current-password"
                          type={passVisible ? 'text' : 'password'}
                          value={passwordInput}
                          placeholder={i18next.t("Password")}
                          onIonChange={e => setPasswordInput(e.detail.value)}
                        >
                        </IonInput>
                        <IonIcon
                          slot="start"
                          icon={passwordPic}
                        >
                        </IonIcon>
                        <IonIcon
                          slot="end"
                          icon={passVisible ? passIconClose : passIconOpen}
                          onClick={() => {
                            setPassVisible(!passVisible);
                          }}
                          className="pass-eye-icon"
                        >
                        </IonIcon>
                      </IonItem>
                    }
                  </div>

                  <div className="forgot-password" onClick={() => history.push('/forgot')}>
                    {i18next.t("Forgot password")}?
                  </div>

                  <button
                    className="main-button ion-activatable"
                    type="submit"
                  >
                    <span>
                      {i18next.t("Authorize")}
                    </span>
                    <IonRippleEffect />
                  </button>
                </form>
              }

              {mode2fa && 
                <form onSubmit={(e) => confirmationLogin(e)} >
                  <div className="login-input-container">
                    <IonItem lines="none">
                      <IonInput
                        type="text"
                        value={confirmationCode}
                        placeholder={i18next.t("Confirmation code")}
                        onIonChange={e => setConfirmationCode(e.detail.value)}
                      >
                      </IonInput>
                    </IonItem>
                  </div>
                  <button
                    className="main-button ion-activatable"
                    type="submit"
                  >
                    <span>
                      {i18next.t("Authorize")}
                    </span>
                    <IonRippleEffect />
                  </button>
                </form>
              }
            </div>
          </div>

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
        <IonToast
          cssClass='custom-toast wrong'
          mode="ios"
          position="top"
          slot="fixed"
          isOpen={error}
          onDidDismiss={() => setError(false)}
          message={errorText}
          duration={3000}
        />
        <IonToast
          cssClass='custom-toast good'
          mode="ios"
          position="top"
          isOpen={toast}
          onDidDismiss={() => setToast(false)}
          message={toastText}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};
