import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import useLine from '../../../hooks/useLine';
import ChValue from '../../ChValue';
import MoreLinesHandicap from '../desktop-container/MoreLinesHandicap';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import { getPrice } from '../../../utils/utils';
import useFirstTwoBetsHandicap from '../../../hooks/useFirstTwoBets';

const HandicapLineButton = (props) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(props.el.line);

  return (
    <button
      onClick={() => {
        if (props.el.status === 1) {
          props.checkSelected({
            button_id: props.el.id,
            match_id: props.el.match_id
          })
        }
      }}
      className={`card-event-cfc-left
        ${(betslip.some(elem => elem.buttonId === props.el.id) ? 'chosen' : '')} 
        ${(props.el.status !== 1 ? 'non-tradable' : '')}
      `}
    >
      {props.el.status === 1 && 
        <div className="card-event-cfc-left-label">
          {i18next.t(`H${props.el.name}`)} {line}
        </div>
      }
      {props.el.status === 1 && <div className="card-event-cfc-left-val"><ChValue value={getPrice(props.el.price, interfaceView, isComma)} /></div>}
      {props.el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
    </button>
  )
}


const MobileHandicapLineCIS = (props) => {
  const gl_bets = useSelector(state => state.bets);
  const [bets, setBets] = useState([]);
  const firstTwoBetsHandicap = useFirstTwoBetsHandicap(bets);

  useEffect(() => {
    if (gl_bets.length && props.matchId && props.marketId) {
      setBets(gl_bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
    }
  }, [gl_bets, props.matchId, props.marketId]);

  return (
    <div className="card-event-cfc-container handicap">
      {firstTwoBetsHandicap.map(button => 
        <HandicapLineButton 
          key={button.id}
          el={button}
          checkSelected={props.checkSelected}
        />
      )}

      {bets.filter(elem => elem.status === 1).length > 0 &&
        <MoreLinesHandicap
          checkSelected={props.checkSelected}
          buttons={bets}
        />
      }
    </div>
  )
}

export default MobileHandicapLineCIS;
