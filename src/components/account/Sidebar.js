import React from 'react';
import { useLocation } from 'react-router';
import { ReactComponent as PinOn } from '../../images/pin-on.svg';
import { ReactComponent as PinOff } from '../../images/pin-off.svg';
import MyAccountTop from './account-general/MyAccountTop';
import LogoutButton from '../LogoutButton.js';
import i18next from 'i18next';



const Sidebar = (props) => {
  const location = useLocation();
  // const [pin, setPin] = useState([]);

  // const handlePin = (e, arr) => {
  //   let tempArr = arr;
  //   if (!tempArr.includes(e)) {
  //     setPin([...arr, e]);
  //   } else {
  //     tempArr.splice(tempArr.indexOf(e), 1);
  //     setPin([...tempArr]);
  //   };
  // }



  return (
    <div className="account-sidebar-wrapper rectangular-area-wrapper">
      <div className="account-sidebar rectangular-area flex">
        <MyAccountTop />
        <div className="dashboard-anchors-container">
          {location.pathname === '/account' && props.cards &&
            <>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Notifications")}
                </div>
                {!props.cards.notifications ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, notifications: !props.cards.notifications })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, notifications: !props.cards.notifications })} />
                }
              </div>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Finances & Balance")}
                </div>
                {!props.cards.finances ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, finances: !props.cards.finances })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, finances: !props.cards.finances })} />
                }
              </div>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Security settings")}
                </div>
                {!props.cards.security ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, security: !props.cards.security })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, security: !props.cards.security })} />
                }
              </div>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Edit personal information")}
                </div>
                {!props.cards.personal ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, personal: !props.cards.personal })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, personal: !props.cards.personal })} />
                }
              </div>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Change password")}
                </div>
                {!props.cards.changePassword ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, changePassword: !props.cards.changePassword })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, changePassword: !props.cards.changePassword })} />
                }
              </div>
            </>
          }
        </div>

        <LogoutButton />

      </div>
    </div>
  )
}

export default Sidebar;
