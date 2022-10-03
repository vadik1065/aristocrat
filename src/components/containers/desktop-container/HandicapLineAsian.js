import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import MoreLinesHandicap from './MoreLinesHandicap';
import HandicapButtonAsian from './HandicapButtonAsian';
import useFirstTwoBetsHandicap from '../../../hooks/useFirstTwoBets';

const HandicapLineAsian = (props) => {
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsHandicap = useFirstTwoBetsHandicap(bets);

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
            {i18next.t("Handicap")}
          </div>
          <div className="match-money-block">
            {firstTwoBetsHandicap.map((button, i) => 
              <HandicapButtonAsian 
                key={button.id}
                button={button}
                checkSelected={props.checkSelected}
                index={i}                
              />
            )}
            
            {bets.filter(elem => elem.status === 1).length > 0 &&
              <div className="match-money-line expand" onClick={(e) => e.stopPropagation()}>
                <MoreLinesHandicap
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

export default HandicapLineAsian;
