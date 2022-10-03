import React from 'react';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import useUpdateSettings from '../../../hooks/useUpdateSettings';

const InterfaceDesignHeader = () => {
  const headerColorful = useSelector(state => state.settings.headerColorful);
  const { updateSettings } = useUpdateSettings();

  function setInputToggle(val) {
    if (val === 'Plain') {
      updateSettings({ headerColorful: false });
    } else {
      updateSettings({ headerColorful: true });
    }
  }

  return (
    <div className="interface-block">
      <div className="interface-block-inner">
        <div className="settings-title-big">
          {i18next.t("Header design")}
        </div>

        <div className="interface-header-segment">
          <IonSegment
            mode={"ios"}
            value={headerColorful ? 'Colorful' : 'Plain'}
            className="top-segment"
            onIonChange={e => setInputToggle(e.detail.value)}
          >
            <IonSegmentButton type={"button"} value="Plain">
              <IonLabel>
                {i18next.t("Plain")}
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="Colorful">
              <IonLabel>
                {i18next.t("Colorful")}
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
      </div>
    </div>
  )
}

export default InterfaceDesignHeader;
