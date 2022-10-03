import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import { toggleToastText, toggleToast, toggleErrorToastText, toggleErrorToast } from '../../store/actions';
import ChangePassInputs from './account-general/ChangePassInputs';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { IonBackButton, IonRippleEffect } from '@ionic/react';
import i18next from 'i18next';

const ChangePassword = props => {
   const dispatch = useDispatch();
   const width = useSelector(state => state.width);
   const login = useSelector(state => state.user.login);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("Change password");

   const [open, setOpen] = useState(true);
   const [step, setStep] = useState(1);
   const [email, setEmail] = useState('');
   const [newPass1, setNewPass1] = useState('');
   const [newPass2, setNewPass2] = useState('');
   const [vcode, setVcode] = useState('');

   function changePassword() {
      API.restorePassword(login).then(res => {
         if (res.data.error) {
            dispatch(toggleErrorToastText(res.data.error));
            dispatch(toggleErrorToast(true))
         }
         if (!res.data.error) {
            setStep(2);
            dispatch(toggleToastText('A verification code has been sent to your email.'));
            dispatch(toggleToast(true));
         }
      })
   }

   function restoreConfirm() {
      if (newPass1 === newPass2 && vcode !== '') {
         const obj = {
            password: newPass1,
            confirmation: vcode,
            restore: login
         }
         API.updatePassword(obj)
            .then(res => {
               if (res.data.errors) {
                  dispatch(toggleErrorToastText(res.data.errors));
                  dispatch(toggleErrorToast(true))
               };
               if (!res.data.errors) {
                  dispatch(toggleToastText('Your password is successfully changed'));
                  dispatch(toggleToast(true));
                  setNewPass1('');
                  setNewPass2('');
                  setVcode('');
                  setEmail('');
                  setStep(1);
               }
            })
      }
   }

   return (
      <div className="rectangular-area-wrapper small">
         <div className={(open ? "open " : "close ") +
            (!props.cards.finances && !props.cards.security ? 'small-user-settings-card ' : '') +
            (isMobile ? "account-mobile-container " : "") +
            "rectangular-area"
         }
         >
            {/* Headers */}

            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, changePassword: false })} />
               </div>
            }

            {isMobile &&
               <div className='back-container'>
                  <IonBackButton defaultHref="/account" text={i18next.t("Back")} />
               </div>
            }

            {isTablet &&
               <div
                  className="dashboard-head-tablet"
                  onClick={() => setOpen(!open)}
               >
                  <span>{title}</span>
                  <ArrowIcon className="fold-icon" />
               </div>
            }

            {isMobile &&
               <div className="dashboard-head-mobile">{title}</div>
            }

            {/* Body */}

            <div className={(isMobile ? "dashboard-body-mobile " : "") + "dashboard-body"}>
               <ChangePassInputs
                  step={step}
                  email={email}
                  setEmail={setEmail}
                  newPass1={newPass1}
                  setNewPass1={setNewPass1}
                  newPass2={newPass2}
                  setNewPass2={setNewPass2}
                  vcode={vcode}
                  setVcode={setVcode}
               />
            </div>
            {step === 1 &&
               <div
                  className="take-loan settings-save-btn ion-activatable"
                  onClick={() => {
                     changePassword()
                  }}
               >
                  <IonRippleEffect />
                  {i18next.t("Send email")}
               </div>
            }
            {step === 2 &&
               <div
                  className="take-loan settings-save-btn ion-activatable"
                  onClick={() => restoreConfirm()}
               >
                  <IonRippleEffect />
                  {i18next.t("Save changes")}
               </div>
            }
         </div>
      </div>
   )
}

export default ChangePassword;
