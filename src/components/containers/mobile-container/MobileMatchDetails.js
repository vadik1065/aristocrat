import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from "i18next";
import MobileBetMarketContainer from './MobileBetMarketContainer';
import useSortMarkets from '../../../hooks/useSortMarkets';

const MobileMatchDetails = (props) => {
  const width = useSelector(state => state.width);
  const isTablet = width <= 1024 && width > 767;
  const gl_bets = useSelector(state => state.bets);
  const sortMarkets = useSortMarkets(props.matchId);

  return (
    <>
      {props.isLarge && isTablet &&
        <div className="card-event-large-header flex">
          <div className="card-event-large-header-label">
            {i18next.t("List of bets")}
          </div>
          {/* <div className="card-event-toggle-container">
            <div className="card-event-toggle-first-label">FT</div>
            <IonToggle
              className='toggle-card full-half'
              checked={isFirstHalf}
              onIonChange={e => setFirstHalf(e.detail.checked)}
            />
            <div className="card-event-toggle-second-label">1H</div>
          </div> */}
        </div>
      }
      
      {sortMarkets
        .map((mark, i) =>
          <MobileBetMarketContainer
            key={mark}
            marketName={mark}
            marketList={gl_bets.filter(el => el.match_id === props.matchId && el.market_name === mark)}
            idx={i}
            checkSelected={props.checkSelected}
            isLarge={props.isLarge}
          />
        )
      }
    </>
  )
}

export default MobileMatchDetails;
