import React, { useState } from "react";
import {
  IonPage, IonContent, IonSegment, IonSegmentButton,
  IonLabel, IonIcon
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { chevronBackOutline } from 'ionicons/icons';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
// Components
import Sidebar from '../components/account/Sidebar.js';
import AllPayMethods from "../components/wallet/AllPayMethods.js";
import PayMethods from "../components/wallet/PayMethods.js";
// CSS
import "../css/wallet.css";
import i18next from "i18next";

const Wallet = (props) => {
  const width = useSelector(state => state.width);
  const isDesktop = width >= 1025;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [desktopTab, setDesktopTab] = useState(1);
  const [methodsTab, setMethodsTab] = useState("crypto");



  return (
    <IonPage className="wallet-page">
      <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
        <div className={`main-big main-account-big ${isDesktop ? themeAccent : ''}`}>
          {isDesktop &&
            <>
              <Sidebar />
              {/* wallet-right-container */}
              <div className="wallet-right-container">
                {/* rectangular-area-wrapper */}
                <div className="rectangular-area-wrapper">
                  <div className="rectangular-area">
                    <div className="back-link">
                      <Link to="/account">
                        <IonIcon size="small" icon={chevronBackOutline} slot="end" />
                        <span>
                          {i18next.t("Back to My Account")}
                        </span>
                      </Link>
                      {/* <CloseIcon className="close-icon" /> */}
                    </div>
                    {/* wallet-body */}
                    <div className="wallet-body">
                      <div className="wallet-title">
                        {i18next.t("Take the loan")}
                      </div>
                      <div className="wallet-description">
                        {i18next.t("Select payment method to top up your account")}:
                      </div>
                      {/* wallet-content-body */}
                      <div className="wallet-content-body">
                        <ul className="wallet-tabs">
                          <li
                            className={(desktopTab === 1 ? "active-tab" : '')}
                            onClick={() => setDesktopTab(1)}
                          >
                            {i18next.t("All Methods")}
                          </li>

                          <li
                            className={(desktopTab === 2 ? "active-tab" : '')}
                            onClick={() => setDesktopTab(2)}
                          >
                            {i18next.t("Cryptocurrency")}
                          </li>

                          <li
                            className={(desktopTab === 3 ? "active-tab" : '')}
                            onClick={() => setDesktopTab(3)}
                          >
                            {i18next.t("Bank Transfer")}
                          </li>

                          <li
                            className={(desktopTab === 4 ? "active-tab" : '')}
                            onClick={() => setDesktopTab(4)}
                          >
                            {i18next.t("Cash")}
                          </li>
                        </ul>
                        {desktopTab === 1 && <AllPayMethods method={"all"} />}
                        {desktopTab === 2 && <PayMethods method={"crypto"} />}
                        {desktopTab === 3 && <PayMethods method={"bank"} />}
                        {desktopTab === 4 && <PayMethods method={"cash"} />}
                      </div>
                      {/* wallet-content-body end */}
                    </div>
                    {/* wallet-body end */}
                  </div>
                </div>
                {/* rectangular-area-wrapper end */}
              </div>
              {/* wallet-right-container end */}
            </>
          }

          {!isDesktop &&
            <div className="rectangular-area">
              <div className="back-link">
                <Link to="/account">
                  <IonIcon size="small" icon={chevronBackOutline} slot="end" />
                  <span>
                    {i18next.t("Back to My Account")}
                  </span>
                </Link>
              </div>
              {/* wallet-body */}
              <div className="wallet-body">
                <div className="wallet-title">
                  {i18next.t("Take the loan")}
                </div>
                {/* wallet-content-body */}
                <div className="wallet-content-body">
                  <IonSegment
                    mode={"ios"}
                    value={methodsTab}
                    className="top-segment dark-segment"
                    onIonChange={e => setMethodsTab(e.detail.value)}
                  >
                    <IonSegmentButton type={"button"} value="crypto">
                      <IonLabel>
                        {i18next.t("Crypto")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton type={"button"} value="bank">
                      <IonLabel>
                        {i18next.t("Bank")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton type={"button"} value="cash">
                      <IonLabel>
                        {i18next.t("Cash")}
                      </IonLabel>
                    </IonSegmentButton>
                  </IonSegment>

                  {(methodsTab === "crypto") &&
                    <>
                      <AllPayMethods method={"crypto"} />
                      <PayMethods method={"crypto"} />
                    </>
                  }
                  {(methodsTab === "bank") &&
                    <>
                      <AllPayMethods method={"bank"} />
                      <PayMethods method={"bank"} />
                    </>
                  }
                  {(methodsTab === "cash") &&
                    <>
                      <AllPayMethods method={"cash"} />
                      <PayMethods method={"cash"} />
                    </>
                  }

                </div>
                {/* wallet-content-body end */}
              </div>
              {/* wallet-body end */}
            </div>

          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
