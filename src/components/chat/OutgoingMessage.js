import React from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Tail } from '../../images/Tail.svg';
import { getTime } from '../../utils/utils';



const OutgoingMessage = (props) => {
  const fontSize = useSelector(state => state.settings.fontSize);
  const timeZone = useSelector(state => state.settings.timeZone);

  return (
    <div className={`outgoing-message ${fontSize}`}>
      <Tail className="tail" />
      <div className={`message-text ${fontSize}`}>{props.text}</div>
      <div className={`message-time ${fontSize}`}>{getTime(props.time, timeZone)}</div>
    </div>
  )
}

export default OutgoingMessage;
