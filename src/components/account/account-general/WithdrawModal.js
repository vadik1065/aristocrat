import { IonInput, IonItem, IonModal, IonRippleEffect, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../css/modal.css';
import { ReactComponent as CloseIcon } from '../../../images/close-icon.svg';
import i18next from "i18next";
import axios from 'axios';
import url from '../../../axios.js';
import { getUserInfo, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from "../../../store/actions";
import * as API from '../../../api/functions.js';
import { getCurrencyString } from '../../../utils/utils';
import useIonInput from '../../../hooks/useIonInput';

const WithdrawModal = (props) => {
  const dispatch = useDispatch();
  const [currencyWithdraw, setCurrencyWithdraw] = useState('');
  const options = { cssClass: 'custom-select' }
  const token = useSelector(state => state.token);
  const currency = useSelector(state => state.user.currency);
  const listPaymentSystem = useSelector(state => state.paymentSystems);
  const listNonCryptoPaymentSystem = useSelector(state => state.nonCryptoPaymentSystems);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const amountWithdraw = useIonInput('');
  const withdrawAddress = useIonInput('');
  const info = useIonInput('');
  const address = useIonInput('');
  const requisites = useIonInput('');
  const [loading, setLoading] = useState(false);

  function closeAll() {
    props.close(false);
    setCurrencyWithdraw('');
    amountWithdraw.setReset();
    withdrawAddress.setReset();
    info.setReset();
    address.setReset();
    requisites.setReset();
  }

  function withdrawMoneyCrypto() {
    // вывод крипты
    if (listPaymentSystem.some(e => e.payment_system_id === currencyWithdraw)) {
      axios({
        method: 'post',
        url: url + "/api/request-out-crypto",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          payment_system_id: currencyWithdraw,
          currency_entity: getCurrencyString(currency),
          summa_out: amountWithdraw.value,
          address_out: withdrawAddress.value,
          iscrypto: 1
        }
      })
        .then(res => {
          if (!res.data.error) {
            dispatch(toggleToastText('Your request has been sent.'))
            dispatch(toggleToast(true));
            API.getInfo(token).then(res => dispatch(getUserInfo(res)));
            closeAll();
          }
          else {
            dispatch(toggleErrorToastText('Your amount is less than 20 EUR.')) // поправить
            dispatch(toggleErrorToast(true));
          }
        })
        .catch(error => {
          if (error.response.data.status === 422) {
            dispatch(toggleErrorToastText(error.response.data.error));
            dispatch(toggleErrorToast(true));
          }
        })
    }
  }

  function submitInfo(direction, directionId, type, summa, currency_entity, details) {
    const data = {
      direction,
      directionId,
      type,
      summa,
      currency_entity,
      details
    }

    API.setPaymentsDetails(token, data).then(res => {
      console.log(res.data);
      dispatch(toggleToastText('Your information has been sent.'));
      dispatch(toggleToast(true));
      closeAll();
    }).catch(err => {
      console.log(err.response.data.error);
      dispatch(toggleErrorToastText(err.response.data.error.join('\n')));
      dispatch(toggleErrorToast(true));
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
            {i18next.t("Withdraw money")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item">
          <div className="balance-fields-container-top flex">
            <div className="input-container flex select">
              <span>
                {i18next.t("Currency")}
              </span>
              <IonSelect
                interfaceOptions={options}
                value={currencyWithdraw}
                onIonChange={(e) => setCurrencyWithdraw(e.detail.value)}
                placeholder={i18next.t("Set")}
                interface={'popover'}
                mode={'md'}
              >
                {listPaymentSystem &&
                  listPaymentSystem.map((el, i) => {
                    return <IonSelectOption key={i} value={el.payment_system_id}>{el.name}</IonSelectOption>
                  })
                }

                {/* {listNonCryptoPaymentSystem.some(el => el.type === 'Cash') &&
                  <IonSelectOption value='Cash'>
                    {i18next.t("Cash")}
                  </IonSelectOption>
                }
                {listNonCryptoPaymentSystem.some(el => el.type === 'Cashless') &&
                  <IonSelectOption value='Cashless'>
                    {i18next.t("Bank transfer")}
                  </IonSelectOption>
                } */}
              </IonSelect>
            </div>

            {!loading && currencyWithdraw && 
              <div className="input-container flex comission">
                <span>Comission</span>
                <div className="body-field">
                  <span>0%</span>
                </div>
              </div>
            }
          </div>

          {listPaymentSystem.some(e => e.payment_system_id === currencyWithdraw) &&
            <>
              <div className="input-container flex select">
                <span>
                  {i18next.t("Value")}
                </span>
                <IonItem lines="none" >
                  <IonInput
                    {...amountWithdraw}
                    placeholder={i18next.t("Value")} 
                    type="number"
                    inputmode="numeric"
                  />
                </IonItem>
              </div>
              <div className="input-container flex">
                <span>
                  {i18next.t("Wallet address")}
                </span>
                <IonItem lines="none" >
                  <IonInput
                    {...withdrawAddress}
                    placeholder={i18next.t("Wallet address")} />
                </IonItem>
              </div>
            </>
          }

          {withdrawAddress.value && amountWithdraw.value &&
            <div onClick={() => withdrawMoneyCrypto()} className="take-loan ion-activatable deposit">
              <IonRippleEffect />
              {i18next.t("Withdraw Money")}
            </div>
          }

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyWithdraw) &&
            <div className="input-container flex w100">
              <span>
                {i18next.t("Information")}
              </span>
              <IonTextarea
                className="text-area"
                placeholder={i18next.t("Enter more information here...")}
                {...info}
              >
              </IonTextarea>
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyWithdraw && e.type === 'Cash') &&
            <div className="input-container flex select">
              <span>
                {i18next.t("Addresses")}
              </span>
              <IonSelect
                interfaceOptions={options}
                {...address}
                placeholder={i18next.t("Set address")}
                interface={'popover'}
                mode={'md'}
              >
                {listNonCryptoPaymentSystem.map((el, i) => el.type === 'Cash' &&
                  <IonSelectOption key={i} value={el.id}>{el.name}</IonSelectOption>
                )}
              </IonSelect>
              {listNonCryptoPaymentSystem.map((el, i) => el.id === address.value &&
                <div key={i} className="adresses-container">
                  <p className='balance-content'><span className='green'>{i18next.t("Details")}:</span> {el.details}</p>
                  <p className='balance-content'><span className='green'>{i18next.t("Contact")}:</span> {el.contact}</p>
                </div>
              )}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyWithdraw && e.type === 'Cashless') &&
            <div className="input-container flex select">
              <span>
                {i18next.t("Requisites")}
              </span>
              <IonSelect
                interfaceOptions={options}
                {...requisites}
                placeholder={i18next.t("Set requisites")}
                interface={'popover'}
                mode={'md'}
              >
                {listNonCryptoPaymentSystem.map((el, i) => el.type === 'Cashless' &&
                  <IonSelectOption key={i} value={el.id}>{el.name}</IonSelectOption>
                )}
              </IonSelect>
              {listNonCryptoPaymentSystem.map((el, i) => el.id === requisites.value &&
                <div key={i} className="adresses-container">
                  <p className='balance-content'><span className='green'>{i18next.t("Details")}:</span> {el.details}</p>
                  <p className='balance-content'><span className='green'>{i18next.t("Contact")}:</span> {el.contact}</p>
                </div>
              )}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyWithdraw && e.type === 'Cash') && amountWithdraw.value !== '' && info.value !== '' && address.value !== '' &&
            <div
              onClick={() => submitInfo('Out', address.value, 'Cash', amountWithdraw.value, getCurrencyString(currency), info.value)}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Send information")}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyWithdraw && e.type === 'Cashless') && amountWithdraw.value !== '' && info.value !== '' && requisites.value !== '' &&
            <div
              onClick={() => submitInfo('Out', requisites.value, 'Cashless', amountWithdraw.value, getCurrencyString(currency), info.value)}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Balance")}
            </div>
          } */}
        </div>
      </div>

    </IonModal>
  );
}

export default WithdrawModal;