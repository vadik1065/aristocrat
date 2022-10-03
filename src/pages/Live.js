import React, { useEffect } from "react";
import { IonPage } from "@ionic/react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoader } from '../store/actions/index.js';
import * as API from '../api/functions.js';
import { getEvents } from '../store/actions/index.js';
import "../css/home.css";
import "../css/colors.css";
import { Redirect } from 'react-router-dom';
import DesktopContent from "../components/containers/desktop-container/DesktopContent.js";
import MobileContent from "../components/mobile/MobileContent.js";
import TabletContent from "../components/tablet/TabletContent.js";

const Live = () => {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const sportsId = useSelector(state => state.sportsId);
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;

  useEffect(() => {
    if (sportsId) {
      dispatch(toggleLoader(true));
      API.getEvents(token, { sportsId, live: true }).then(res => {
        if (res.data.data.listFixtures) {
          dispatch(getEvents(res.data.data.listFixtures));
          dispatch(toggleLoader(false));
        }
      })
    }
  }, []);

  return (
    <IonPage>
      {/* {token === '' && <Redirect to="/login" />} */}

      {(isDesktop || is4k) && <DesktopContent matchstatus={2} />}
      {isMobile && <MobileContent />}
      {isTablet && <TabletContent />}
    </IonPage>
  );
};

export default Live;
