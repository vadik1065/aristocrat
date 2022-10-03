import React, { useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { IonBackButton, IonSelect, IonSelectOption } from '@ionic/react';
import { setCompetitionsDict, setParticipants } from '../../store/actions/index.js';
import { convertArrayToObject } from '../../utils/utils.js';
import * as API from '../../api/functions.js';
import i18next from 'i18next';
import useUpdateSettings from '../../hooks/useUpdateSettings';


const General = (props) => {
   const dispatch = useDispatch();
   const token = useSelector(state => state.token);
   const width = useSelector(state => state.width);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("General");
   const [open, setOpen] = useState(true);
   const options = { cssClass: 'custom-select' };
   const [timezone, setTimezone] = useState('auto');
   const [timeformat, setTimeformat] = useState('HH:MM');
   const [dateformat, setDateformat] = useState('DD.MM.YY');
   const language = useSelector(state => state.settings.language);
   const { updateSettings } = useUpdateSettings();
   const [autoLogout, setAutoLogout] = useState('off');


   function setLanguage(lang) {
      updateSettings({ language: lang });

      API.getListCompetitions(token, lang).then(res => {
         const list = res.data.data.list;
         dispatch(setCompetitionsDict(convertArrayToObject(list, 'id')));
      });
      API.getListParticipants(token, lang).then(res => {
         const list = res.data.data.list;
         dispatch(setParticipants(convertArrayToObject(list, 'id')));
      })
   }


   return (
      <div className="rectangular-area-wrapper set-small">
         <div className={(open === true ? "open " : "close ") + "rectangular-area"}>
            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, general: false })} />
               </div>
            }

            {isMobile &&
               <div className='back-container'>
                  <IonBackButton defaultHref="/settings" text={i18next.t("Back")} />
               </div>
            }

            {isTablet &&
               <div
                  className="dashboard-head-tablet"
                  onClick={() => setOpen(!open)}
               >
                  <span>{title}</span>
                  <ArrowIcon className="fold-icon" />
               </div>
            }

            {isMobile &&
               <div className="dashboard-head-mobile">{title}</div>
            }

            <div className="dashboard-body">
               <div className='dashboard-body-inner settings-general'>
                  <div>
                     <p className='settings-card-title'>
                        {i18next.t("Timezone")}
                     </p>
                     <IonSelect
                        mode={'md'}
                        className='settings-card-toggle'
                        value={timezone}
                        onIonChange={e => setTimezone(e.detail.value)}
                        interfaceOptions={options}
                        interface={'popover'}
                     >
                        <IonSelectOption value="auto">Set automatically</IonSelectOption>
                        <IonSelectOption value="UTC−12">UTC−12</IonSelectOption>
                        <IonSelectOption value="UTC−11">UTC−11</IonSelectOption>
                        <IonSelectOption value="UTC−10">UTC−10</IonSelectOption>
                        <IonSelectOption value="UTC−9:30">UTC−9:30</IonSelectOption>
                        <IonSelectOption value="UTC−9">UTC−9</IonSelectOption>
                     </IonSelect>
                  </div>

                  <div>
                     <p className='settings-card-title'>
                        {i18next.t("Time format")}
                     </p>
                     <IonSelect
                        mode={'md'}
                        className='settings-card-toggle'
                        value={timeformat} onIonChange={e => setTimeformat(e.detail.value)}
                        interfaceOptions={options}
                        interface={'popover'}
                     >
                        <IonSelectOption value="HH:MM">HH:MM</IonSelectOption>
                        <IonSelectOption value="HH:MM:SS">HH:MM:SS</IonSelectOption>
                     </IonSelect>
                  </div>

                  <div>
                     <p className='settings-card-title'>
                        {i18next.t("Date format")}
                     </p>
                     <IonSelect
                        mode={'md'}
                        className='settings-card-toggle'
                        value={dateformat}
                        onIonChange={e => setDateformat(e.detail.value)}
                        interfaceOptions={options}
                        interface={'popover'}
                     >
                        <IonSelectOption value="DD.MM.YY">DD.MM.YY</IonSelectOption>
                        <IonSelectOption value="DD.MM">DD.MM</IonSelectOption>
                     </IonSelect>
                  </div>

                  <div>
                     <p className='settings-card-title'>
                        {i18next.t("Language")}
                     </p>
                     <IonSelect
                        mode={'md'}
                        className='settings-card-toggle'
                        value={language}
                        onIonChange={e => setLanguage(e.detail.value)}
                        interfaceOptions={options}
                        interface={'popover'}
                     >
                        <IonSelectOption value="EN">English</IonSelectOption>
                        <IonSelectOption value="RU">Русский</IonSelectOption>
                     </IonSelect>
                  </div>

                  <div>
                     <p className='settings-card-title'>
                        {i18next.t("Auto Logout")}
                     </p>
                     <IonSelect
                        mode={'md'}
                        className='settings-card-toggle'
                        value={autoLogout}
                        onIonChange={e => setAutoLogout(e.detail.value)}
                        interfaceOptions={options}
                        interface={'popover'}
                     >
                        <IonSelectOption value="off">Off</IonSelectOption>
                        <IonSelectOption value="on">On</IonSelectOption>
                     </IonSelect>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default General;
