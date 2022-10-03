import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import MoneyLine from './MoneyLine';
import HandicapLineCIS from './HandicapLineCIS';
import TotalLineCIS from './TotalLineCIS';
import MoneyLineClassic from './MoneyLineClassic';
import HandicapLineClassic from './HandicapLineClassic';
import TotalLineClassic from './TotalLineClassic';
import { ReactComponent as ArrowRight } from '../../../images/arrow-right2.svg'
import HandicapLineAsian from './HandicapLineAsian';
import TotalLineAsian from './TotalLineAsian';


const SplitPane = (props) => {
  return (
    <div className="desktop-live-container-bets flex">
      {props.markets.map((market, i) => {
        const { Component } = market;
        return (
          <Component
            key={i}
            matchId={market.matchId}
            marketId={market.marketId}
            checkSelected={props.checkSelected}
          />
        )
      })}
    </div>
  )
}

const MatchContainerBets = (props) => {
  const dealing = useSelector(state => state.settings.dealingView);
  const matches = useSelector(state => state.matches);
  const [matchMarket, setMatchMarket] = useState([]);
  let link1X2 = matchMarket.find(mark => mark === "1X2");
  let link12 = matchMarket.find(mark => mark === "12");

  useEffect(() => {
    if (matches.some(el => el.id === props.link)) {
      setMatchMarket(matches.find(el => el.id === props.link).markets);
    }
  }, [matches]);

  const marketsCIS = [
    { Component: MoneyLine, matchId: props.link, marketId: link1X2 !== undefined ? link1X2 : link12 },
    { Component: HandicapLineCIS, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
    { Component: TotalLineCIS, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Under/Over') }
  ];

  const marketsClassic = [
    { Component: MoneyLineClassic, matchId: props.link, marketId: link1X2 !== undefined ? link1X2 : link12 },
    { Component: HandicapLineClassic, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
    { Component: TotalLineClassic, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Under/Over') }
  ];


  const marketsAsian = [
    { Component: MoneyLineClassic, matchId: props.link, marketId: link1X2 !== undefined ? link1X2 : link12 },
    { Component: HandicapLineAsian, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Asian Handicap') },
    { Component: TotalLineAsian, matchId: props.link, marketId: matchMarket.find(mark => mark === 'Under/Over') }
  ];


  return <>
    {dealing === "cis" && <>
      <SplitPane
        markets={marketsCIS}
        checkSelected={props.checkSelected}
      />
    </>
    }

    {dealing === "classic" && <>
      <div className="match-money-wrapper">
        <SplitPane
          markets={marketsClassic}
          checkSelected={props.checkSelected}
        />
      </div>
      <div className="match-all-bets-btn">
        {i18next.t("All bets")}
      </div>
    </>
    }

    {dealing === "asian" && <>
      <div className="match-money-wrapper">
        <SplitPane
          markets={marketsAsian}
          checkSelected={props.checkSelected}
        />
      </div>
      <div className="match-money-buttons">
        <div className="match-all-bets-btn">
          {i18next.t("All bets")}
          <ArrowRight />
        </div>
      </div>
    </>
    }
  </>
}

export default MatchContainerBets;
