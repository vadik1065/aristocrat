import React from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import * as API from '../api/functions.js';
import { getCurrency } from '../utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import { getUserInfo, toggleErrorToast, toggleErrorToastText, toggleLoader, toggleToast, toggleToastText } from '../store/actions/index.js';
import i18next from 'i18next';


const CancelBetModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const currency_id = useSelector(state => state.user.currency);
  const themeAccent = useSelector(state => state.settings.theme.accent);

  function handleCancelBet(id) {
    dispatch(toggleLoader(true));
    API.cancelBet(token, id)
      .then(() => {
        dispatch(toggleLoader(false));
        props.close(false);
        API.getBets(token, { type: 'open' })
          .then((result) => {
            props.setListOfBets(result);
            props.setTotalBets(result);
          })
          .catch((err) => {
            console.log(err.response);
          });
        API.getInfo(token).then(res => dispatch(getUserInfo(res)));
        dispatch(toggleToastText('Operation has been submitted.'));
        dispatch(toggleToast(true));
      })
      .catch((err) => {
        dispatch(toggleLoader(false));
        console.log(err.response.data.error);
        dispatch(toggleErrorToastText(err.response.data.error))
        dispatch(toggleErrorToast(true));
      });
  }



  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={`auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>
            {i18next.t("Cancel bet")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item">
          <div className="input-container flex">
            <span>
              {i18next.t("Refund amount")}: {props.bets.refund_sum}{getCurrency(currency_id)}
            </span>
            <div
              onClick={() => handleCancelBet(props.bets.id)}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Confirm cancellation")}
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default CancelBetModal;
