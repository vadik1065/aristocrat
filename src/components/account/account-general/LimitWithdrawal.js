import React, { useState } from 'react';
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
import { updateUserInfo, toggleToastText, toggleToast, getUserInfo } from '../../../store/actions';
// Icons
import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';
import i18next from 'i18next';

const LimitWithdrawal = (props) => {
   const width = useSelector(state => state.width);
   const isMobile = width <= 600;
   const [changed, setChanged] = useState(false);
   const dispatch = useDispatch();
   const token = useSelector(state => state.token);
   const user = useSelector(
      ({ user }) => ({
         day_limit_withdrawal: user.day_limit_withdrawal,
         week_limit_withdrawal: user.week_limit_withdrawal,
         month_limit_withdrawal: user.month_limit_withdrawal,
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
   const [withdrawalOpen, setWithdrawalOpen] = useState(isMobile);
   const [withdrawalToggle, setWithdrawalToggle] = useState('day');
   const options = { cssClass: 'custom-select' };
   function isChanged(a, b) {
      a !== b ? setChanged(true) : setChanged(false);
   }
   function saveSettings() {
      changeProfile({
         day_limit_withdrawal: user.day_limit_withdrawal,
         week_limit_withdrawal: user.week_limit_withdrawal,
         month_limit_withdrawal: user.month_limit_withdrawal,
      })
   }
   return (
      <div className={(withdrawalOpen === false ? "open" : "close") + ' dashboard-grid-item'}>
         <div
            className="dashboard-grid-head"
            onClick={() => setWithdrawalOpen(!withdrawalOpen)}
         >
            <span>
               {i18next.t("Limit withdrawal of funds")}
            </span>
            <ArrowIcon className="fold-icon" />
         </div>
         {/* dashboard-grid-container */}
         <div className="dashboard-grid-container">
            <IonSegment
               mode={"ios"}
               value={withdrawalToggle}
               className="top-segment dark-segment"
               onIonChange={e => setWithdrawalToggle(e.detail.value)}
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
                     {
                        /*
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
                        {withdrawalToggle === 'day' &&
                           <IonInput
                              type="text"
                              value={user.day_limit_withdrawal}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ day_limit_withdrawal: e.detail.value })); isChanged(user.day_limit_withdrawal, e.detail.value) }}
                           // onIonBlur={() => changeProfile({day_limit_withdrawal: user.day_limit_withdrawal})}
                           >
                           </IonInput>
                        }
                        {withdrawalToggle === 'week' &&
                           <IonInput
                              type="text"
                              value={user.week_limit_withdrawal}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ week_limit_withdrawal: e.detail.value })); isChanged(user.week_limit_withdrawal, e.detail.value) }}
                           // onIonBlur={() => changeProfile({month_limit_withdrawal: user.month_limit_withdrawal})}
                           >
                           </IonInput>
                        }
                        {withdrawalToggle === 'month' &&
                           <IonInput
                              type="text"
                              value={user.month_limit_withdrawal}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ month_limit_withdrawal: e.detail.value })); isChanged(user.month_limit_withdrawal, e.detail.value) }}
                           // onIonBlur={() => changeProfile({month_limit_withdrawal: user.month_limit_withdrawal})}
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

export default LimitWithdrawal;
