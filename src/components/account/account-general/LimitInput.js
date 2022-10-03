import React, { useRef, useState } from 'react';
import {
   IonItem,
   IonInput,
   IonSelect,
   IonSelectOption,
   IonSegment,
   IonSegmentButton,
   IonLabel,
   IonIcon,
   IonRippleEffect
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import { getUserInfo, updateUserInfo } from '../../../store/actions';
// Icons
import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';
import { toggleToastText, toggleToast } from '../../../store/actions';
import i18next from 'i18next';

const LimitInput = () => {

   const width = useSelector(state => state.width);
   const isMobile = width <= 600;
   const dispatch = useDispatch();
   const token = useSelector(state => state.token);
   const [changed, setChanged] = useState(false);
   const user = useSelector(
      ({ user }) => ({
         day_limit_deposit: user.day_limit_deposit,
         week_limit_deposit: user.week_limit_deposit,
         month_limit_deposit: user.month_limit_deposit,
      })
   );
   const changeProfile = (updUser) => {
      API.updateProfile(token, updUser).then(res => {
         API.getInfo(token).then(response => {
            dispatch(getUserInfo(response));
            dispatch(toggleToastText('Your personal data was updated.'));
            dispatch(toggleToast(true));
            setChanged(false)
         })
      })
   }
   const [inputOpen, setInputOpen] = useState(isMobile);
   const [inputOpenToggle, setInputOpenToggle] = useState('day');
   const options = { cssClass: 'custom-select' };
   function isChanged(a, b) {
      a !== b ? setChanged(true) : setChanged(false);
   }
   function saveSettings() {
      changeProfile({
         day_limit_deposit: user.day_limit_deposit,
         week_limit_deposit: user.week_limit_deposit,
         month_limit_deposit: user.month_limit_deposit,
      })
   }
   return (
      <div className={(inputOpen === false ? "open" : "close") + ' dashboard-grid-item'}>
         <div
            className="dashboard-grid-head"
            onClick={() => setInputOpen(!inputOpen)}
         >
            <span>
               {i18next.t("Limit the input means")}
            </span>
            <ArrowIcon className="fold-icon" />
         </div>
         {/* dashboard-grid-container */}
         <div className="dashboard-grid-container">
            {/*
               <div className="dashboard-grid-content-text">Stronger security for your Account. With 2-Step Verification, you'll protect your account with both your password and your phone.</div>
            */
            }

            <IonSegment
               mode={"ios"}
               value={inputOpenToggle}
               className="top-segment dark-segment"
               onIonChange={e => setInputOpenToggle(e.detail.value)}
            >
               <IonSegmentButton type={"button"} value="day">
                  <IonLabel>
                     {i18next.t("Day")}
                  </IonLabel>
               </IonSegmentButton>
               <IonSegmentButton type={"button"} value="week">
                  <IonLabel>
                     {i18next.t("Week")}
                  </IonLabel>
               </IonSegmentButton>
               <IonSegmentButton type={"button"} value="month">
                  <IonLabel>
                     {i18next.t("Month")}
                  </IonLabel>
               </IonSegmentButton>
            </IonSegment>

            <form onSubmit={(e) => e.preventDefault()}>
               <div className="input-container-dark amount-container">
                  <div className="input-label">
                     {i18next.t("Amount")}
                  </div>
                  <div className="merge-input-select">
                     {/*
                        <IonSelect
                        value={user.currency}
                        onIonChange={e => dispatch(updateUserInfo({currency: e.detail.value}))}
                        interfaceOptions={options}
                        interface={'popover'}
                        mode={'md'}
                     >
                        <IonSelectOption value={840}>USD</IonSelectOption>
                        <IonSelectOption value={978}>EUR</IonSelectOption>
                     </IonSelect>
                     */
                     }
                     <IonItem lines="none" className="without-select">
                        {inputOpenToggle === 'day' &&
                           <IonInput
                              type="text"
                              value={user.day_limit_deposit}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ day_limit_deposit: e.detail.value })); isChanged(user.day_limit_deposit, e.detail.value); }}
                           // onIonBlur={() => changeProfile({day_limit_deposit: user.day_limit_deposit})}
                           >
                           </IonInput>
                        }
                        {inputOpenToggle === 'week' &&
                           <IonInput
                              type="text"
                              value={user.week_limit_deposit}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ week_limit_deposit: e.detail.value })); isChanged(user.week_limit_deposit, e.detail.value); }}
                           // onIonBlur={() => changeProfile({month_limit_deposit: user.month_limit_deposit})}
                           >
                           </IonInput>
                        }
                        {inputOpenToggle === 'month' &&
                           <IonInput
                              type="text"
                              value={user.month_limit_deposit}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ month_limit_deposit: e.detail.value })); isChanged(user.month_limit_deposit, e.detail.value); }}
                           // onIonBlur={() => changeProfile({month_limit_deposit: user.month_limit_deposit})}
                           >
                           </IonInput>
                        }
                     </IonItem>
                  </div>
               </div>
            </form>
         </div>
         {changed && <div onClick={() => saveSettings()} className="take-loan settings-save-btn ion-activatable">
            <IonRippleEffect />
            {i18next.t("Save changes")}
         </div>}
      </div>
   )
}
export default LimitInput