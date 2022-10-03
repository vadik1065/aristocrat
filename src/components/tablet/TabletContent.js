import { IonContent, IonFab, IonFabButton, IonIcon, IonLabel, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton } from "@ionic/react";
import i18next from "i18next";
import fab from "../../images/fab.svg";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import BetModal from "../BetModal";
import TabletContainer from "./TabletContainer";
import "../../css/tabletV.css";
import MenuSportSelect from "../MenuSportSelect";

const TabletContent = (props) => {
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
      <div className={`main-tablet`} >
        {location.pathname === '/home' && 
          <>
            <div className="main-tablet-top flex">
              <MenuSportSelect matchTypeValue={matchTypeValue}/>
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
            </div>
            <TabletContainer matchTypeValue={matchTypeValue} />
          </>
        }

        {location.pathname === '/live' && 
          <>
            <div className="main-tablet-top flex">
              <MenuSportSelect matchTypeValue="Live"/>
            </div>
            <TabletContainer matchTypeValue="Live" />
          </>
        }

        {location.pathname === '/events' && 
          <>
            <div className="main-tablet-top flex">
              <MenuSportSelect matchTypeValue="Prematch"/> 
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
            </div>
            <TabletContainer matchTypeValue="Prematch" segmentValue={props.segmentValue} />
          </>
        }

        {location.pathname === '/favorites' && 
          <TabletContainer />
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
            className="bet-badge tablet"
          >
            <IonIcon icon={fab} />
            <div className="bet-quantity">{betslip.length}</div>
          </IonFabButton>
        </IonFab>
      )}
    </IonContent>
  )
}

export default TabletContent;
