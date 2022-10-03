import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import { ReactComponent as Arrows } from '../../../images/arrows.svg';
import HandicapButtonCIS from './HandicapButtonCIS';
import { IonPopover } from '@ionic/react';

const MoreLinesDropdown = (props) => {
  return (
    // <div className={`more-lines-dropdown ${(props.openOnDesktop || !props.isDesktop) ? 'open' : ''}`}>
    <div className={`more-lines-dropdown open`} onClick={(e) => e.stopPropagation()} >
      <div className='flex more-lines-header'>
        <p>{i18next.t("H1")}</p>
        <p>{i18next.t("H2")}</p>
      </div>
      <div className="left-column">
        {props.buttons
          .filter(mark => mark.name == 1)
          .sort((a, b) => a.line.split(' ')[0] - b.line.split(' ')[0])
          .map(button => 
            <HandicapButtonCIS 
              key={button.id}
              button={button}
              checkSelected={props.checkSelected}
            />
          )}
      </div>
      <div className="right-column">
        {props.buttons
          .filter(mark => mark.name == 2)
          .sort((a, b) => b.line.split(' ')[0] - a.line.split(' ')[0])
          .map(button => 
            <HandicapButtonCIS 
              key={button.id}
              button={button}
              checkSelected={props.checkSelected}
            />
          )}
      </div>
    </div>
  )
}

const MoreLinesHandicap = (props) => {
  const width = useSelector(state => state.width);
  const isDesktop = width > 1024;
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
      {/* {isDesktop && 
        <div 
          id='modalLines' 
          onClick={(e) => openLines(e)}
          className={`more-lines-container ${dealing}`}
        >
          {dealing === 'cis' && <Arrow className='pic-right bet-arrow' />}
          {dealing === 'classic' && <Arrows className='pic-right' />}

          <MoreLinesDropdown
            buttons={props.buttons}
            checkSelected={props.checkSelected}
            openOnDesktop={openOnDesktop}
            isDesktop={isDesktop}
          />
        </div>
      } */}

      {/* {!isDesktop &&
        <> */}
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
        {/* </>
      } */}
    </>
  );
}

export default MoreLinesHandicap;
