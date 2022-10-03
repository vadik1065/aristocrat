import React, { useState } from 'react';
import { IonIcon, IonLabel, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import comma from '../../../images/settings-icons/comma.svg';
import dot from '../../../images/settings-icons/dot.svg';
import i18next from 'i18next';
import useUpdateSettings from '../../../hooks/useUpdateSettings';

const DealingView = () => {
  const options = { cssClass: 'custom-select' };
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const dealingView = useSelector(state => state.settings.dealingView);
  const isComma = useSelector(state => state.settings.isComma);
  const { updateSettings } = useUpdateSettings();
  const [oddsChangesChecked, setOddsChangesChecked] = useState(false);

  function setInterfaceView(interfaceView) {
    updateSettings({ interfaceView });
  }

  function setSeparator(isComma) {
    updateSettings({ isComma });
  }

  function setDealingView(dealingView) {
    updateSettings({ dealingView });
  }

  return (
    <div className="dealing-settings-view-options">
      <div>
        <p className='settings-card-title'>
          {i18next.t("Select dealing view")}
        </p>
        <IonSelect
          mode={'md'}
          className='settings-card-toggle'
          value={dealingView}
          onIonChange={e => setDealingView(e.detail.value)}
          interfaceOptions={options}
          interface={'popover'}
        >
          <IonSelectOption value="cis">{i18next.t("CIS View")}</IonSelectOption>
          <IonSelectOption value="classic">{i18next.t("Classic View")}</IonSelectOption>
          <IonSelectOption value="asian">{i18next.t("Asian View")}</IonSelectOption>
        </IonSelect>
      </div>

      <div>
        <p className='settings-card-title'>
          {i18next.t("Odds format")}
        </p>
        <IonSelect
          mode={'md'}
          className='settings-card-toggle'
          value={interfaceView}
          onIonChange={e => setInterfaceView(e.detail.value)}
          interfaceOptions={options}
          interface={'popover'}
        >
          <IonSelectOption value="Price">{i18next.t("European")}</IonSelectOption>
          <IonSelectOption value="price_american">{i18next.t("American")}</IonSelectOption>
          <IonSelectOption value="price_british">{i18next.t("British")}</IonSelectOption>
          <IonSelectOption value="price_hongkong">{i18next.t("Hong Kong")}</IonSelectOption>
          <IonSelectOption value="price_indonesian">{i18next.t("Indonesian")}</IonSelectOption>
          <IonSelectOption value="price_malay">{i18next.t("Malay")}</IonSelectOption>
        </IonSelect>
      </div>

      <div>
        <p className='settings-card-title'>
          {i18next.t("Separator")}
        </p>
        <IonSegment
          mode={"ios"}
          value={isComma}
          className="setting-page-segment"
          onIonChange={e => setSeparator(e.detail.value)}
          interfaceOptions={options}
          interface={'popover'}
        >
          <IonSegmentButton type={"button"} value={true} layout="icon-start">
            <IonLabel>{i18next.t("Comma")}</IonLabel>
            <IonIcon icon={comma} />
          </IonSegmentButton>
          <IonSegmentButton type={"button"} value={false} layout="icon-start">
            <IonLabel>{i18next.t("Dot")}</IonLabel>
            <IonIcon icon={dot} />
          </IonSegmentButton>
        </IonSegment>
      </div>

      {/* <div className="notification-dealing-item">
        <div>
          {i18next.t("Highlight Odds changes")}
        </div>
        <IonToggle
          className='toggle-card orange-toggle'
          checked={oddsChangesChecked}
          onIonChange={(e) => setOddsChangesChecked(e.detail.checked)}
        />
      </div> */}
    </div>
  )
}

export default DealingView;
