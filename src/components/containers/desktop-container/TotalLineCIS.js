import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MoreLinesTotal from './MoreLinesTotal';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import useFirstTwoBetsTotal from '../../../hooks/useFirstTwoBetsTotal';
import TotalButtonCIS from './TotalButtonCIS';

const TotalLineCIS = (props) => {
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsTotal = useFirstTwoBetsTotal(bets);

  useEffect(() => {
    if (gl_bets.length && props.matchId && props.marketId) {
      setBets(gl_bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
    }
  }, [gl_bets, props.matchId, props.marketId]);

  return (
    <div className="teams-to-score flex">
      {firstTwoBetsTotal.map(button => 
        <TotalButtonCIS
          key={button.id}
          button={button}
          checkSelected={props.checkSelected} 
        />
      )}

      {bets.length > 0 && 
        bets.filter(elem => elem.status === 1).length === 0 && 
          [0, 1].map((el, i) => {
            return (
              <div key={i}
                onClick={(e) => e.stopPropagation()}
                className={"with-lock stake flex non-tradable"}>
                <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />
              </div>
            )
          })
      }

      {bets.filter(elem => elem.status === 1).length > 0 &&
        <MoreLinesTotal
          link={props.link}
          checkSelected={props.checkSelected}
          buttons={bets}
        />
      }

      {(bets.length === 0 || bets.filter(elem => elem.status === 1).length === 0) &&
        <div className='more-lines-container'></div>
      }
    </div>
  )
}

export default TotalLineCIS;
