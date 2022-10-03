import React from 'react';
import { useSelector } from 'react-redux';
import { getPrice } from '../../../utils/utils';
import i18next from 'i18next';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import useLine from '../../../hooks/useLine';

const HandicapButtonCIS = (props) => {
  const isDesktop = useSelector(state => state.width > 1024);
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(props.button.line);

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
          {!isDesktop && i18next.t(`H${props.button.name}`)} {line}
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

export default HandicapButtonCIS;
