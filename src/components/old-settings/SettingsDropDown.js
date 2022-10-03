import React, { useState } from "react";
import { useSelector } from 'react-redux';
// Ionic
import {
   IonContent,
   IonSegment,
   IonSegmentButton,
   IonLabel
} from '@ionic/react';
// Components
import SystemSettings from './SystemSettings.js';
import MarketsSettings from './MarketsSettings.js';
import LeaguesSettings from './LeaguesSettings.js';
// CSS
// import '../../css/old-settings.css';

const Settings = props => {
   const [settingsSegmentValue, setSettingsSegmentValue] = useState('system');
   const accent = useSelector(state => state.settings.accent);
   return (
      <IonContent className={"settings " + (accent)}>
         <div className="settings-backdrop"></div>
         <div id="settingsModal">
            <div className="settings-container">
               <IonSegment
                  mode={"ios"}
                  value={settingsSegmentValue}
                  className={"top-segment " + (accent)}
                  onIonChange={e => setSettingsSegmentValue(e.detail.value)}
               >
                  <IonSegmentButton type={"button"} value="system">
                     <IonLabel>System</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton type={"button"} value="leagues">
                     <IonLabel>Leagues</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton type={"button"} value="markets">
                     <IonLabel>Markets</IonLabel>
                  </IonSegmentButton>
               </IonSegment>

               {settingsSegmentValue === 'system' &&
                  <SystemSettings />
               }

               {settingsSegmentValue === 'leagues' &&
                  <LeaguesSettings />
               }

               {settingsSegmentValue === 'markets' &&
                  <MarketsSettings />
               }
            </div>
         </div>
      </IonContent>
   )
}

export default Settings;
