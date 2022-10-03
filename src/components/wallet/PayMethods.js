import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IonItem,
  IonSelectOption,
  IonSelect,
  IonInput,
  IonIcon,
  IonRippleEffect,
  // IonSegment,
  // IonSegmentButton,
  // IonLabel
} from '@ionic/react';
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import darkBgrSmall from "../../images/backgrounds/wallet-dark-bgr.png";
import darkBgrBig from "../../images/backgrounds/wallet-dark-bgr-big.png";
import lightBgrSmall from "../../images/backgrounds/wallet-light-bgr.png";
import lightBgrBig from "../../images/backgrounds/wallet-light-bgr-big.png";
import i18next from 'i18next';
import useIonInput from '../../hooks/useIonInput';

const PayMethods = (props) => {
  // const [withdrawalToggle, setWithdrawalToggle] = useState(props.method);
  const theme = useSelector(state => state.settings.theme);
  const options = { cssClass: 'custom-select' };
  const [crytoAmountSelect, setCrytoAmountSelect] = useState('BTC');
  const [bankAmountSelect, setBankAmountSelect] = useState('BTC');
  const [cashAmountSelect, setCashAmountSelect] = useState('BTC');
  const cryptoAmountInput = useIonInput('');
  const bankAmountInput = useIonInput('');
  const cashAmountInput = useIonInput('');

  return (
    <div className="wallet-loan-content">
      {/* wallet-loan-data */}
      <div className="wallet-loan-data">

        {/* <IonSegment
          mode={"ios"}
          value={withdrawalToggle}
          className="top-segment dark-segment"
          onIonChange={e => setWithdrawalToggle(e.detail.value)}
        >
          <IonSegmentButton type={"button"} value="crypto">
            <IonLabel>
            {i18next.t("Crypto")}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton type={"button"} value="bank">
            <IonLabel>
            {i18next.t("Bank transfer")}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton type={"button"} value="cash">
            <IonLabel>
            {i18next.t("Cash")}
            </IonLabel>
          </IonSegmentButton>
        </IonSegment> */}

        {props.method === "crypto" &&
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="wallet-loan-title">
              {i18next.t("Cryptocurrency")}
            </div>
            {/* input-container-dark */}
            <div className="input-container-dark amount-container">
              <div className="input-label">
                {i18next.t("Amount of the withdrawal")}
              </div>
              <div className="merge-input-select">
                <IonSelect
                  value={crytoAmountSelect}
                  onIonChange={e => setCrytoAmountSelect(e.detail.value)}
                  interfaceOptions={options}
                  interface={'popover'}
                  mode={'md'}
                >
                  <IonSelectOption value="UTC">UTC</IonSelectOption>
                  <IonSelectOption value="BTC">BTC</IonSelectOption>
                </IonSelect>
                <IonItem lines="none">
                  <IonInput
                    type="text"
                    clearInput={true}
                    {...cryptoAmountInput}
                  >
                  </IonInput>
                </IonItem>
              </div>
            </div>
            {/* input-container-dark end */}
            <div className="wallet-number-container">
              <div className="wallet-number-value">1414 1414 2945 3040</div>
              <div className="wallet-number-title">
                {i18next.t("Wallet number")}
              </div>
            </div>

            <div className="take-loan ion-activatable">
              <IonRippleEffect />
              {i18next.t("Take the loan")}
            </div>
          </form>
        }

        {props.method === "bank" &&
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="wallet-loan-title">
              {i18next.t("Bank transfer")}
            </div>
            {/* input-container-dark */}
            <div className="input-container-dark amount-container">
              <div className="input-label">
                {i18next.t("Amount of the withdrawal")}
              </div>
              <div className="merge-input-select">
                <IonSelect
                  value={bankAmountSelect}
                  onIonChange={e => setBankAmountSelect(e.detail.value)}
                  interfaceOptions={options}
                  interface={'popover'}
                  mode={'md'}
                >
                  <IonSelectOption value="UTC">UTC</IonSelectOption>
                  <IonSelectOption value="BTC">BTC</IonSelectOption>
                </IonSelect>
                <IonItem lines="none">
                  <IonInput
                    type="text"
                    clearInput={true}
                    {...bankAmountInput}
                  >
                  </IonInput>
                </IonItem>
              </div>
            </div>
            {/* input-container-dark end */}
            <div className="wallet-number-container">
              <div className="wallet-number-value">1414 1414 2945 3040</div>
              <div className="wallet-number-title">
                {i18next.t("Wallet number")}
              </div>
            </div>

            <div className="take-loan ion-activatable">
              <IonRippleEffect />
              {i18next.t("Take the loan")}
            </div>
          </form>
        }

        {props.method === "cash" &&
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="wallet-loan-title">
              {i18next.t("Cash")}
            </div>
            {/* input-container-dark */}
            <div className="input-container-dark amount-container">
              <div className="input-label">
                {i18next.t("Amount of the withdrawal")}
              </div>
              <div className="merge-input-select">
                <IonSelect
                  value={cashAmountSelect}
                  onIonChange={e => setCashAmountSelect(e.detail.value)}
                  interfaceOptions={options}
                  interface={'popover'}
                  mode={'md'}
                >
                  <IonSelectOption value="UTC">UTC</IonSelectOption>
                  <IonSelectOption value="BTC">BTC</IonSelectOption>
                </IonSelect>
                <IonItem lines="none">
                  <IonInput
                    type="text"
                    clearInput={true}
                    {...cashAmountInput}
                  >
                  </IonInput>
                </IonItem>
              </div>
            </div>
            {/* input-container-dark end */}
            <div className="wallet-number-container">
              <div className="wallet-number-value">1414 1414 2945 3040</div>
              <div className="wallet-number-title">
                {i18next.t("Wallet number")}
              </div>
            </div>

            <div className="take-loan ion-activatable">
              <IonRippleEffect />
              {i18next.t("Take the loan")}
            </div>
          </form>
        }

      </div>
      {/* wallet-loan-data end */}

      <div className="wallet-loan-image">
        {theme.darkMode === true &&
          <ResponsiveImage>
            <ResponsiveImageSize
              default
              minWidth={0}
              path={darkBgrSmall}
            />
            <ResponsiveImageSize
              minWidth={1921}
              path={darkBgrBig}
            />
          </ResponsiveImage>
        }

        {theme.darkMode === false && <ResponsiveImage>
          <ResponsiveImageSize
            default
            minWidth={0}
            path={lightBgrSmall}
          />
          <ResponsiveImageSize
            minWidth={1921}
            path={lightBgrBig}
          />
        </ResponsiveImage>
        }
      </div>

    </div >
  )

}

export default PayMethods
