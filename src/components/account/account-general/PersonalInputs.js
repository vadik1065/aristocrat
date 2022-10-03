import React from 'react';
import {
   IonItem,
   IonSelect,
   IonSelectOption,
   IonInput,
   IonIcon
} from '@ionic/react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../store/actions';
import filled from '../../../images/filled.svg';
import i18next from 'i18next';


const PersonalInputs = (props) => {
   const dispatch = useDispatch();
   const options = { cssClass: 'custom-select' };
   return (
      <form onSubmit={(e) => e.preventDefault()}>

         <div className="input-container-light">
            <div className="input-label">
               {i18next.t("First Name")}
            </div>
            <IonItem lines="none">
               <IonInput
                  value={props.check.firstName}
                  onIonChange={e => props.setCheck({ ...props.check, firstName: e.detail.value })}
               >
               </IonInput>
               <IonIcon icon={filled} />
            </IonItem>
         </div>

         <div className="input-container-light">
            <div className="input-label">
               {i18next.t("Last Name")}
            </div>
            <IonItem lines="none">
               <IonInput
                  value={props.check.lastName}
                  onIonChange={e => props.setCheck({ ...props.check, lastName: e.detail.value })}
               >
               </IonInput>
               <IonIcon icon={filled} />
            </IonItem>
         </div>

         <div className="input-container-light">
            <div className="input-label">
               {i18next.t("Email")}
            </div>
            <IonItem lines="none">
               <IonInput
                  value={props.check.email}
                  onIonChange={e => props.setCheck({ ...props.check, email: e.detail.value })}
               >
               </IonInput>
               <IonIcon icon={filled} />
            </IonItem>
         </div>

         <div className="input-container-light">
            <div className="input-label">
               {i18next.t("Phone")}
            </div>
            <div className="merge-input-select phone-container">
               <IonSelect
                  interfaceOptions={options}
                  value={props.user.countryCode}
                  onIonChange={e => {
                     dispatch(updateUserInfo({ countryCode: e.detail.value }));
                  }}
                  interface={'popover'}
                  mode={'md'}
               >
                  <IonSelectOption value="+7">+7</IonSelectOption>
                  <IonSelectOption value="8">8</IonSelectOption>
                  <IonSelectOption value="+44">+44</IonSelectOption>
               </IonSelect>
               <IonItem lines="none">
                  <IonInput
                     type="text"
                     value={props.check.phone}
                     onIonChange={e => props.setCheck({ ...props.check, phone: e.detail.value })}
                  >
                  </IonInput>
                  <IonIcon icon={filled} />
               </IonItem>
            </div>
         </div>

      </form>
   )
}

export default PersonalInputs;
