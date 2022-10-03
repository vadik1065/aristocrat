import React, { useState, useEffect, Fragment } from 'react';
import '../css/rightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as API from '../api/functions.js'
import { IonLabel, IonSegment, IonSegmentButton, IonSpinner } from "@ionic/react";
import { ReactComponent as SettingsIcon } from '../images/settings.svg';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import selectArrows from '../images/select-arrows.svg';
import EmptyBetslip from './betslip/EmptyBetslip';
import i18next from 'i18next';
import DesktopRightBarSingle from './DesktopRightBarSingle';
import DesktopRightBarMultiple from './DesktopRightBarMultiple';
import DesktopRightBarQuoteSingle from './DesktopRightBarQuoteSingle';
import DesktopRightBarMultipleQuote from './DesktopRightBarMultipleQuote';



const DesktopRightBarContainer = () => {
  const token = useSelector(state => state.token);
  const betslip = useSelector(state => state.betslip);
  const bets = useSelector(state => state.bets);
  const is4k = useSelector(state => state.width >= 3400);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [betOrQuote, setBetOrQuote] = useState('bet');
  const [segmentMultiBetValue, setSegmentMultiBetValue] = useState("singles");
  const [loader, setLoader] = useState(false);
  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    if (betslip.length > 0) {
      getMinMax(betslip);
    }
    if (betslip.length === 1) {
      setSegmentMultiBetValue('singles');
    }
  }, [betslip]);

  function getMinMax(arr) {
    // setLoader(true);
    let obj = {};
    let newBets = arr.map(el => {
      obj = bets.find(bet => bet.id === el.buttonId);
      obj.betId = el.betId;
      return obj;
    })

    let newArr = newBets.map(el => {
      return {
        id: el.betId,
        events: [{
          price: el.price,
          market_id: el.market_id.split('_')[0],
          fixture_id: el.match_id,
          selection_id: el.id
        }]
      }
    })
    API.getBetsMinMax(token, newArr).then(res => {
      // setLoader(false);
      setMinMax(res.data.data);
    })
  }

  return (
    <div className={`desktop-right-bar-wrapper ${themeAccent} ${is4k ? 'ultra' : ''}`}>
      <div className="desktop-right-bar">
        {betslip.length !== 0 &&
          <div className="right-bar-header flex">
            {/* <div className="bet-btn flex active">Bet</div>
            <div className="quote-btn flex">Quote</div> */}
            <IonSegment
              mode={"md"}
              value={betOrQuote}
              // className="home-top-segment"
              onIonChange={(e) => setBetOrQuote(e.detail.value)}
            >
              <IonSegmentButton value="bet">
                <IonLabel>
                  {i18next.t("Bet")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="quote">
                <IonLabel>
                  {i18next.t("Quote")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
            {/* <div className="home-top-container-btns">
              <button className="btn-search">
                <SettingsIcon />
              </button>
            </div> */}
          </div>
        }

        {betslip.length === 0 && <EmptyBetslip />}

        {loader && <IonSpinner className="spinner-large center" name="lines" />}

        {!loader && betOrQuote === 'bet' &&
          <div className="right-bar-body flex">
            {betslip.length > 1 &&
              <IonSegment
                mode={"ios"}
                value={segmentMultiBetValue}
                className="home-top-segment blue"
                onIonChange={(e) => setSegmentMultiBetValue(e.detail.value)}
              >
                <IonSegmentButton value="singles">
                  <IonLabel>
                    {i18next.t("Singles")}
                  </IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="multiple">
                  <IonLabel>
                    {i18next.t("Multiple")}
                  </IonLabel>
                </IonSegmentButton>
              </IonSegment>
            }

            {segmentMultiBetValue === 'singles' &&
              <DesktopRightBarSingle
                loader={loader}
                setLoader={setLoader}
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }
            {segmentMultiBetValue === 'multiple' &&
              <DesktopRightBarMultiple
                loader={loader}
                setLoader={setLoader}
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }
          </div>
        }

        {!loader && betOrQuote === 'quote' &&
          <div className="right-bar-body flex">
            {betslip.length > 1 &&
              <IonSegment
                mode={"ios"}
                value={segmentMultiBetValue}
                className="home-top-segment blue"
                onIonChange={(e) => setSegmentMultiBetValue(e.detail.value)}
              >
                <IonSegmentButton value="singles">
                  <IonLabel>
                    {i18next.t("Singles")}
                  </IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="multiple">
                  <IonLabel>
                    {i18next.t("Multiple")}
                  </IonLabel>
                </IonSegmentButton>
              </IonSegment>
            }

            {segmentMultiBetValue === 'singles' &&
              <DesktopRightBarQuoteSingle
                loader={loader}
                setLoader={setLoader}
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }
            {segmentMultiBetValue === 'multiple' &&
              <DesktopRightBarMultipleQuote
                loader={loader}
                setLoader={setLoader}
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default DesktopRightBarContainer;
