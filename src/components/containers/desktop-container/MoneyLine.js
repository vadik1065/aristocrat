import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sortMoneyLineBets } from '../../../utils/utils';
import SingleButton from './SingleButton';

const MoneyLine = (props) => {
  const bets = useSelector(state => state.bets.filter(el => el.match_id == props.matchId && el.market_name == props.marketId));
  // const [bets, setBets] = useState([]);

  // useEffect(() => {
  //   if (gl_bets && props.marketId) {
  //     console.log(666);
  //     setBets(gl_bets.filter(el => el.match_id == props.matchId && el.market_name == props.marketId));
  //   }
  // }, [gl_bets, props.marketId]);

  return (
    <div className="money-line flex">
      {sortMoneyLineBets(bets).map(el => {
        return (
          <SingleButton
            key={el.id} 
            button={el}
            checkSelected={props.checkSelected}
          />
        )
      })}
    </div>
  )
}

export default MoneyLine;
