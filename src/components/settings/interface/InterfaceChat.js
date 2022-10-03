import React from 'react';
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
import { useSelector } from 'react-redux';
import { ReactComponent as TailLeft } from '../../../images/Tail-left.svg';
import { ReactComponent as TailRight } from '../../../images/Tail.svg';
import i18next from 'i18next';
import { radioList } from '../../../utils/utils';
import useUpdateSettings from '../../../hooks/useUpdateSettings';

const InterfaceChat = () => {
   const { updateSettings } = useUpdateSettings();
   const fontSize = useSelector(state => state.settings.fontSize);

   function changeFont(val) {
      updateSettings({ fontSize: val });
   }

   return (
      <div className="interface-block">
         <div className="interface-block-inner">
            <div className="settings-title-big">
               {i18next.t("Chat Interface")}
            </div>
            <div className="interface-textsize-panel">
               <div className="settings-title-small">
                  {i18next.t("Text size")}
               </div>
               <div className="interface-textsize-list">
                  <IonRadioGroup
                     value={fontSize}
                     onIonChange={e => changeFont(e.detail.value)}
                  >
                     {radioList.map((el, i) => (
                        <IonItem key={i}>
                           <IonRadio slot="start" value={el.value} mode="md" />
                           <IonLabel>{i18next.t(el.title)}</IonLabel>
                        </IonItem>
                     ))}
                  </IonRadioGroup>
               </div>

               {/* {selected === radioList[0] && */}
               <div className="interface-textsize-view-list">
                  <div className="interface-textsize-view-item">
                     <div className="interface-textsize-view-label">
                        {i18next.t("Response")}
                     </div>
                     <div className={`incoming-message ${fontSize}`}>
                        <TailLeft className="tail" />
                        <div className={`message-text ${fontSize}`}>Manchester win Liverpool</div>
                        <div className={`message-time ${fontSize}`}>15:50</div>
                     </div>
                     {/* <div className={`interface-textsize-bubble interface-textsize-bubble-response ${fontSize}`}>
                        <div className={`interface-textsize-view-text ${fontSize}`}>Manchester win Liverpool</div>
                        <div className="interface-textsize-view-time">15:50</div>
                     </div> */}
                  </div>

                  <div className="interface-textsize-view-item">
                     <div className="interface-textsize-view-label">
                        {i18next.t("My message")}
                     </div>
                     <div className={`outgoing-message ${fontSize}`}>
                        <TailRight className="tail" />
                        <div className={`message-text ${fontSize}`}>Manchester win 2000</div>
                        <div className={`message-time ${fontSize}`}>15:50</div>
                     </div>
                     {/* <div className={`interface-textsize-bubble interface-textsize-bubble-request ${fontSize}`}>
                        <div className={`interface-textsize-view-text ${fontSize}`}>Manchester win 2000</div>
                        <div className="interface-textsize-view-time">15:50</div>
                     </div> */}
                  </div>
               </div>
               {/* } */}
            </div>
         </div>
      </div>
   )
}

export default InterfaceChat;
