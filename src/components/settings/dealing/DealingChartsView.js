import React, { useState } from 'react';
import {
   IonSelect, IonSelectOption, IonToggle
} from '@ionic/react';
import i18next from 'i18next';


const DealingChartsView = () => {
   const options = { cssClass: 'custom-select' };
   const [chartsToggle, setChartsToggle] = useState(false);
   const [chartsOpen, setChartsOpen] = useState('Tap');



   return (
      <div className="dealing-charts-view" >
         <div>
            <div className="settings-title-big">
               {i18next.t("Charts view")}
            </div>
            <div className="notification-dealing-item">
               <div>{i18next.t("Charts")}</div>
               <IonToggle
                  className='toggle-card orange-toggle'
                  checked={chartsToggle}
                  onIonChange={(e) => setChartsToggle(e.detail.checked)}
               />
            </div>
         </div>

         <div className="dealing-handicap-container dealing-handicap-score-container">
            <div className='settings-title-small'>
               {i18next.t("Charts open by")}
            </div>
            <IonSelect
               disabled={!chartsToggle}
               mode={'md'}
               className='settings-card-toggle settings-card-toggle-dark'
               value={chartsOpen}
               onIonChange={e => setChartsOpen(e.detail.value)}
               interfaceOptions={options}
               interface={'popover'}
            >
               <IonSelectOption value="Tap">{i18next.t("Tap")}</IonSelectOption>
               <IonSelectOption value="Always_Open">{i18next.t("Always Open")}</IonSelectOption>
            </IonSelect>
         </div>
      </div >


   )
}

export default DealingChartsView;
