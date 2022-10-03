import React, { useState } from 'react';
import {
   IonItem,
   IonInput,
   IonIcon
} from '@ionic/react';
// Icons
import passIconOpen from '../../../images/eye-opened.svg';
import passIconClose from '../../../images/eye-closed.svg';
import i18next from 'i18next';

const ChangePassInputs = (props) => {
   const [passVisible, setPassVisible] = useState(false);

   return (
      <form onSubmit={(e) => e.preventDefault()}>
         {props.step === 1 && <div className="dashboard-grid-content-text">
            {i18next.t("To change your password, you need access to your email. We will send you a verification code.")}
         </div>}
         {/* {props.step === 1 &&
            <div className="input-container-light">
               <div className="input-label">
                  {i18next.t("Email")} <span className="required">*</span>
               </div>
               <IonItem lines="none">
                  <IonInput
                     inputmode="email"
                     type="email"
                     value={props.email}
                     onIonChange={(e) => props.setEmail(e.detail.value)}
                  >
                  </IonInput>
               </IonItem>
            </div>
         } */}
         {props.step === 2 &&
            <>
               <div className="input-container-light">
                  <div className="input-label">
                     {i18next.t("New password")} <span className="required">*</span>
                  </div>

                  <IonItem lines="none">
                     <IonInput
                        type={passVisible ? 'text' : 'password'}
                        value={props.newPass1}
                        onIonChange={(e) => props.setNewPass1(e.detail.value)}
                     >
                     </IonInput>
                     <IonIcon
                        className="password-eye"
                        icon={passVisible ? passIconClose : passIconOpen}
                        onClick={() => {
                           setPassVisible(!passVisible);
                        }}
                     >
                     </IonIcon>
                  </IonItem>
               </div>

               <div className="input-container-light">
                  <div className="input-label">
                     {i18next.t("Repeat")} <span className="required">*</span>
                  </div>
                  <IonItem lines="none">
                     <IonInput
                        type={passVisible ? 'text' : 'password'}
                        value={props.newPass2}
                        onIonChange={(e) => props.setNewPass2(e.detail.value)}
                     ></IonInput>
                     <IonIcon
                        className="password-eye"
                        icon={passVisible ? passIconClose : passIconOpen}
                        onClick={() => {
                           setPassVisible(!passVisible);
                        }}
                     ></IonIcon>
                  </IonItem>
               </div>

               <div className="input-container-light">
                  <div className="input-label">
                     {i18next.t("Verification code")} <span className="required">*</span>
                  </div>
                  <IonItem lines="none">
                     <IonInput
                        value={props.vcode}
                        onIonChange={(e) => props.setVcode(e.detail.value)}
                     ></IonInput>
                  </IonItem>
               </div>
            </>
         }
      </form>
   )
}

export default ChangePassInputs;
