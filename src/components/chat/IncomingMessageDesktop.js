import React from 'react';
import { ReactComponent as Userpic } from '../../images/userpic.svg';
import details from "../../images/details.svg";
import { useSelector } from 'react-redux';
import { getTime } from '../../utils/utils';



const IncomingMessageDesktop = (props) => {
  const fontSize = useSelector(state => state.settings.fontSize);
  const timeZone = useSelector(state => state.settings.timeZone);

  return (
    <div className="desktop-incoming-message-container">
      <div className={`desktop-incoming-message-top flex ${fontSize}`}>
        <div className="desktop-incoming-avatar flex">
          <Userpic />
        </div>
        <div 
          className={`desktop-incoming-text-container text-container ${fontSize} ${props.searchText && props.searchText.length > 1 && props.text.includes(props.searchText) ? 'found' : ''}`}
          ref={props.setRef(props.text)}
        >
          {props.text}
        </div>
        <img src={details} className="desktop-incoming-details" alt="details" />
      </div>
      <div className={`desktop-message-time ${fontSize}`}>{getTime(props.time, timeZone)}</div>
    </div>
  )
}

export default IncomingMessageDesktop;
