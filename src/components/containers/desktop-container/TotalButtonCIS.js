import React from 'react';
import { useSelector } from 'react-redux';
import { getPrice } from '../../../utils/utils';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';

const TotalButtonCIS = (props) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (props.button.status === 1) {
          props.checkSelected({
            button_id: props.button.id,
            match_id: props.button.match_id
          })
        }
      }}
      className={"stake flex column " +
        (betslip.some(elem => elem.buttonId === props.button.id) ? 'chosen ' : '') +
        (props.button.status === 1 ? ' tradable' : 'non-tradable')}
    >
      {props.button.status === 1 && 
        <div className="stake-text">
          {props.button.line !== null ? props.button.line : ''}
        </div>
      }
      {props.button.status === 1 && 
        <div className={"val"}>
          <ChValue value={getPrice(props.button.price, interfaceView, isComma)} />
        </div>
      }
      {props.button.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
    </div>
  )
}

export default TotalButtonCIS;
