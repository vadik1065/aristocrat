import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import DealingView from './dealing/DealingView';
import DealingBets from './dealing/DealingBets';
import DealingPreferences from './dealing/DealingPreferences';
import DealingHandicaps from './dealing/DealingHandicaps';
import DealingChartsView from './dealing/DealingChartsView';
import { IonBackButton } from '@ionic/react';
import i18next from 'i18next';


const Dealing = (props) => {
   const betsPresetsRadio = [
      'Always use 0 as default bet',
      'Set Maximum bet amount',
      'Set last bet amount',
   ]

   const width = useSelector(state => state.width);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("Dealing");

   const [open, setOpen] = useState(true);



   return (
      <div className="rectangular-area-wrapper set-big">
         <div className={(open === true ? "open " : "close ") + "rectangular-area"}>
            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, dealing: false })} />
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

            <div className="dashboard-body dealing-settings">
               <div className="dashboard-body-inner">
                  <div className="dealing-settings-view">
                     <DealingView />
                     <DealingBets />
                  </div>
                  {/* <DealingPreferences betsPresetsRadio={betsPresetsRadio} /> */}
                  <DealingHandicaps />
                  <DealingChartsView />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Dealing;
