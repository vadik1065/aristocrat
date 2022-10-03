import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import MoreLinesTotal from './MoreLinesTotal';
import useFirstTwoBetsTotal from '../../../hooks/useFirstTwoBetsTotal';
import TotalButtonClassic from './TotalButtonClassic';


const TotalLineClassic = (props) => {
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
        <div className="match-money-container underover">
          <div className="match-money-header">
            {i18next.t("Total")}
          </div>
          <div className="match-money-block ">
            {firstTwoBetsTotal.map(button => 
              <TotalButtonClassic 
                key={button.id}
                button={button}
                checkSelected={props.checkSelected}
              />
            )}

            {bets.filter(elem => elem.status === 1).length > 0 &&
              <div className="match-money-line expand">
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

export default TotalLineClassic;
