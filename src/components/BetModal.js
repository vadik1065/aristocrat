import React, { useEffect, useState } from "react";
import { IonModal, IonSegment, IonLabel, IonSegmentButton } from "@ionic/react";
import { useSelector } from 'react-redux';
import "../css/betModal.css";
import { ReactComponent as Close } from '../images/close.svg';
import * as API from '../api/functions.js'
import BetSlipMobileSingle from "./betslip/BetSlipMobileSingle";
import BetSlipMobileMultiple from "./betslip/BetSlipMobileMultiple";
import BetSlipMobileQuoteSingle from "./betslip/BetSlipMobileQuoteSingle";
import BetSlipMobileQuoteMultiple from "./betslip/BetSlipMobileQuoteMultiple";
import i18next from "i18next";



export default function BetModal(props) {
  const token = useSelector(state => state.token);
  const betslip = useSelector(state => state.betslip);
  const bets = useSelector(state => state.bets);
  const [betOrQuote, setBetOrQuote] = useState('bet');
  const [segmentMultiBetValue, setSegmentMultiBetValue] = useState("singles");
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
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
      setMinMax(res.data.data);
    })
  }


  return (
    <IonModal
      onWillDismiss={() => { props.setShowBetModal(false) }}
      isOpen={props.showBetModal}
      cssClass={`bet-modal ${themeAccent}`}
    >
      {isMobile && betslip.length > 0 &&
        <div className={`bet-modal-container ${themeAccent}`}>
          <div className="modal-bar flex">
            <p>
              {i18next.t("Betslip")}
            </p>
            <button onClick={() => props.setShowBetModal(false)} />
          </div>
          <div className="bet-modal-body">
            <IonSegment
              mode={"ios"}
              value={betOrQuote}
              className="home-top-segment"
              onIonChange={e => setBetOrQuote(e.detail.value)}
            >
              <IonSegmentButton type={"button"} value="bet">
                <IonLabel>
                  {i18next.t("Bet")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="quote">
                <IonLabel>
                  {i18next.t("Quote")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
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

            {betOrQuote === 'bet' && segmentMultiBetValue === 'singles' &&
              <BetSlipMobileSingle
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'bet' && segmentMultiBetValue === 'multiple' &&
              <BetSlipMobileMultiple
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'quote' && segmentMultiBetValue === 'singles' &&
              <BetSlipMobileQuoteSingle
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'quote' && segmentMultiBetValue === 'multiple' &&
              <BetSlipMobileQuoteMultiple
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

          </div>
        </div>
      }

      {isTablet && betslip.length > 0 &&
        <div className={`bet-modal-container tablet ${themeAccent}`}>
          <div className="bet-modal-header flex">
            <p>
              {i18next.t("Betslip")}
            </p>
            <Close className="close-card-icon" onClick={() => props.setShowBetModal(false)} />
          </div>
          <div className="bet-modal-body">
            <IonSegment
              mode={"ios"}
              value={betOrQuote}
              className="home-top-segment"
              onIonChange={(e) => setBetOrQuote(e.detail.value)}
            >
              <IonSegmentButton type={"button"} value="bet">
                <IonLabel>
                  {i18next.t("Bet")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton type={"button"} value="quote">
                <IonLabel>
                  {i18next.t("Quote")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>

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

            {betOrQuote === 'bet' && segmentMultiBetValue === 'singles' &&
              <BetSlipMobileSingle
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'bet' && segmentMultiBetValue === 'multiple' &&
              <BetSlipMobileMultiple
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'quote' && segmentMultiBetValue === 'singles' &&
              <BetSlipMobileQuoteSingle
                minMax={minMax.filter(el => el.id !== 'multiple')}
                betOrQuote={betOrQuote}
              />
            }

            {betOrQuote === 'quote' && segmentMultiBetValue === 'multiple' &&
              <BetSlipMobileQuoteMultiple
                minMax={minMax.find(el => el.id === 'multiple')}
                betOrQuote={betOrQuote}
              />
            }
          </div>
        </div>
      }
    </IonModal>
  );
}
