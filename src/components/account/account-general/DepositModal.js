import { IonInput, IonItem, IonModal, IonRippleEffect, IonSelect, IonSelectOption, IonSpinner, IonTextarea } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../css/modal.css';
import { ReactComponent as CloseIcon } from '../../../images/close-icon.svg';
import QRCode from 'qrcode.react';
import i18next from "i18next";
import axios from 'axios';
import * as API from '../../../api/functions.js';
import url from '../../../axios.js';
import { toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from "../../../store/actions";
import { getCurrencyString } from '../../../utils/utils';
import useIonInput from '../../../hooks/useIonInput';

const DepositModal = (props) => {
  const dispatch = useDispatch();
  const options = { cssClass: 'custom-select' }
  const token = useSelector(state => state.token);
  const listPaymentSystem = useSelector(state => state.paymentSystems);
  const listNonCryptoPaymentSystem = useSelector(state => state.nonCryptoPaymentSystems);
  const theme = useSelector(state => state.settings.theme);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const currency = useSelector(state => state.user.currency);
  const [btcWallet, setBtcWallet] = useState('');
  const [btcPrice, setBtcPrice] = useState(0);
  const currencyDeposit = useIonInput('');
  const amountDeposit = useIonInput('');
  const info = useIonInput('');
  const address = useIonInput('');
  const requisites = useIonInput('');
  const [loading, setLoading] = useState(false);

  function getBtcWallet() {
    setLoading(true);
    axios({
      method: 'post',
      url: url + "/api/get-address-payment",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        payment_system_id: currencyDeposit.value
      }
    }).then(res => {
        if (res.data.status === 1) {
          setBtcWallet(res.data.data.address);
        }
    }).catch(error => {
        if (error.response.data.status === 422) {
          dispatch(toggleErrorToastText(error.response.data.error))
          dispatch(toggleErrorToast(true));
        }
    }).finally(() => setLoading(false))
  };

  useEffect(() => {
    if (currencyDeposit.value && listPaymentSystem.length && listPaymentSystem.some(e => e.payment_system_id === currencyDeposit.value)) {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/get-curs-crypto",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          payment_system_id: currencyDeposit.value,
          currency_entity: 'EUR'
        }
      }).then(res => {
        setBtcPrice(res.data.curs.price);
      }).then(() => {
        getBtcWallet();
      }).catch(error => {
        if (error.response.data.status === 403) {
          dispatch(toggleErrorToastText(error.response.data.error))
          dispatch(toggleErrorToast(true));
          setLoading(false)
        }
      })
    };

    setBtcWallet('');
  }, [currencyDeposit.value, listPaymentSystem]);

  function closeAll() {
    props.close(false);
    setBtcWallet('');
    currencyDeposit.setReset();
    amountDeposit.setReset();
    info.setReset();
    address.setReset();
    requisites.setReset();
  }

  function submitInfo(data) {
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
            {i18next.t("Deposit money")}
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
                // value={currencyDeposit}
                // onIonChange={(e) => setCurrencyDeposit(e.detail.value)}
                {...currencyDeposit}
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
            {!loading && btcWallet && 
              <div className="input-container flex comission">
                <span>Comission</span>
                <div className="body-field">
                  <span>0%</span>
                </div>
              </div>
            }
          </div>
          {/* <div className="input-container flex without-select">
            <span>
              {i18next.t("Value")}
            </span>
            <IonItem lines="none" >
              <IonInput
                placeholder={i18next.t("Value")} 
                {...amountDeposit}
                // value={amountDeposit}
                // onIonChange={e => setAmountDeposit(e.detail.value)}
              />
            </IonItem>
          </div> */}
          {/* {listPaymentSystem.some(e => e.payment_system_id === currencyDeposit.value) && amountDeposit.value &&
            <>
              <p className='balance-content'>
                <span className='green'>{amountDeposit.value}</span> <span className='crypto'>{currencyDeposit.value}</span> {i18next.t("is approximately")} <span className='green'>{(amountDeposit.value * btcPrice).toFixed(2)}</span> {i18next.t("EUR")}.
              </p>
              <p className='balance-content'>
                {i18next.t("The exchange rate will be specified at the time of enrollment.")}
              </p>
            </>
          } */}

          {loading && <IonSpinner color={theme.darkMode ? 'light' : ''} className="spinner-large center" name="lines" />}

          {!loading && btcWallet &&
            <>
              <p className='balance-content deposit-via'>
                {i18next.t("Deposit via")} <span className='green pointer'>{btcWallet}</span>
              </p>
              <QRCode renderAs={'svg'} className='qr' value={btcWallet} />
            </>
          }

          {/* {listPaymentSystem.some(e => e.payment_system_id === currencyDeposit.value) && amountDeposit.value !== '' && btcWallet === '' &&
            <div onClick={() => getBtcWallet()} className="take-loan ion-activatable deposit">
              <IonRippleEffect />
              {i18next.t("Deposit money")}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyDeposit.value) &&
            <div className="input-container flex w100">
              <span>
                {i18next.t("Information")}
              </span>
              <IonTextarea
                className="text-area"
                placeholder={i18next.t("Enter more information here...")}
                {...info}
                // value={info}
                // onIonChange={e => setInfo(e.detail.value)}
              >
              </IonTextarea>
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyDeposit.value && e.type === 'Cash') &&
            <div className="input-container flex select">
              <span>
                {i18next.t("Adresses")}
              </span>
              <IonSelect
                interfaceOptions={options}
                // value={address}
                // onIonChange={(e) => setAddress(e.detail.value)}
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
                  <p className='balance-content'>
                    <span className='green'>{i18next.t("Details")}:</span> {el.details}
                  </p>
                  <p className='balance-content'>
                    <span className='green'>{i18next.t("Contact")}:</span> {el.contact}
                  </p>
                </div>
              )}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyDeposit.value && e.type === 'Cashless') &&
            <div className="input-container flex select">
              <span>
                {i18next.t("Requisites")}
              </span>
              <IonSelect
                interfaceOptions={options}
                // value={requisites}
                // onIonChange={(e) => setRequisites(e.detail.value)}
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
                  <p className='balance-content'>
                    <span className='green'>{i18next.t("Details")}:</span> {el.details}
                  </p>
                  <p className='balance-content'>
                    <span className='green'>{i18next.t("Contact")}:</span> {el.contact}
                  </p>
                </div>
              )}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyDeposit.value && e.type === 'Cash') && amountDeposit.value !== '' && info.value !== '' && address.value !== '' &&
            <div
              onClick={() => submitInfo({
                direction: 'In', 
                directionId: address.value, 
                type: 'Cash', 
                summa: amountDeposit.value, 
                currency_entity: getCurrencyString(currency), 
                details: info.value
              })}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Send information")}
            </div>
          } */}

          {/* {listNonCryptoPaymentSystem.some(e => e.type === currencyDeposit.value && e.type === 'Cashless') && amountDeposit.value !== '' && info.value !== '' && requisites.value !== '' &&
            <div
              onClick={() => submitInfo({
                direction: 'In', 
                directionId: requisites.value, 
                type: 'Cashless', 
                summa: amountDeposit.value, 
                currency_entity: getCurrencyString(currency), 
                details: info.value
              })}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Send information")}
            </div>
          } */}
        </div>
      </div>

    </IonModal>
  );
}

export default DepositModal;
