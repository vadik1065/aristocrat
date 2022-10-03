import React, { useEffect } from "react";
import { IonPage, useIonViewWillLeave } from "@ionic/react";
// Components
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../api/functions.js';
// CSS
import '../css/favorites.css';
import { getEvents, toggleLoader, toggleLOB } from "../store/actions/index.js";
import DesktopContent from "../components/containers/desktop-container/DesktopContent.js";
import MobileContent from "../components/mobile/MobileContent.js";
import TabletContent from "../components/tablet/TabletContent.js";

const Favorites = (props) => {
  const dispatch = useDispatch()
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;
  const sportsId = useSelector(state => state.sportsId);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (sportsId) {
      dispatch(toggleLoader(true));
      API.getEvents(token, { sportsId }).then(res => {
        if (res.data.data.listFixtures) {
          dispatch(getEvents(res.data.data.listFixtures));
          dispatch(toggleLoader(false));
        }
      })
    }
  }, []);

  useIonViewWillLeave(() => {
    dispatch(toggleLOB(false));
  });

  return (
    <IonPage>
      {isMobile && <MobileContent />}
      {isTablet && <TabletContent />}
      {(isDesktop || is4k) && <DesktopContent favPage />}
    </IonPage >
  )
}

export default Favorites;
