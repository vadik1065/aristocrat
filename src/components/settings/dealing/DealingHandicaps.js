import React, { useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import useUpdateSettings from '../../../hooks/useUpdateSettings';

const DealingHandicaps = () => {
  const options = { cssClass: 'custom-select' };
  const displayHandicap = useSelector(state => state.settings.displayHandicap);
  const displayZeroHandicap = useSelector(state => state.settings.displayZeroHandicap);
  const [handicapFromScore, setHandicapFromScore] = useState('Zero score');
  const { updateSettings } = useUpdateSettings();

  return (
    <div className="dealing-settings-handicap">
      <div className="settings-title-big">
        {i18next.t("Handicaps & totals view")}
      </div>
      <div className="dealing-handicap-container">
        <div className="settings-title-small">
          {i18next.t("Display handicap as")}
        </div>
        <div className="dealing-handicap-list">
          <div
            className={`dealing-handicap-item ${(displayHandicap === 'plain' ? 'activated' : '')}`}
            onClick={() => updateSettings({ displayHandicap: 'plain' })}
          >
            <div className="dealing-handicap-item-label">
              {i18next.t("Plain")}
            </div>
            <div className="dealing-handicap-item-value">H1 +1.5</div>
          </div>
          <div
            className={`dealing-handicap-item ${(displayHandicap === 'brackets' ? 'activated' : '')}`}
            onClick={() => updateSettings({ displayHandicap: 'brackets' })}
          >
            <div className="dealing-handicap-item-label">
              {i18next.t("Brackets")}
            </div>
            <div className="dealing-handicap-item-value">H1 (+1.5)</div>
          </div>
        </div>
      </div>

      <div className="dealing-handicap-container dealing-handicap-score-container">
        <div className='settings-title-small'>
          {i18next.t("Display zero handicap as")}
        </div>
        <IonSelect
          mode={'md'}
          className='settings-card-toggle settings-card-toggle-dark'
          value={displayZeroHandicap}
          onIonChange={e => updateSettings({displayZeroHandicap: e.detail.value })}
          interfaceOptions={options}
          interface={'popover'}
        >
          <IonSelectOption value="decimal">{i18next.t("Decimal")} H1 0.0</IonSelectOption>
          <IonSelectOption value="plain-zero">{i18next.t("Plain Zero")} H1 0</IonSelectOption>
          <IonSelectOption value="plus-zero">{i18next.t("Plus Zero")} H1 +0</IonSelectOption>
          <IonSelectOption value="zero-in-brackets">{i18next.t("Zero in Brackets")} H1 (0)</IonSelectOption>
        </IonSelect>
      </div>

      {/* <div className="dealing-handicap-container dealing-handicap-score-container">
        <div className="settings-title-small">
          {i18next.t("Handicap from score")}
        </div>
        <div className="dealing-handicap-list">
          <div
            className={`dealing-handicap-item ${(handicapFromScore === 'Zero score' ? 'activated' : '')}`}
            onClick={() => setHandicapFromScore('Zero score')}
          >
            <div className="dealing-handicap-item-label" >
              {i18next.t("Zero score")}
            </div>
            <div className="dealing-handicap-item-value dealing-handicap-value-zero">0:0</div>
          </div>
          <div
            className={`dealing-handicap-item ${(handicapFromScore === 'Live score' ? 'activated' : '')}`}
            onClick={() => setHandicapFromScore('Live score')}
          >
            <div className="dealing-handicap-item-label">
              {i18next.t("Live score")}
            </div>
            <div className="dealing-handicap-item-value dealing-handicap-value-live">2:0</div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default DealingHandicaps;
