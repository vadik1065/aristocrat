import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from "i18next";
import Loader from '../../Loader';
import MobileMoneyLineCIS from './MobileMoneyLineCIS';
import MobileHandicapLineCIS from './MobileHandicapLineCIS';
import MobileTotalLineCIS from './MobileTotalLineCIS';
import MobileMatchDetails from './MobileMatchDetails';
import { ReactComponent as ArrowRight } from '../../../images/arrow-r.svg';
import { ReactComponent as ArrowUp } from '../../../images/arrow.svg';
import MoneyLineClassic from '../desktop-container/MoneyLineClassic';
import HandicapLineClassic from '../desktop-container/HandicapLineClassic';
import TotalLineClassic from '../desktop-container/TotalLineClassic';
import HandicapLineAsian from '../desktop-container/HandicapLineAsian';
import TotalLineAsian from '../desktop-container/TotalLineAsian';

const SplitPane = (props) => {
  return (
    <>
      {props.markets.map((market, i) => {
        return (
          <market.component
            key={i}
            matchId={market.matchId}
            marketId={market.marketId}
            checkSelected={props.checkSelected}
          />
        )
      })}
    </>
  )
}

const MobileMatchContainerBets = (props) => {
  const dealing = useSelector(state => state.settings.dealingView);
  const matches = useSelector(state => state.matches);
  const [matchMarket, setMatchMarket] = useState([]);
  const [marketsCIS, setMarketsCIS] = useState([]);
  const [marketsClassic, setMarketsClassic] = useState([]);
  const [marketsAsian, setMarketsAsian] = useState([]);

  useEffect(() => {
    if (props.matchId && matches.some(el => el.id === props.matchId)) {
      setMatchMarket(matches.find(el => el.id === props.matchId).markets);
    }
  }, [matches, props.matchId]);

  useEffect(() => {
    if (matchMarket.length) {
      setMarketsCIS([
        { 
          component: MobileMoneyLineCIS, 
          matchId: props.matchId, 
          marketId: matchMarket.find(mark => mark === "1X2") !== undefined ? matchMarket.find(mark => mark === "1X2") : matchMarket.find(mark => mark === "12")
        },
        { component: MobileHandicapLineCIS, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
        { component: MobileTotalLineCIS, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Under/Over') }
      ]);

      setMarketsClassic([
        { 
          component: MoneyLineClassic, 
          matchId: props.matchId, 
          marketId: matchMarket.find(mark => mark === "1X2") !== undefined ? matchMarket.find(mark => mark === "1X2") : matchMarket.find(mark => mark === "12")
        },
        { component: HandicapLineClassic, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
        { component: TotalLineClassic, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Under/Over') }
      ]);

      setMarketsAsian([
        { 
          component: MoneyLineClassic, 
          matchId: props.matchId, 
          marketId: matchMarket.find(mark => mark === "1X2") !== undefined ? matchMarket.find(mark => mark === "1X2") : matchMarket.find(mark => mark === "12")
        },
        { component: HandicapLineAsian, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
        { component: TotalLineAsian, matchId: props.matchId, marketId: matchMarket.find(mark => mark === 'Under/Over') }
      ]);
    }
  }, [matchMarket]);
  
  return (
    <>
      <div className="stakes-line flex">
        <>
          {!props.isLarge && marketsCIS.length > 0 && dealing === "cis" && 
            <SplitPane
              markets={marketsCIS}
              checkSelected={props.checkSelected}
            />
          }
          
          {!props.isLarge && marketsClassic.length > 0 && dealing === "classic" && 
            <>
              <div className="match-money-wrapper">
                <SplitPane
                  markets={marketsClassic}
                  checkSelected={props.checkSelected}
                />
                <div 
                  className="match-all-bets-btn"
                  onClick={() => props.toggleAllBets()}
                >
                  {i18next.t("All bets")}
                </div>
              </div>
            </>
          }

          {!props.isLarge && marketsClassic.length > 0 && dealing === "asian" && 
            <>
              <div className="match-money-wrapper">
                <SplitPane
                  markets={marketsAsian}
                  checkSelected={props.checkSelected}
                />
                <div 
                  className="match-all-bets-btn"
                  onClick={() => props.toggleAllBets()}
                >
                  {i18next.t("All bets")}
                </div>
              </div>
            </>
          }
              
          {props.isLarge && 
            <MobileMatchDetails
              matchId={props.matchId}
              checkSelected={props.checkSelected}
              isLarge={props.isLarge}
            />
          }
        </>
      </div>

      {(dealing === "cis" || props.isLarge) &&
        <div className="card-event-bottom-container">
          {!props.isLarge &&
            <p onClick={() => props.toggleAllBets()} className="card-event-href">
              {i18next.t("All bets")}
              <ArrowRight className="arrow-right" />
            </p>
          }
          {props.isLarge &&
            <p onClick={() => props.toggleAllBets()} className="card-event-href close-card">
              <ArrowUp className="arrow-up" />
              {i18next.t("Hide")}
            </p>
          }
        </div>
      }

      <Loader loader={props.isLoading}></Loader>
    </>
  )
}

export default MobileMatchContainerBets;
