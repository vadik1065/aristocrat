import React, { useState } from 'react';
import {
   IonItem,
   IonInput,
   IonSegment,
   IonSegmentButton,
   IonLabel,
   IonIcon,
   IonRippleEffect
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import { toggleToastText, toggleToast, updateUserInfo, getUserInfo } from '../../../store/actions';
// Icons
import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';
import i18next from 'i18next';

const LimitAmount = (props) => {
   const width = useSelector(state => state.width);
   const isMobile = width <= 600;
   const dispatch = useDispatch();
   const [changed, setChanged] = useState(false);
   const token = useSelector(state => state.token);
   const user = useSelector(
      ({ user }) => ({
         day_limit_bet: user.day_limit_bet,
         week_limit_bet: user.week_limit_bet,
         month_limit_bet: user.month_limit_bet,
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
   function isChanged(a, b) {
      a !== b ? setChanged(true) : setChanged(false);
   }
   function saveSettings() {
      changeProfile({
         day_limit_bet: user.day_limit_bet,
         week_limit_bet: user.week_limit_bet,
         month_limit_bet: user.month_limit_bet,
      })
   }
   const [betsAmountOpen, setBetsAmountOpen] = useState(isMobile);
   const [betsAmountOpenToggle, setBetsAmountOpenToggle] = useState('day');
   const options = { cssClass: 'custom-select' };

   return (
      <div className={(betsAmountOpen === false ? "open" : "close") + ' dashboard-grid-item'}>
         <div
            className="dashboard-grid-head"
            onClick={() => setBetsAmountOpen(!betsAmountOpen)}
         >
            <span>
               {i18next.t("Limit the amount of bets")}
            </span>
            <ArrowIcon className="fold-icon" />
         </div>

         {/* dashboard-grid-container */}
         <div className="dashboard-grid-container">
            <IonSegment
               mode={"ios"}
               value={betsAmountOpenToggle}
               className="top-segment dark-segment"
               onIonChange={e => setBetsAmountOpenToggle(e.detail.value)}
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
                     */}
                     <IonItem lines="none" className="without-select">
                        {betsAmountOpenToggle === 'day' &&
                           <IonInput
                              type="text"
                              value={user.day_limit_bet}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ day_limit_bet: e.detail.value })); isChanged(user.day_limit_bet, e.detail.value); }}
                           // onIonBlur={() => changeProfile({day_limit_bet: user.day_limit_bet})}
                           >
                           </IonInput>
                        }
                        {betsAmountOpenToggle === 'week' &&
                           <IonInput
                              type="text"
                              value={user.week_limit_bet}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ week_limit_bet: e.detail.value })); isChanged(user.week_limit_bet, e.detail.value) }}
                           // onIonBlur={() => changeProfile({month_limit_bet: user.month_limit_bet})}
                           >
                           </IonInput>
                        }
                        {betsAmountOpenToggle === 'month' &&
                           <IonInput
                              type="text"
                              value={user.month_limit_bet}
                              clearInput={true}
                              onIonChange={(e) => { dispatch(updateUserInfo({ month_limit_bet: e.detail.value })); isChanged(user.month_limit_bet, e.detail.value) }}
                           // onIonBlur={() => changeProfile({month_limit_bet: user.month_limit_bet})}
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

export default LimitAmount;
