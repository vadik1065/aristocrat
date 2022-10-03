import { IonInput, IonItem, IonModal, IonRippleEffect, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as API from '../../../api/functions.js';
import { getUserInfo, toggleErrorToast, toggleErrorToastText, toggleToastText, toggleToast, setTransactions } from "../../../store/actions";
import { ReactComponent as CloseIcon } from '../../../images/close-icon.svg';
import axios from 'axios';
import url from '../../../axios.js';
import { getCurrency, getDate } from '../../../utils/utils.js';
import '../../../css/modal.css';
import i18next from 'i18next';
import useIonInput from '../../../hooks/useIonInput.js';

const TakeLoanModal = (props) => {
  const dispatch = useDispatch();
  const options = { cssClass: 'custom-select' }
  const token = useSelector(state => state.token);
  const currency_id = useSelector(state => state.user.currency);
  const balanceInfo = useSelector(state => state.user.balanceInfo);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [maturity, setMaturity] = useState('3 days');
  const loanValue = useIonInput('');
  const [moneyValue, setMoneyValue] = useState(0);
  const [date, setDate] = useState('');

  function loan() {
    if (loanValue.value !== undefined && loanValue.value !== '') {
      // setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/get-credit",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          value: Math.ceil(loanValue.value),
          time: maturity
        }
      })
        .then(response => {
          closeAll();
          API.getInfo(token)
            .then(res => {
              dispatch(getUserInfo(res));
              if (res.player.verified_date !== null) {
                API.getTransactionsHistory(token, {
                  from: moment(res.player.verified_date).unix(),
                  to: moment(new Date()).unix()
                }).then(res => {
                  dispatch(setTransactions(res.history));
                });
              }
            });

          dispatch(toggleToastText('Operation has been submitted.'));
          dispatch(toggleToast(true));
          props.setIsLoan(true);
          setMoneyValue('');
          // setLoading(false);
        })
        .catch(error => {
          // setLoading(false);
          dispatch(toggleErrorToastText(error.response.data.error))
          dispatch(toggleErrorToast(true));
        });
    }
  }

  function payOff() {
    if (loanValue.value !== undefined && loanValue.value !== '') {
      // setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/pay-credit",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          value: loanValue.value,
        }
      })
        .then(response => {
          closeAll();
          API.getInfo(token).then(res => {
            dispatch(getUserInfo(res));
            if (res.player.verified_date !== null) {
              API.getTransactionsHistory(token, {
                from: moment(res.player.verified_date).unix(),
                to: moment(new Date()).unix()
              }).then(res => {
                dispatch(setTransactions(res.history));
              });
            }
          });

          dispatch(toggleToastText('Operation has been submitted.'));
          dispatch(toggleToast(true));
          props.setIsLoan(true);
          setMoneyValue('');
          // setLoading(false);
        })
        .catch(error => {
          // setLoading(false);
          dispatch(toggleErrorToastText(error.response.data.error))
          dispatch(toggleErrorToast(true));
        });
    }
  }

  useEffect(() => {
    balanceInfo.forEach((item) => {
      if (item.currency_id === currency_id) {
        switch (item.credit_status) {
          case 0:
            props.setIsLoan(false);
            props.setHasLoan(false);
            break;
          case 1:
            props.setIsLoan(true);
            setMoneyValue(item.credit_value);
            props.setHasLoan(false);
            break;
          case 2:
            props.setIsLoan(false);
            setMoneyValue(item.credit_value);
            setDate(item.credit_time);
            props.setHasLoan(true);
            break;
        }
      }
    });
  }, [balanceInfo]);

  function closeAll() {
    props.close(false);
    loanValue.setReset();
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
            {i18next.t("Loan request")}
          </span>
          <CloseIcon className="close-icon" onClick={() => closeAll()} />
        </div>
        <div className="balance-fields-container dashboard-grid-item">
          {!props.isLoan && !props.hasLoan &&
            <>
              <div className="input-container flex without-select">
                <span>
                  {i18next.t("Value")}
                </span>
                <IonItem lines="none" >
                  <IonInput
                    {...loanValue}
                    placeholder={i18next.t("Value")}
                  />
                </IonItem>
              </div>
              <div className="input-container flex select">
                <span>
                  {i18next.t("Loan maturity")}
                </span>
                <IonSelect
                  interfaceOptions={options}
                  value={maturity}
                  onIonChange={e => setMaturity(e.detail.value)}
                  placeholder={i18next.t("Set")}
                  interface={'popover'}
                  mode={'md'}
                >
                  <IonSelectOption value={'3 days'}>3 {i18next.t("Days")}</IonSelectOption>
                  <IonSelectOption value={'7 days'}>7 {i18next.t("Days")}</IonSelectOption>
                  <IonSelectOption value={'30 days'}>30 {i18next.t("Days")}</IonSelectOption>
                </IonSelect>
              </div>
            </>
          }

          {props.isLoan &&
            <p className="balance-content">
              {i18next.t("Your")} {moneyValue}{getCurrency(currency_id)} {i18next.t("loan is pending")}.
            </p>
          }
          {props.hasLoan &&
            <>
              <p className="loan-request-header">
                {i18next.t("You need to repay the")} {moneyValue}{getCurrency(currency_id)} {i18next.t("loan before")} <strong>{getDate(date, dateFormat, timeZone)}</strong>
              </p>
              <div className="input-container flex without-select">
                <span>
                  {i18next.t("Value")}
                </span>
                <IonItem lines="none" >
                  <IonInput
                    {...loanValue}
                    placeholder={i18next.t("Value")}
                  />
                </IonItem>
              </div>
            </>
          }
          {loanValue.value && !props.hasLoan && !props.isLoan &&
            <div onClick={() => loan()} className="take-loan ion-activatable deposit">
              <IonRippleEffect />
              {i18next.t("Loan request")}
            </div>
          }
          {loanValue.value && props.hasLoan &&
            <div onClick={() => payOff()} className="repay-loan ion-activatable deposit">
              <IonRippleEffect />
              {i18next.t("Repay the loan")}
            </div>
          }
        </div>
      </div>

    </IonModal>
  );
}

export default TakeLoanModal;
