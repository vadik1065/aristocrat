import React, { useState } from 'react';
import {
  IonContent, IonPage, IonItem, IonInput, IonIcon,
  IonButtons, IonButton, IonSegment, IonSegmentButton,
  IonLabel, IonSelect, IonSelectOption, IonRippleEffect
} from '@ionic/react';
import { useHistory } from "react-router-dom";
// Icons
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import { returnUpBackOutline } from 'ionicons/icons';
import { ReactComponent as Logo } from '../../images/logo-aristocrat/logo.svg';
import footballPlayerSmall from '../../images/backgrounds/football-player-main.png';
import footballPlayerBig from '../../images/backgrounds/football-player-main-big.png';
import userPic from '../../images/userpic.svg';
import passwordPic from '../../images/password.svg';
import passIconOpen from '../../images/eye-opened.svg';
import passIconClose from '../../images/eye-opened.svg';
// CSS
import '../../css/login.css';
import i18next from 'i18next';

export default function EditLogin() {
  const history = useHistory();
  const options = { cssClass: 'custom-select' };
  const [passVisible, setPassVisible] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [repeatPasswordInput, setRepeatPasswordInput] = useState('');
  const [segmentValue, setSegmentValue] = useState('both');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [countryCode, setCountryCode] = useState('+44');



  return (
    <IonPage className="edit-login">
      <div className='login-toolbar'>
        <IonButtons slot="start" className="login-back-btn">
          <IonButton onClick={() => history.push('/login')}>
            <IonIcon slot="start" icon={returnUpBackOutline} />
          </IonButton>
        </IonButtons>
      </div>

      <IonContent fullscreen>
        <div className="login-container">
          <div className="login-left-block">

            <div className="login-fields">
              <div className="login-title">
                {i18next.t("Edit login info")}
              </div>
              <div className="login-description edit-login-description">
                {i18next.t("Private registration was successful, now you can change your current password and add email or phone to login in app faster.")}
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                history.push('/live')
              }}>
                <div className="login-input-container">
                  <div className="login-label-name">
                    {i18next.t("New password")} <span className="require">*</span>
                  </div>
                  <IonItem lines="none">
                    <IonInput
                      type={passVisible ? 'text' : 'password'}
                      value={newPasswordInput}
                      placeholder={i18next.t("Password")}
                      onIonChange={e => setNewPasswordInput(e.detail.value)}
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
                </div>

                <div className="login-input-container">
                  <div className="login-label-name">
                    {i18next.t("Repeat password")} <span className="require">*</span>
                  </div>
                  <IonItem lines="none">
                    <IonInput
                      type={passVisible ? 'text' : 'password'}
                      value={repeatPasswordInput}
                      placeholder={i18next.t("Password")}
                      onIonChange={e => setRepeatPasswordInput(e.detail.value)}
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
                </div>

                <div className="login-input-container">
                  <div className="login-label-name">
                    {i18next.t("Add personal info for login")}
                  </div>
                  <IonSegment
                    mode={"ios"}
                    value={segmentValue}
                    className="top-segment"
                    onIonChange={e => setSegmentValue(e.detail.value)}
                  >
                    <IonSegmentButton type={"button"} value="email">
                      <IonLabel>
                        {i18next.t("Email")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton type={"button"} value="phone">
                      <IonLabel>
                        {i18next.t("Phone")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton type={"button"} value="both">
                      <IonLabel>
                        {i18next.t("Both")}
                      </IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </div>


                {segmentValue !== "phone" &&
                  <div className="login-input-container">
                    <div className="login-label-name">
                      {i18next.t("Email")}
                    </div>
                    <IonItem lines="none">
                      <IonInput
                        type="text"
                        value={emailInput}
                        placeholder={i18next.t("Login")}
                        onIonChange={e => setEmailInput(e.detail.value)}
                      >
                      </IonInput>
                      <IonIcon
                        slot="start"
                        icon={userPic}
                      >
                      </IonIcon>
                    </IonItem>
                  </div>
                }

                {segmentValue !== "email" &&
                  <div className="login-input-container login-phone-container">
                    <div className="login-label-name">
                      {i18next.t("Phone")}
                    </div>
                    <IonItem lines="none">
                      <IonSelect
                        interfaceOptions={options}
                        value={countryCode}
                        onIonChange={e => setCountryCode(e.detail.value)}
                        interface={'popover'}
                        mode={'md'}
                      >
                        <IonSelectOption value="+44">+44</IonSelectOption>
                        <IonSelectOption value="+45">+45</IonSelectOption>
                      </IonSelect>
                      <IonInput
                        type="text"
                        value={phoneInput}
                        placeholder={i18next.t("Phone")}
                        onIonChange={e => setPhoneInput(e.detail.value)}
                      >
                      </IonInput>
                    </IonItem>
                  </div>
                }
                <button
                  className="main-button ion-activatable"
                  type="submit"
                >
                  <span>
                    {i18next.t("Save")}
                  </span>
                  <IonRippleEffect />
                </button>
              </form>
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

      </IonContent>
    </IonPage>
  );
};
