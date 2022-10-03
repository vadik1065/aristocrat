import React, { useEffect, useState } from 'react';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import { getPrice } from '../../../utils/utils';
import i18next from "i18next";
import MoreLinesTotal from '../desktop-container/MoreLinesTotal';
import { useSelector } from 'react-redux';
import useFirstTwoBetsTotal from '../../../hooks/useFirstTwoBetsTotal';

const MobileTotalLineCIS = (props) => {
  // const bets = useSelector(state => state.bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsTotal = useFirstTwoBetsTotal(bets);

  useEffect(() => {
    if (gl_bets.length && props.matchId && props.marketId) {
      setBets(gl_bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
    }
  }, [gl_bets, props.matchId, props.marketId]);

  return (
    <div className="card-event-cfc-container total">
      {firstTwoBetsTotal.map(el => 
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
          className={`card-event-cfc-left
            ${(betslip.some(elem => elem.buttonId === el.id) ? 'chosen' : '')} 
            ${(el.status !== 1 ? 'non-tradable' : '')}
          `}
        >
          {el.status === 1 && 
            <div className="card-event-cfc-left-label">
              {el.name} {el.line !== null ? el.line : ''}
            </div>
          }
          {el.status === 1 && <div className="card-event-cfc-left-val"><ChValue value={getPrice(el.price, interfaceView, isComma)} /></div>}
          {el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
        </button>
      )}

      {bets.filter(elem => elem.status === 1).length > 0 &&
        <MoreLinesTotal
          checkSelected={props.checkSelected}
          buttons={bets}
        />
      }
    </div>
  )
}

export default MobileTotalLineCIS;
