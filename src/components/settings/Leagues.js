import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { IonBackButton } from '@ionic/react';
import LeaguesModal from './LeaguesModal';
import i18next from 'i18next';


const Leagues = (props) => {
   const gamesList = [
      {
         image: 'soccer.png',
         name: 'Soccer',
      },
      {
         image: 'baseball.png',
         name: 'Baseball',
      },
      {
         image: 'tennis.png',
         name: 'Tennis',
      },
      {
         image: 'basketball.png',
         name: 'Basketball',
      },
      {
         image: 'voleyball.png',
         name: 'Voleyball',
      },
      {
         image: 'football.png',
         name: 'Football',
      },
   ]

   const width = useSelector(state => state.width);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("Leagues");

   const [open, setOpen] = useState(true);
   const [showLeaguesModal, setShowLeaguesModal] = useState(false);



   return (
      <div className="rectangular-area-wrapper set-small">
         <div className={(open === true ? "open " : "close ") + "rectangular-area"}>
            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, leagues: false })} />
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
               <div className="dashboard-body-inner leagues-games-list">

                  {gamesList.map((game, i) => {
                     return (
                        <div key={i} className="leagues-games-item" onClick={() => setShowLeaguesModal(true)} >
                           <div className="leagues-games-image">
                              <img src={require(`../../images/games-icons/${game.image}`)} alt="logo" />
                           </div>
                           <div className="leagues-games-label">
                              <div className="leagues-games-name">{game.name}</div>
                              <div className="leagues-games-points">5&nbsp;of&nbsp;5</div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
         <LeaguesModal open={showLeaguesModal} close={setShowLeaguesModal} />
      </div>
   )
}

export default Leagues;
