import { IonModal, IonRippleEffect, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import { getUserInfo, toggleToast, toggleToastText } from '../store/actions';
import { getCurrencyString } from '../utils/utils';
import * as API from '../api/functions.js';
import i18next from 'i18next';


const ChangeCurrencyModal = (props) => {
  const user = useSelector(
    ({ user }) => ({
      currency: user.currency,
    })
  );
  const currenciesList = useSelector(state => state.currenciesList);
  const token = useSelector(state => state.token);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState('');
  const options = { cssClass: 'custom-select' };
  useEffect(() => {
    setCurrency(user.currency)
  }, [user]);
  function closeAll() {
    props.close(false);
  }
  function changeCurrency() {
    let obj = {
      currency_id: currency
    };
    API.updateProfile(token, obj).then(() => {
      closeAll();
      dispatch(toggleToastText('You preferred currency was updated.'));
      dispatch(toggleToast(true));
      API.getInfo(token).then(response => {
        dispatch(getUserInfo(response));
      })
    })
  }



  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => closeAll()}
      cssClass={`auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>
            {i18next.t("Currency changing")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item">
          <div className="input-container flex select currency-changing">
            <span>
              {i18next.t("Pick a currency")}
            </span>
            <IonSelect
              value={user.currency}
              onIonChange={e => setCurrency({ currency: e.detail.value })}
              interfaceOptions={options}
              interface={'popover'}
              mode={'md'}
            >
              {
                currenciesList.map(el => {
                  return (
                    <IonSelectOption key={el.id} value={el.id}>{getCurrencyString(el.id)}</IonSelectOption>
                  )
                })
              }
            </IonSelect>
          </div>
          <p className="balance-content">
            {i18next.t("The commission for currency changing is 3%.")}
          </p>
          <div onClick={() => changeCurrency()} className="take-loan ion-activatable deposit">
            <IonRippleEffect />
            {i18next.t("Change currency")}
          </div>
        </div>
      </div>
    </IonModal>
  );
}

export default ChangeCurrencyModal;