import React, { useEffect } from "react";
import { useIonViewWillLeave, IonPage } from "@ionic/react";
import { useSelector, useDispatch } from 'react-redux';
import * as API from '../api/functions.js';
import { getEvents } from '../store/actions/index.js';
import "../css/events.css";
import "../css/colors.css";
import { toggleLoader } from '../store/actions/index.js';
import { Redirect } from 'react-router-dom';
import DesktopContent from "../components/containers/desktop-container/DesktopContent.js";
import MobileContent from "../components/mobile/MobileContent.js";
import TabletContent from "../components/tablet/TabletContent.js";

const Events = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;
  const sportsId = useSelector(state => state.sportsId);

  useEffect(() => {
    if (sportsId) {
      dispatch(toggleLoader(true));
      API.getEvents(token, { sportsId, live: false }).then(res => {
        if (res.data.data.listFixtures) {
          dispatch(getEvents(res.data.data.listFixtures));
          dispatch(toggleLoader(false));
        }
      })
    }
  }, []);

  //ionic hook, сработает при уходе со страницы
  useIonViewWillLeave(() => {
    props.setSegmentValue('all');
  });

  return (
    <IonPage>
      {/* {token === '' && <Redirect to="/login" />} */}

      {(isDesktop || is4k) &&
        <DesktopContent 
          matchstatus={1} 
          segmentValue={props.segmentValue}
          setSegmentValue={props.setSegmentValue}
        />
      }

      {isMobile &&
        <MobileContent 
          segmentValue={props.segmentValue} 
          setSegmentValue={props.setSegmentValue} 
        />
      }

      {isTablet &&
        <TabletContent 
          segmentValue={props.segmentValue} 
          setSegmentValue={props.setSegmentValue} 
        />
      }
    </IonPage >
  );
};

export default Events;
