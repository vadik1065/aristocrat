import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PersonalInputs from './account-general/PersonalInputs';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { IonBackButton, IonRippleEffect } from '@ionic/react';
import * as API from '../../api/functions.js';
import { getUserInfo, toggleToastText, toggleToast } from '../../store/actions';
import i18next from 'i18next';

const Personal = (props) => {
   const token = useSelector(state => state.token);
   const dispatch = useDispatch();
   const width = useSelector(state => state.width);
   const isDesktop = width >= 1025;
   const isTablet = width <= 1024 && width >= 601;
   const isMobile = width <= 600;
   const title = i18next.t("Edit personal information");

   const [open, setOpen] = useState(true);
   const [check, setCheck] = useState({
      email: '',
      countryCode: '',
      phone: '',
      firstName: '',
      lastName: '',
   });
   const user = useSelector(
      ({ user }) => ({
         email: user.email,
         countryCode: user.countryCode,
         phone: user.phone,
         firstName: user.first_name,
         lastName: user.last_name,
      })
   );

   function changeProfile() {
      let obj = {
         countryCode: check.countryCode,
         phone: check.phone,
         first_name: check.firstName,
         last_name: check.lastName,
      };
      if (user.email !== check.email) {
         obj.email = check.email
      };
      API.updateProfile(token, obj).then(() => {
         API.getInfo(token).then(response => {
            dispatch(getUserInfo(response));
            dispatch(toggleToastText('Your personal data was updated.'));
            dispatch(toggleToast(true))
         })
      })
   }

   useEffect(() => {
      setCheck({
         ...check,
         email: user.email,
         countryCode: user.countryCode,
         phone: user.phone,
         firstName: user.firstName,
         lastName: user.lastName,
      });
   }, [user.phone]);


   return (
      <div className="rectangular-area-wrapper small">
         <div className={(open ? "open " : "close ") +
            (!props.cards.finances && !props.cards.security ? 'small-user-settings-card ' : '') +
            (isMobile ? "account-mobile-container " : "") +
            "rectangular-area"}
         >

            {/* Headers */}

            {isDesktop &&
               <div className="dashboard-head">
                  <span>{title}</span>
                  <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, personal: false })} />
               </div>
            }

            {isMobile &&
               <div className='back-container'>
                  <IonBackButton defaultHref="/account" text={i18next.t("Back")} />
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



            {/* Body */}

            <div className={(isMobile ? "dashboard-body-mobile " : "") + "dashboard-body"}>
               <PersonalInputs check={check} setCheck={setCheck} user={user} changeProfile={changeProfile} />
            </div>

            {(user.email !== check.email || user.countryCode !== check.countryCode ||
               user.phone !== check.phone || user.firstName !== check.firstName || user.lastName !== check.lastName)
               &&
               <div onClick={() => changeProfile()} className="take-loan settings-save-btn ion-activatable">
                  <IonRippleEffect />
                  {i18next.t("Save changes")}
               </div>
            }
         </div>
      </div>
   )
}

export default Personal;
