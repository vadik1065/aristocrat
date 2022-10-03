import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import TotalButtonAsian from './TotalButtonAsian';
import useFirstTwoBetsTotal from '../../../hooks/useFirstTwoBetsTotal';
import MoreLinesTotal from './MoreLinesTotal';

const TotalLineAsian = (props) => {
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsTotal = useFirstTwoBetsTotal(bets);

  useEffect(() => {
    if (gl_bets.length && props.matchId && props.marketId) {
      setBets(gl_bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
    }
  }, [gl_bets, props.matchId, props.marketId]);

  return (
    <>
      {bets.filter(elem => elem.status === 1).length > 0 &&
        <div className="match-money-container handicap">
          <div className="match-money-header">
            {i18next.t("Total")}
          </div>
          <div className="match-money-block">
            {firstTwoBetsTotal.map((button, i) => 
              <TotalButtonAsian
                key={button.id}
                button={button}
                checkSelected={props.checkSelected}
                index={i}                
              />
            )}
            
            {bets.filter(elem => elem.status === 1).length > 0 &&
              <div className="match-money-line expand" onClick={(e) => e.stopPropagation()}>
                <MoreLinesTotal
                  link={props.link}
                  checkSelected={props.checkSelected}
                  buttons={bets}
                />
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default TotalLineAsian;
