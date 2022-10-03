import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLive } from '../../store/actions/index.js';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { ReactComponent as Star } from '../../images/star.svg';



const DesktopFavoritesContainer = (props) => {
  const dispatch = useDispatch();
  const isDesktop = useSelector(state => state.width >= 1025);
  const [currentButton, setCurrentButton] = useState('none');
  const [toggleTime, setToggleTime] = useState('ft');

  function checkSelected(id, type, value, toggleTime) {
    if (currentButton !== value) {
      setCurrentButton(type);
      // props.setShowListOfFavorites(true);
      props.setCurrentMatchDetails(props.event.id);
    }
    if (currentButton === type) {
      setCurrentButton('none');
      // props.setShowListOfFavorites(false);
    }
    dispatch(selectLive({ id, type, value, toggleTime }));
  }

  useEffect(() => {
    if (props.dropFavorites === true) {
      setCurrentButton('none');
      // props.setShowListOfFavorites(false);
    }
  }, [props.dropFavorites]);
  function isOdd(num) { return num % 2; }



  return (
    <div
      className={`desktop-live-container event flex ${props.currentMatchDetails === props.event.id && 'selected'} ${isDesktop && isOdd(props.isodd) === 0 ? 'light-theme-gray' : ''}`}
    >
      <div className="desktop-live-container-info event flex">
        <Star className="star-icon activated" />
        <p className="team-title desktop">{props.event.team1} — {props.event.team2}</p>
        <div className="card-event-date">
          {props.event.date}
        </div>
      </div>

      <div className="desktop-live-container-bets event flex">
        <div className="money-line flex">
          {
            props.event.money_line.map((el, i) => {
              return (
                <div className={"stake flex " + (currentButton === el.type ? 'chosen' : '')} key={i}
                  onClick={(e) => checkSelected(props.event.id, el.type, el.value, toggleTime)} >
                  {el.type === 'win1' && <div className="label">1</div>}
                  {el.type === 'win2' && <div className="label">2</div>}
                  {el.type === 'win3' && <div className="label">X</div>}
                  <div className="val">{el.value}</div>
                </div>
              )
            })
          }
        </div>

        {/* <IonSegment
          mode={"ios"}
          onIonChange={e => setToggleTime(e.detail.value)}
          value={toggleTime}
          className="desktop-live-container-toggle"
        >
          <IonSegmentButton value="ft">
            <IonLabel>FT</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="1h">
            <IonLabel>1H</IonLabel>
          </IonSegmentButton>
        </IonSegment> */}
      </div>
    </div>
  )
}

export default DesktopFavoritesContainer;
