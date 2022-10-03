import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
// import InterfaceMobile from './interface/InterfaceMobile';
import InterfaceDesignMode from './interface/InterfaceDesignMode';
import InterfaceAccentColor from './interface/InterfaceAccentColor';
import InterfaceTimezone from './interface/InterfaceTimezone';
import InterfaceChat from './interface/InterfaceChat';
import { IonBackButton } from '@ionic/react';
import i18next from 'i18next';
import InterfaceDesignHeader from './interface/InterfaceDesignHeader';

const Interface = (props) => {
   const themeMob = [
      'Solid color with logo',
      'Solid color without logo',
      'Linear Gradient'
   ]

   const width = useSelector(state => state.width);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("Interface");

   const [open, setOpen] = useState(true);



   return (
      <div className="rectangular-area-wrapper set-big set-interface">
         <div className={(open === true ? "open " : "close ") + "rectangular-area"}>
            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, interface: false })} />
               </div>
            }

            {isMobile &&
               <div className='back-container'>
                  <IonBackButton defaultHref="/settings" text={i18next.t("Back")} />
               </div>
            }

            {isTablet &&
               <div
                  className="dashboard-head-tablet"
                  onClick={() => setOpen(!open)}
               >
                  <span>{title}</span>
                  <ArrowIcon className="fold-icon" />
               </div>
            }

            {isMobile &&
               <div className="dashboard-head-mobile">{title}</div>
            }

            <div className="dashboard-body">
               {/* {isMobile && <InterfaceMobile themeMob={themeMob} />} */}
               <InterfaceDesignHeader />
               <InterfaceDesignMode />
               <InterfaceAccentColor />
               <InterfaceTimezone />
               <InterfaceChat />
            </div>
         </div>
      </div >
   )
}

export default Interface;
