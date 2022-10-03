import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MoreLinesHandicap from './MoreLinesHandicap';
import HandicapButtonCIS from './HandicapButtonCIS';
import useFirstTwoBetsHandicap from '../../../hooks/useFirstTwoBets';

const HandicapLineCIS = (props) => {
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsHandicap = useFirstTwoBetsHandicap(bets);

  useEffect(() => {
    if (gl_bets.length && props.matchId && props.marketId) {
      setBets(gl_bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
    }
  }, [gl_bets, props.matchId, props.marketId]);

  return (
    <div className="teams-to-score handicap flex">
      {firstTwoBetsHandicap.map(button => 
        <HandicapButtonCIS 
          key={button.id}
          button={button}
          checkSelected={props.checkSelected}
        />
      )}

      {bets.filter(elem => elem.status === 1).length > 0 &&
        <MoreLinesHandicap
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

export default HandicapLineCIS;
