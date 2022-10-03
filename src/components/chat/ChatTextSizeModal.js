import React from 'react';
import { IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup } from '@ionic/react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import useUpdateSettings from '../../hooks/useUpdateSettings';

const ChatTextSizeModal = ({ radioList, ...props }) => {
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const fontSize = useSelector(state => state.settings.fontSize);
  const { updateSettings } = useUpdateSettings();

  function changeFont(val) {
    updateSettings({ fontSize: val });
    props.close(false);
  }

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={`tablet-auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>{i18next.t('Font Size')}</span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="modal-content-body padding-none">
          <IonRadioGroup
            value={fontSize}
            onIonChange={e => changeFont(e.detail.value)}
          >
            {radioList.map((el, i) => {
              return (
                <IonItem key={i} className="modal-item">
                  <IonRadio slot="end" value={el.value} mode="ios" />
                  <IonLabel>{i18next.t(el.title)}</IonLabel>
                </IonItem>
              )
            })}
          </IonRadioGroup>
        </div>
      </div>
    </IonModal>
  )
}

export default ChatTextSizeModal;
