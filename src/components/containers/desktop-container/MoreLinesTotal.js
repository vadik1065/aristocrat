import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import { ReactComponent as Arrows } from '../../../images/arrows.svg';
import { IonPopover } from '@ionic/react';
import TotalButtonCIS from './TotalButtonCIS';

const MoreLinesDropdown = (props) => {
  return (
    <div className={`more-lines-dropdown open`} onClick={(e) => e.stopPropagation()} >
      <div className='flex more-lines-header'>
        <p>{i18next.t("Under")}</p>
        <p>{i18next.t("Over")}</p>
      </div>
      <div className="left-column">
        {props.buttons
          .filter(mark => mark.name == 'Under')
          .sort((a, b) => a.line - b.line)
          .map(button => 
            <TotalButtonCIS 
              key={button.id}
              button={button}
              checkSelected={props.checkSelected}
            />
          )}
      </div>
      <div className="right-column">
        {props.buttons
          .filter(mark => mark.name == 'Over')
          .sort((a, b) => a.line - b.line)
          .map(button => 
            <TotalButtonCIS 
              key={button.id}
              button={button}
              checkSelected={props.checkSelected}
            />
          )}
      </div>
    </div>
  )
}

const MoreLinesTotal = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const dealing = useSelector(state => state.settings.dealingView);
  const [openOnDesktop, setOpenOnDesktop] = useState(false);
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  function openLines(e) {
    e.stopPropagation();
    setOpenOnDesktop(true)
  };

  function clickOutside(event) {
    const modal = document.getElementById('modalLines');
    if (modal !== null && !modal.contains(event.target)) {
      setOpenOnDesktop(false)
    }
  }

  useEffect(() => {
    if (openOnDesktop) {
      document.addEventListener('click', clickOutside);
    }
    return () => {
      document.removeEventListener('click', clickOutside);
    }
  }, [openOnDesktop])

  return (
    <>
      <div 
        id='modalLines' 
        onClick={(e) => {
          e.stopPropagation();
          e.persist();
          setShowPopover({ showPopover: true, event: e })
        }}
        className={`more-lines-container ${dealing}`}
      >
        {dealing === 'cis' && <Arrow className='pic-right bet-arrow' />}
        {(dealing === 'classic' || dealing === 'asian') && <Arrows className='pic-right' />}
      </div>

      <IonPopover
        mode="ios"
        cssClass={`more-lines-popover ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''} ${themeAccent}`}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        <MoreLinesDropdown
          buttons={props.buttons}
          checkSelected={props.checkSelected}
        />
      </IonPopover>
    </>
  );
}

export default MoreLinesTotal;
