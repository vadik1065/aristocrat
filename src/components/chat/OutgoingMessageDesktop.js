import React from 'react';
import details from "../../images/details.svg";
import checkmark from "../../images/checkmark.svg";
import { useSelector } from 'react-redux';
import { getTime } from '../../utils/utils';



const OutgoingMessageDesktop = (props) => {
  const fontSize = useSelector(state => state.settings.fontSize);
  const timeZone = useSelector(state => state.settings.timeZone);

  return (
    <div className={`desktop-outgoing-message-container`}>
      <div className={`desktop-outgoing-message-top flex ${fontSize}`}>
        <img src={details} className="desktop-outgoing-details" alt="details" />
        <div 
          className={`desktop-text-container text-container ${fontSize} ${props.searchText && props.searchText.length > 1 && props.text.includes(props.searchText) ? 'found' : ''}`} 
          ref={props.setRef(props.text)}
        >
          {props.text}
        </div>
        <img src={checkmark} className="desktop-outgoing-status" alt="checkmark" />
      </div>
      <div className={`desktop-message-time ${fontSize}`}>{getTime(props.time, timeZone)}</div>
    </div>
  )
}

export default OutgoingMessageDesktop;
