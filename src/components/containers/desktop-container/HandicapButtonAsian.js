import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPrice } from '../../../utils/utils';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';

const HandicapButtonAsian = (props) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const [line, setLine] = useState('');

  useEffect(() => {
    if (props.button.line !== null) {
      let result = Math.abs(props.button.line.split(' ')[0]);
      setLine(result);
    }
  }, [props.button]);

  return (
    <div
      className={"match-money-line " +
        (betslip.some(elem => elem.buttonId === props.button.id) ? 'chosen ' : '') +
        (props.button.status === 1 ? ' tradable ' : ' non-tradable ')}
      onClick={(e) => {
        e.stopPropagation();
        if (props.button.status === 1) {
          props.checkSelected({
            button_id: props.button.id,
            match_id: props.button.match_id
          })
        }
      }}
    >
      {props.button.status === 1 && 
        <div className="match-money-label">
          {props.index % 2 == 0 && line}
        </div>
      }
      {props.button.status === 1 && 
        <div className={`match-money-icon ${props.button.line !== null && props.button.line.split(' ')[0].substring(0, 1) == '-' ? 'blue' : 'red'}`}>
          {props.button.line !== null && props.button.line.split(' ')[0].substring(0, 1) == '-' ? '—' : '+'}
        </div>
      }
      {props.button.status === 1 && 
        <div className="match-money-value">
          <ChValue value={getPrice(props.button.price, interfaceView, isComma)} />
        </div>
      }
      {props.button.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
    </div>
  )
}

export default HandicapButtonAsian;
