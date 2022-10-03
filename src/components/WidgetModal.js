import { IonModal } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import LiveWidget from './LiveWidget.js';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import '../css/modal.css';
import { useSelector } from 'react-redux';

const WidgetModal = (props) => {
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const liveWidgetMatchId = useSelector(state => state.liveWidgetMatchId);
  const matches = useSelector(state => state.matches);
  const [match, setMatch] = useState({});

  useEffect(() => {
    if (liveWidgetMatchId) {
      setMatch(matches.find(el => el.id == liveWidgetMatchId));
    }
  }, [liveWidgetMatchId]);

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={`widget-modal auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          {match?.name && <span>{match.name}</span>}
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="widget-container">
          <LiveWidget close={props.close} />
        </div>
      </div>
    </IonModal>
  );
}

export default WidgetModal;
