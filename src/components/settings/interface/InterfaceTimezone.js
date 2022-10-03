import React, { useState } from 'react';
import InterfaceTimezoneModal from './InterfaceTimezoneModal';
import i18next from 'i18next';
import moment from 'moment';
import dateIcon from '../../../images/settings-icons/clarity-date.png';
import timeIcon from '../../../images/settings-icons/clarity-time.png';
import langIcon from '../../../images/settings-icons/clarity-lang.png';
import langUS from '../../../images/settings-icons/flag-us.png';
import langRU from '../../../images/settings-icons/flag-ru.png';
import { useSelector } from 'react-redux';

const modes = {
   language: {
      title: 'Language',
      data: [
         { label: 'English (American)', value: 'EN', pic: langUS },
         { label: 'Русский', value: 'RU', pic: langRU }
      ]
   },
   dateFormat: {
      title: 'Date',
      data: [
         { label: 'MMM D  (JUN 29)', value: 'MMM D' },
         { label: 'DD.MM.YY  (29.06.21)', value: 'DD.MM.YY' },
         { label: 'DD/MM/YY  (29/06/21)', value: 'DD/MM/YY' },
         { label: 'MM/DD/YY  (06/29/21)', value: 'MM/DD/YY' },
      ]
   },
   timezone: {
      title: 'Timezone',
      data: [
         { label: 'Set automatically', value: 'auto' },
         { label: 'UTC+12', value: '+12' },
         { label: 'UTC+11', value: '+11' },
         { label: 'UTC+10', value: '+10' },
         { label: 'UTC+9', value: '+9' },
         { label: 'UTC+8', value: '+8' },
         { label: 'UTC+7', value: '+7' },
         { label: 'UTC+6', value: '+6' },
         { label: 'UTC+5', value: '+5' },
         { label: 'UTC+4', value: '+4' },
         { label: 'UTC+3', value: '+3' },
         { label: 'UTC+2', value: '+2' },
         { label: 'UTC+1', value: '+1' },
         { label: 'UTC-0', value: '0' },
         { label: 'UTC-1', value: '-1' },
         { label: 'UTC-2', value: '-2' },
         { label: 'UTC-3', value: '-3' },
         { label: 'UTC-4', value: '-4' },
         { label: 'UTC-5', value: '-5' },
         { label: 'UTC-6', value: '-6' },
         { label: 'UTC-7', value: '-7' },
         { label: 'UTC-8', value: '-8' },
         { label: 'UTC-9', value: '-9' },
         { label: 'UTC-10', value: '-10' },
         { label: 'UTC-11', value: '-11' },
      ]
   }
}

const InterfaceTimezone = () => {
   const language = useSelector(state => state.settings.language);
   const dateFormat = useSelector(state => state.settings.dateFormat);
   const timeZone = useSelector(state => state.settings.timeZone);
   const [showModal, setShowModal] = useState(false);
   const [mode, setMode] = useState('');

   function handleMode(mode) {
      setMode(mode);
      setShowModal(true);
   }

   function getLangTitle(language) {
      const obj = modes.language.data.find(el => el.value === language);
      return obj;
   }

   function getTimeZoneTitle(zone) {
      let title = modes.timezone.data.find(el => el.value === zone).label;
      if (title === 'Set automatically') {
         let temp = moment().format('Z').split(':');
         temp = `UTC${temp[0]}`;
         title = temp;
      }
      return title;
   }

   return (
      <div className="interface-block">
         <div className="interface-block-inner">
            <div className="settings-title-big">
               {i18next.t("Date & time view, Language")}
            </div>
            <div className="interface-timezone-list">
               <div className="interface-timezone-item" onClick={() => handleMode(modes.dateFormat)}>
                  <div className="interface-timezone-icon-wrapper">
                     <img src={dateIcon} className="interface-timezone-icon" alt="icon" />
                  </div>
                  <div className="interface-timezone-label">{i18next.t(dateFormat)} {i18next.t('format')}</div>
               </div>
               <div className="interface-timezone-item" onClick={() => handleMode(modes.timezone)}>
                  <div className="interface-timezone-icon-wrapper">
                     <img src={timeIcon} className="interface-timezone-icon" alt="icon" />
                  </div>
                  <div className="interface-timezone-label">
                     {getTimeZoneTitle(timeZone)}
                     {/* GMT+3 (16:00) */}
                  </div>
               </div>
               <div className="interface-timezone-item" onClick={() => handleMode(modes.language)}>
                  <div className="interface-timezone-icon-wrapper">
                     {/* <img src={getLangTitle(language).pic} alt="icon" className="interface-timezone-icon" /> */}
                     <img src={langIcon} className="interface-timezone-icon" alt="icon" />
                  </div>
                  <div className="interface-timezone-label">{getLangTitle(language).label}</div>
               </div>
            </div>
         </div>
         <InterfaceTimezoneModal
            open={showModal}
            close={setShowModal}
            mode={mode}
         />
      </div>
   )
}

export default InterfaceTimezone;
