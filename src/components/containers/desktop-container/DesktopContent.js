import React, { useState } from 'react';
import { IonContent, useIonViewWillLeave } from '@ionic/react';
import DesktopLeftBar from '../../DesktopLeftBar';
import DesktopRightBarContainer from '../../DesktopRightBarContainer';
import ListOfBets from '../../ListOfBets';
import DesktopMainWrapper from './DesktopMainWrapper';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const DesktopContent = (props) => {
  const location = useLocation();
  const lob = useSelector(state => state.lob);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [currentMatchDetails, setCurrentMatchDetails] = useState(null);

  useIonViewWillLeave(() => {
    setCurrentMatchDetails(null);
  });

  return (
    <IonContent className='desktop-main-page' id="main">
      <div className={`main-big ${themeAccent} ${props.favPage ? 'favorites-page' : ''}`}>
        {!props.favPage && <DesktopLeftBar setSegmentValue={props.setSegmentValue} />}

        {location.pathname === '/home' && 
          <div className="desktop-home-page-wrapper">
            {/* LIVE */}
            <DesktopMainWrapper
              matchstatus={2} 
              setCurrentMatchDetails={setCurrentMatchDetails}
              currentMatchDetails={currentMatchDetails}
            />

            {/* PREMATCH */}
            <DesktopMainWrapper
              matchstatus={1} 
              setCurrentMatchDetails={setCurrentMatchDetails}
              currentMatchDetails={currentMatchDetails}
            />
          </div>
        }

        {location.pathname !== '/home' && 
          <DesktopMainWrapper 
            matchstatus={props.matchstatus} 
            setCurrentMatchDetails={setCurrentMatchDetails}
            currentMatchDetails={currentMatchDetails}
            segmentValue={props.segmentValue}
            setSegmentValue={props.setSegmentValue}
          />
        }

        {lob && <ListOfBets />}

        <DesktopRightBarContainer />
      </div>
    </IonContent>
  )
}

export default DesktopContent;
