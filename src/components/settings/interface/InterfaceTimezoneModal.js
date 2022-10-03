import React from 'react';
import { IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import i18next from 'i18next';
import { ReactComponent as CloseIcon } from '../../../images/close-icon.svg';
import { changeDateFormat, setParticipants, changeTimeZone, setCompetitionsDict } from '../../../store/actions';
import { convertArrayToObject } from '../../../utils/utils.js';
import useUpdateSettings from '../../../hooks/useUpdateSettings.js';

const List = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const { updateSettings } = useUpdateSettings();

  function changePreset(val) {
    if (props.mode.title === 'Language') {
      setLanguage(val);
    }
    if (props.mode.title === 'Date') {
      setDateFormat(val);
    }
    if (props.mode.title === 'Timezone') {
      setTimezone(val);
    }
    props.close(false);
  }

  function setLanguage(lang) {
    i18next.changeLanguage(lang).then(() => {
      i18next.options.lng = lang;
      updateSettings({ language: lang });

      API.getListCompetitions(token, lang).then(res => {
        const list = res.data.data.list;
        dispatch(setCompetitionsDict(convertArrayToObject(list, 'id')));
      });
      API.getListParticipants(token, lang).then(res => {
        const list = res.data.data.list;
        dispatch(setParticipants(convertArrayToObject(list, 'id')));
      })
    })
  }

  function setDateFormat(value) {
    updateSettings({ dateFormat: value });
  }

  function setTimezone(value) {
    updateSettings({ timeZone: value });
  }

  return (
    <IonRadioGroup 
      value={props.value} 
      onIonChange={e => changePreset(e.detail.value)}
    >
      {props.mode.data.map((el, i) => {
        return (
          <IonItem key={i} className="modal-item">
            {el.pic && 
              <div className="modal-item-icon">
                <img src={el.pic} alt="icon" />
              </div>
            }
            <IonRadio slot="end" value={el.value} mode="ios" />
            <IonLabel>{i18next.t(el.label)}</IonLabel>
          </IonItem>
        )
      })}
    </IonRadioGroup>
  )
}

const InterfaceTimezoneModal = (props) => {
  const language = useSelector(state => state.settings.language);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const themeAccent = useSelector(state => state.settings.theme.accent);

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={`${props.mode.title !== 'Timezone' ? 'auto-height tablet-auto-height' : ''} ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>{i18next.t(props.mode.title)}</span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="modal-content-body padding-none">
          {props.mode && props.mode.title === 'Language' && 
            <List 
              value={language}
              mode={props.mode}
              close={props.close}
            />
          }

          {props.mode && props.mode.title === 'Date' && 
            <List 
              value={dateFormat}
              mode={props.mode}
              close={props.close}
            />
          }

          {props.mode && props.mode.title === 'Timezone' && 
            <List 
              value={timeZone}
              mode={props.mode}
              close={props.close}
            />
          }
        </div>
      </div>
    </IonModal>
  )
}

export default InterfaceTimezoneModal;
