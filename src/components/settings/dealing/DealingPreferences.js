import React, { useState } from 'react';
import {
   IonItem, IonLabel, IonRadio, IonRadioGroup, IonToggle
} from '@ionic/react';
import i18next from 'i18next';


const DealingPreferences = ({ betsPresetsRadio }) => {
   const [selected, setSelected] = useState(betsPresetsRadio[0]);
   const [lastBetType, setLastBetType] = useState(false);

   return (
      <div className="dealing-betting-preferences dealing-settings-block">
         <div className="settings-title-big">
            {i18next.t("Betting preferences")}
         </div>
         <div className="settings-title-small">
            {i18next.t("Bets presets")}
         </div>
         <div className="dealing-presents-radio">
            <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
               {betsPresetsRadio.map((value, i) => (
                  <IonItem key={i}>
                     <IonRadio slot="end" value={value} mode="ios" />
                     <IonLabel>{i18next.t(value)}</IonLabel>
                  </IonItem>
               ))}
            </IonRadioGroup>
         </div>

         {/* <div className="notification-dealing-item">
            <div>
               {i18next.t("Save last bet type")}
            </div>
            <IonToggle  
               className='toggle-card orange-toggle'
               checked={lastBetType}
               onIonChange={(e) => setLastBetType(e.detail.checked)}
            />
         </div> */}
      </div>
   )
}

export default DealingPreferences;
