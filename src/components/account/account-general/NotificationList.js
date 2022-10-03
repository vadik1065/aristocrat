import React, { useState } from 'react';
import { IonToggle } from '@ionic/react'
import i18next from 'i18next';

const NotificationList = (props) => {
   const [betNotificationsChecked, setBetNotificationsChecked] = useState(false);
   const [resultNotificationsChecked, setResultNotificationsChecked] = useState(false);
   const [chatNotificationsChecked, setChatNotificationsChecked] = useState(false);

   return (
      <>
         <div className="notification-item">
            <div>
               {i18next.t("Bet notifications")}
            </div>
            <IonToggle
               className='toggle-card orange-toggle'
               checked={betNotificationsChecked}
               onIonChange={(e) => setBetNotificationsChecked(e.detail.checked)}
            />
         </div>
         <div className="notification-item">
            <div>
               {i18next.t("Result notifications")}
            </div>
            <IonToggle
               className='toggle-card orange-toggle'
               checked={resultNotificationsChecked}
               onIonChange={(e) => setResultNotificationsChecked(e.detail.checked)}
            />
         </div>
         <div className="notification-item">
            <div>
               {i18next.t("Chat notifications")}
            </div>
            <IonToggle
               className='toggle-card orange-toggle'
               checked={chatNotificationsChecked}
               onIonChange={(e) => setChatNotificationsChecked(e.detail.checked)}
            />
         </div>
      </>
   )
}
export default NotificationList