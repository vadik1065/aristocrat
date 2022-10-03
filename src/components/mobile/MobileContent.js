import React, { useState } from "react";
import {IonSegment, IonSegmentButton, IonLabel, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import "../../css/isMobileV.css";
import i18next from "i18next";
import WalletMobile from "../WalletMobile";
import MobileContainer from "./MobileContainer";
import { useSelector } from "react-redux";
import fab from "../../images/fab.svg";
import BetModal from "../BetModal";
import { useLocation } from "react-router";

const MobileContent = (props) => {
  const location = useLocation();
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const betslip = useSelector(state => state.betslip);
  const [matchTypeValue, setMatchTypeValue] = useState('Live');
  const [showBetModal, setShowBetModal] = useState(false);

  //обновление экрана свайпом сверху
  function doRefresh(event) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <IonRefresher
        className="ios"
        pullFactor={0.7}
        pullMin={50}
        pullMax={90}
        slot="fixed"
        onIonRefresh={doRefresh}
      >
        <IonRefresherContent
          pullingIcon={"circular"}
          refreshingSpinner={"circular"}
        />
      </IonRefresher>
      <div className="main-mobile" >
        <WalletMobile />
        {location.pathname === '/home' && 
          <>
            <IonSegment
              mode={"ios"}
              value={matchTypeValue}
              className="home-top-segment"
              onIonChange={e => setMatchTypeValue(e.detail.value)}
            >
              <IonSegmentButton type={"button"} value="Live">
                <IonLabel>
                  {i18next.t("Live")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="Prematch">
                <IonLabel>
                  {i18next.t("Prematch")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <MobileContainer matchTypeValue={matchTypeValue} />
          </>
        }

        {location.pathname === '/live' && 
          <MobileContainer matchTypeValue="Live" />
        }

        {location.pathname === '/events' && 
          <>
            <IonSegment
              mode={"ios"}
              value={props.segmentValue}
              className="home-top-segment"
              onIonChange={e => props.setSegmentValue(e.detail.value)}
            >
              <IonSegmentButton type={"button"} value="all">
                <IonLabel>
                  {i18next.t("All")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="today">
                <IonLabel>
                  {i18next.t("Today")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="tomorrow">
                <IonLabel>
                  {i18next.t("Tomorrow")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="soon">
                <IonLabel>
                  {i18next.t("Soon")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <MobileContainer matchTypeValue="Prematch" segmentValue={props.segmentValue} />
          </>
        }

        {location.pathname === '/favorites' && 
          <MobileContainer />
        }
      </div>

      {betslip.length > 0 &&
        <BetModal
          setShowBetModal={setShowBetModal}
          showBetModal={showBetModal}
        />
      }

      {betslip.length > 0 && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton 
            onClick={() => setShowBetModal(true)} 
            className="bet-badge"
          >
            <IonIcon icon={fab} />
            <div className="bet-quantity">{betslip.length}</div>
          </IonFabButton>
        </IonFab>
      )}
    </IonContent>
  )
}

export default MobileContent;
