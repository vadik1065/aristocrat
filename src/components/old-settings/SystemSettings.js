import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAccent, changeSendButton, changeFontSize, changeInterfaceView, changeLanguage, setParticipants, setCompetitionsDict } from '../../store/actions/index.js';
import {
  IonSegment,
  IonSelect,
  IonSelectOption,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import * as API from '../../api/functions.js';
import { ReactComponent as Toggler } from '../../images/arrow.svg';
import { convertArrayToObject } from '../../utils/utils.js';

const SystemSettings = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const options = { cssClass: 'custom-select' };
  // General
  const [timezone, setTimezone] = useState('auto');
  const [timeformat, setTimeformat] = useState('HH:MM');
  const [dateformat, setDateformat] = useState('DD.MM.YY');
  const language = useSelector(state => state.settings.language);
  const [autoLogout, setAutoLogout] = useState('off');
  // Interface
  const [contrast, setContrast] = useState('low');
  const accent = useSelector(state => state.settings.accent);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const [clickOnOutcome, setClickOnOutcome] = useState('Adds outcome to the Bet');
  const [eventsInitial, setEventsInitial] = useState('Minimized Leagues');
  // Chat Settings
  const textSize = useSelector(state => state.settings.fontSize);
  // const [sendButton, setSendButton] = useState('redux-accent-orange');
  const sendButton = useSelector(state => state.settings.sendButton);
  // Bet Settings
  const [betSaving, setBetSaving] = useState('Save last bet');
  const [textBetsPresets, setTextBetsPresets] = useState('Use 0 as default stake');
  // Outcome view
  const [handicapFormatSegmentValue, setHandicapFormatSegmentValue] = useState('Dropdown');
  const [handicapFromScoreSegmentValue, setHandicapFromScoreSegmentValue] = useState('Zero Score');
  const [zeroHandicapFormat, setZeroHandicapFormat] = useState('Plus Zero');
  const [chartButtonView, setChartButtonView] = useState('Show chart button');
  const [handicapAndTotals, setHandicapAndTotals] = useState('Dropdown');
  const [oddsFormat, setOddsFormat] = useState('Decimal');
  const [decimalSeparator, setDecimalSeparator] = useState('Dot');
  const [chartsView, setChartsView] = useState('Do not open Chart in the Bet');
  
  function setAccent(color) {
    // dispatch(changeAccent(color));
  }

  function setInterfaceView(val) {
    // localStorage.setItem("interfaceView" , val);
    // dispatch(changeInterfaceView(val));
  }

  function setLanguage(lang) {
    // localStorage.setItem("language" , lang);
    // dispatch(changeLanguage(lang));

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
    <div className="settings-cards-list">

      {/* General */}
      <div className='settings-card open'>
        <div
          className="settings-card-toggler flex"
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
        >
          <div className="settings-card-name">General</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Timezone</p>
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

          <p className='settings-card-title'>Time format</p>
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

          <p className='settings-card-title'>Date format</p>
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

          <p className='settings-card-title'>Language</p>
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

          <p className='settings-card-title'>Auto Logout</p>
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

      {/* Interface */}
      <div className='settings-card open'>
        <div
          className="settings-card-toggler flex"
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
        >
          <div className="settings-card-name">Interface</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Contrast</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={contrast}
            onIonChange={e => setContrast(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="low">Low contrast colors</IonSelectOption>
            <IonSelectOption value="low">High contrast colors</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Accent color</p>
          <IonSelect
            mode={'md'}
            className={'settings-card-toggle accent-color ' + (accent)}
            value={accent}
            onIonChange={e => { setAccent(e.detail.value) }}
            interface={'popover'}
          >
            <IonSelectOption className="settings-card-toggle-option orange" value="redux-accent-orange">Dark Orange</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option purple" value="redux-accent-purple">Purple</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option green" value="redux-accent-green">Green</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option red" value="redux-accent-red">Red</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option magenta" value="redux-accent-magenta">Magenta</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option light-blue" value="redux-accent-light-blue">Light Blue</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option gold" value="redux-accent-gold">Gold</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option violet" value="redux-accent-violet">Violet</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Interface view</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={interfaceView}
            onIonChange={e => setInterfaceView(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Price">European</IonSelectOption>
            <IonSelectOption value="price_american">American</IonSelectOption>
            <IonSelectOption value="price_british">British</IonSelectOption>
            <IonSelectOption value="price_hongkong">Hong Kong</IonSelectOption>
            <IonSelectOption value="price_indonesian">Indonesian</IonSelectOption>
            <IonSelectOption value="price_malay">Malay</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Click on outcome</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={clickOnOutcome}
            onIonChange={e => setClickOnOutcome(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Adds outcome to the Bet">Adds outcome to the Bet</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Events screen initial state</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={eventsInitial}
            onIonChange={e => setEventsInitial(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Minimized Leagues">Minimized Leagues</IonSelectOption>
          </IonSelect>
        </div>
      </div>

      {/* Chat Settings */}
      <div className='settings-card open'>
        <div
          className="settings-card-toggler flex"
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
        >
          <div className="settings-card-name">Chat Settings</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Text Size</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={textSize}
            onIonChange={e => dispatch(changeFontSize(e.detail.value))}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="small">S (Small)</IonSelectOption>
            <IonSelectOption value="default">M (Standart)</IonSelectOption>
            <IonSelectOption value="large">L (Large)</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Send Button</p>
          <IonSelect
            mode={'md'}
            className={'settings-card-toggle settings-send-button ' + (sendButton)}
            value={sendButton}
            onIonChange={e => dispatch(changeSendButton(e.detail.value))}
            interface={'popover'}
          >
            <IonSelectOption className="settings-card-toggle-option orange" value="redux-button-orange">Dark Orange</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option purple" value="redux-button-purple">Purple</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option green" value="redux-button-green">Green</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option red" value="redux-button-red">Red</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option magenta" value="redux-button-magenta">Magenta</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option light-blue" value="redux-button-light-blue">Light Blue</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option gold" value="redux-button-gold">Gold</IonSelectOption>
            <IonSelectOption className="settings-card-toggle-option violet" value="redux-button-violet">Violet</IonSelectOption>
          </IonSelect>
        </div>
      </div>

      {/* Bet Settings */}
      <div className='settings-card open'>
        <div
          className="settings-card-toggler flex"
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
        >
          <div className="settings-card-name">Bet Settings</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Bet saving</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={betSaving}
            onIonChange={e => setBetSaving(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Save last bet">Save last bet</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Text Bets Presets</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={textBetsPresets}
            onIonChange={e => setTextBetsPresets(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Use 0 as default stake">Use 0 as default stake</IonSelectOption>
          </IonSelect>
        </div>
      </div>

      {/* Outcome view First */}
      <div className='settings-card open'>
        <div
          className="settings-card-toggler flex"
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
        >
          <div className="settings-card-name">Outcome view</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Handicap and Totals</p>
          <IonSegment
            mode={"ios"}
            value={handicapAndTotals}
            className={"top-segment setting-segment " + (accent)}
            onIonChange={e => setHandicapAndTotals(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSegmentButton type={"button"} value="Dropdown">
              <IonLabel>Dropdown</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="Slider">
              <IonLabel>Slider</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <p className='settings-card-title'>Handicap from Score</p>
          <IonSegment
            mode={"ios"}
            value={handicapFromScoreSegmentValue}
            className={"top-segment setting-segment " + (accent)}
            onIonChange={e => setHandicapFromScoreSegmentValue(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSegmentButton type={"button"} value="Zero Score">
              <IonLabel>Zero Score</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="Live Score">
              <IonLabel>Live Score</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <p className='settings-card-title'>Zero Handicap Format</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={zeroHandicapFormat}
            onIonChange={e => setZeroHandicapFormat(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Plus Zero">Plus Zero</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Charts</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={chartButtonView}
            onIonChange={e => setChartButtonView(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Show chart button">Show chart button</IonSelectOption>
            <IonSelectOption value="Do not show chart button">Do not show chart button</IonSelectOption>
          </IonSelect>
        </div>
      </div>

      {/* Outcome view Second*/}
      <div className='settings-card open'>
        <div
          onClick={(e) => e.currentTarget.parentElement.classList.toggle('open')}
          className="settings-card-toggler flex"
        >
          <div className="settings-card-name">Outcome view</div>
          <Toggler className="toggler" />
        </div>
        <div className='settings-card-hideable'>
          <p className='settings-card-title'>Handicap Format</p>
          <IonSegment
            mode={"ios"}
            value={handicapFormatSegmentValue}
            className={"top-segment setting-segment " + (accent)}
            onIonChange={e => setHandicapFormatSegmentValue(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSegmentButton type={"button"} value="Dropdown">
              <IonLabel>No Brackets</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="Slider">
              <IonLabel>With Brackets</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <p className='settings-card-title'>Odds Format</p>
          <IonSegment
            mode={"ios"}
            value={oddsFormat}
            className={"top-segment setting-segment " + (accent)}
            onIonChange={e => setOddsFormat(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSegmentButton type={"button"} value="Decimal">
              <IonLabel>Decimal</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="American">
              <IonLabel>American</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <p className='settings-card-title'>Decimal Separator</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={decimalSeparator}
            onIonChange={e => setDecimalSeparator(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Dot">Dot</IonSelectOption>
          </IonSelect>

          <p className='settings-card-title'>Charts View</p>
          <IonSelect
            mode={'md'}
            className='settings-card-toggle'
            value={chartsView}
            onIonChange={e => setChartsView(e.detail.value)}
            interfaceOptions={options}
            interface={'popover'}
          >
            <IonSelectOption value="Open Chart in the Bet">Open Chart in the Bet</IonSelectOption>
            <IonSelectOption value="Do not open Chart in the Bet">Do not open Chart in the Bet</IonSelectOption>
          </IonSelect>
        </div>
      </div>

    </div>
  )
}

export default SystemSettings;
