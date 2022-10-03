import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { ReactComponent as Arrow } from '../images/arrow.svg';
import * as API from '../api/functions.js';
import url from '../axios.js';
import { IonSelect, IonSelectOption } from "@ionic/react";
import { getEvents, setSportsId} from '../store/actions/index.js';
import { changeTitleSport } from "../utils/utils";
import { useLocation } from "react-router";
import { listFixtures } from "../store/tempSamples";

const MenuSportSelect = (props) => {
  const token = useSelector(state => state.token);
  const sportsId = useSelector(state => state.sportsId);
  const sports = useSelector(state => state.sports);
  const [listToShow, setListToShow] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sports.length) {
      // if (props.matchTypeValue === 'Live') {
      //   setListToShow(sports.filter(sport => sport.cnt_inplay > 0));
      // }
      // if (props.matchTypeValue === 'Prematch') {
      //   setListToShow(sports.filter(sport => sport.cnt_prematch > 0));
      // }

      if (props.matchTypeValue === 'Live') {
        setListToShow(sports.map(sport => {
          return {
            ...sport,
            isChangeSports: sport.cnt_inplay > 0
          }
        }))
      }
      if (props.matchTypeValue === 'Prematch') {
        setListToShow(sports.map(sport => {
          return {
            ...sport,
            isChangeSports: sport.cnt_prematch > 0
          }
        }))
      }
    }
  }, [sports, props.matchTypeValue]);

  function changeSports(id) {
    dispatch(setSportsId(id));

    // dispatch(toggleLoader(true));
    API.getEvents(token, { sportsId: id }).then(res => {
      if (res.data.data.listFixtures) {
        dispatch(getEvents(res.data.data.listFixtures));
        // dispatch(toggleLoader(false));
      };
    })
  }

  return(
    <>
      {listToShow.length > 0 && 
        <div className="main-tablet-top flex">
          <IonSelect
            className="select sport-games-select"
            interface="popover"
            value={sportsId}
            onIonChange={(e) => changeSports(e.detail.value)}
            mode={'md'}
          >
            {listToShow.map(el => {
              return (
                <IonSelectOption key={el.id} value={el.id} disabled={!el.isChangeSports} >
                  {el.name}
                </IonSelectOption>
              )
            })}
          </IonSelect>
        </div>
      }

      {listToShow.length === 0 && 
        <div className="main-tablet-top flex">
          <IonSelect
            disabled
            className="select sport-games-select"
            interface="popover"
            value="no"
            mode={'md'}
          >
            <IonSelectOption value="no">No events</IonSelectOption>
          </IonSelect>
      </div>
      }
    </>
  )
}

export default MenuSportSelect;
