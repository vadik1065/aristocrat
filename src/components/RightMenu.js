import React, { useEffect, useState } from "react";
import {
  IonMenu,
  IonContent,
} from "@ionic/react";
import "../css/menu.css";
import url from '../axios.js';
import { Link, useLocation } from "react-router-dom";
import { menuController } from "@ionic/core";
import * as API from '../api/functions.js';
import { getEvents, setSportsId, toggleLoader } from '../store/actions/index.js';
import { getSportListToShow } from '../utils/utils.js';
import { useDispatch, useSelector } from "react-redux";
import { listFixtures } from "../store/tempSamples";



const RightMenu = ({ pagesWithoutBars, ...props }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  // const sportsList = useSelector(state => state.sportsList);
  const sports = useSelector(state => state.sports);
  const sportsId = useSelector(state => state.sportsId);
  const [listToShow, setListToShow] = useState([]);
  // const [activeTournament, setActiveTournament] = useState('');
  // const [activeSport, setActiveSport] = useState(sportsId);
  const pagesArr = pagesWithoutBars.filter(page => location.pathname == page);
  const isSmallWidth = useSelector(state => state.width < 768);

  useEffect(() => {
    if (location.pathname === '/home') {
      // setListToShow(sports.filter(sport => sport.cnt_inplay > 0 || sport.cnt_prematch > 0));
      setListToShow(sports.map(sport => {
        return {
          ...sport,
          isChangeSports: sport.cnt_inplay > 0 || sport.cnt_prematch > 0
        }
      }))
    }

    if (location.pathname === '/live') {
      // setListToShow(sports.filter(sport => sport.cnt_inplay > 0));
      setListToShow(sports.map(sport => {
        return {
          ...sport,
          isChangeSports: sport.cnt_inplay > 0
        }
      }))
    }

    if (location.pathname === '/events') {
      // setListToShow(sports.filter(sport => sport.cnt_prematch > 0));
      setListToShow(sports.map(sport => {
        return {
          ...sport,
          isChangeSports: sport.cnt_prematch > 0
        }
      }))
    }
  }, [sports, location.pathname]);

  function changeSports(id) {
    dispatch(setSportsId(id));

    dispatch(toggleLoader(true));
    API.getEvents(token, { sportsId: id }).then(res => {
      if (res.data.data.listFixtures) {
        dispatch(getEvents(res.data.data.listFixtures));
        dispatch(toggleLoader(false));
      };
    })
  }

  return <>
    {isSmallWidth && pagesArr.length == 0 &&
      <IonMenu swipeGesture={false} className={`main-menu ${themeAccent}`} side="end" contentId="main">
        <IonContent>
          <div className="menu-right-links-mobile">
            {listToShow.map((el, i) => {
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    if (el.isChangeSports) {
                      changeSports(el.id);
                      menuController.toggle("end")
                    }
                  }}
                  className={el.isChangeSports ? '' : 'not-active'}
                >
                  <p className={`flex ${sportsId === el.id && 'choosen'}`}>
                    {el.image && <img src={`${url}/${el.image}`} alt="pic" />}
                    {el.name}
                  </p>
                </div>
              )
            })}
          </div>
        </IonContent>
      </IonMenu>
    }
  </>
}

export default RightMenu;
