import React, { useEffect, useState } from 'react';
import {
  IonItem,
  IonInput,
  IonToggle,
  IonRippleEffect
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import { getUserInfo, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../../../store/actions';
import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';
import i18next from 'i18next';

const TwoFactorAuthentication = () => {
  const dispatch = useDispatch();
  const width = useSelector(state => state.width);
  const isMobile = width <= 600;
  const token = useSelector(state => state.token);
  const [changed, setChanged] = useState(false);
  const [step, setStep] = useState(1);
  const [vcode, setVcode] = useState('');
  const [twoFactor, setTwofactor] = useState(isMobile);
  const mode2fa = useSelector(state => state.user.mode2fa);
  const [twoFactorChecked, setTwoFactorChecked] = useState(false);

  useEffect(() => {
    setTwoFactorChecked(!!mode2fa)
  }, [mode2fa]);
  
  function changeTwoFA(val) {
    setTwoFactorChecked(val);
    setChanged(true);
  }

  function sendEmail() {
    API.set2faMode(token, twoFactor)
      .then(() => {
        setStep(2);
        dispatch(toggleToastText('A verification code has been sent to your email.'));
        dispatch(toggleToast(true));
        setChanged(false);
      }).catch((err) => {
        dispatch(toggleErrorToastText(err.response.data.error[0]));
        dispatch(toggleErrorToast(true));
      })
  }

  function changeAuthMode() {
    if (vcode) {
      API.confirm2faMode(token, twoFactorChecked, vcode).then(res => {
        if (!res.data.error) {
          setStep(1);
          dispatch(toggleToastText(i18next.t(`Two-Factor Authentication is ${twoFactorChecked ? 'enabled' : 'disabled'}.`)));
          dispatch(toggleToast(true));
          setVcode('');
        }
        if (res.data.error) {
          dispatch(toggleErrorToastText(res.data.error));
          dispatch(toggleErrorToast(true))
        }
      }).catch((err) => {
        dispatch(toggleErrorToastText(err.response.data.error));
        dispatch(toggleErrorToast(true));
      })
    }
  }

  return (
    <div className={(twoFactor === false ? "open" : "close") + ' dashboard-grid-item two-factor'}>
      <div
        className="dashboard-grid-head"
        onClick={() => setTwofactor(!twoFactor)}
      >
        <span>
          {i18next.t("Two-Factor Authentication")}
        </span>
        <ArrowIcon className="fold-icon" />
      </div>

      <div className="dashboard-grid-container">
        <div className="dashboard-grid-content">
          <div className="dashboard-grid-content-title">
            <div>
              {i18next.t("2FA via E-mail")}
            </div>
            <IonToggle
              className='toggle-card orange-toggle'
              checked={twoFactorChecked}
              onIonChange={(e) => changeTwoFA(e.detail.checked)}
            />
          </div>
          <div className="dashboard-grid-content-text">
            {i18next.t("Stronger security for your Account. With 2-Step Verification, you'll protect your account with both your password and your e-mail.")}
            {' '}
            {i18next.t("To change your authentication mode, you need access to your email. We will send you a verification code.")}
          </div>
        </div>

        {step === 2 && 
          <div className="input-container-light">
            <div className="input-label">
              {i18next.t("Verification code")}
            </div>
            <IonItem lines="none">
              <IonInput
                value={vcode}
                onIonChange={(e) => setVcode(e.detail.value)}
              ></IonInput>
            </IonItem>
          </div>
        }
      </div>

      {step === 1 && changed && 
        <div
          className="take-loan settings-save-btn ion-activatable"
          onClick={() => sendEmail()}
        >
          <IonRippleEffect />
          {i18next.t("Send email")}
        </div>
      }

      {step === 2 && vcode &&
        <div
          className="take-loan settings-save-btn ion-activatable"
          onClick={() => changeAuthMode()}
        >
          <IonRippleEffect />
          {i18next.t("Save changes")}
        </div>
      }
    </div>

  )
}

export default TwoFactorAuthentication;
