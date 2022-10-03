import React, { useEffect, useState } from 'react';
import { getPrice, sortMoneyLineBets } from '../../../utils/utils';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import { useSelector } from 'react-redux';

const MobileMoneyLineCIS = (props) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    if (props.matchId && props.marketId && gl_bets.length) {
      setBets(gl_bets.filter(el => el.match_id == props.matchId && el.market_name == props.marketId));
    }
  }, [gl_bets, props.matchId]);

  return (
    <div className="card-event-cfc-container money-line">
      {sortMoneyLineBets(bets).map(el =>
        <button
          key={el.id}
          onClick={() => {
            if (el.status === 1) {
              props.checkSelected({
                button_id: el.id,
                match_id: el.match_id
              })
            }
          }}
          className={`card-event-cfc-left ` +
            (betslip.some(elem => elem.buttonId === el.id) ? ' chosen ' : '') +
            (el.status !== 1 ? 'non-tradable' : '')}
        >
          {el.status === 1 &&
            <div className="card-event-cfc-left-label">{el.name}</div>
          }
          {el.status === 1 &&
            <div className="card-event-cfc-left-val">
              <ChValue value={getPrice(el.price, interfaceView, isComma)} />
            </div>
          }
          {el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
        </button>
      )}
    </div>
  )
}

export default MobileMoneyLineCIS;
