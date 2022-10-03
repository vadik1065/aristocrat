import React from 'react';
import { ReactComponent as PinOn } from '../../images/pin-on.svg';
import { ReactComponent as PinOff } from '../../images/pin-off.svg';
import LogoutButton from '../LogoutButton.js';
import i18next from 'i18next';

const Sidebar = (props) => {
  return (
    <div className="account-sidebar-wrapper rectangular-area-wrapper">
      <div className="account-sidebar rectangular-area flex">
        <div className="sidebar-head">
          {i18next.t("All Settings")}
        </div>
        <div className="dashboard-anchors-container">
          {props.cards &&
            <>
              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Interface")}
                </div>
                {!props.cards.interface ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, interface: !props.cards.interface })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, interface: !props.cards.interface })} />
                }
              </div>

              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Dealing")}
                </div>
                {!props.cards.dealing ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, dealing: !props.cards.dealing })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, dealing: !props.cards.dealing })} />
                }
              </div>

              {/* <div className="dashboard-anchor">
                <div>General</div>
                {!props.cards.general ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, general: !props.cards.general })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, general: !props.cards.general })} />
                }
              </div> */}

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
                  {i18next.t("Leagues")}
                </div>
                {!props.cards.leagues ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, leagues: !props.cards.leagues })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, leagues: !props.cards.leagues })} />
                }
              </div>

              <div className="dashboard-anchor">
                <div>
                  {i18next.t("Markets")}
                </div>
                {!props.cards.markets ?
                  <PinOff className="filters-icon" onClick={() => props.setCards({ ...props.cards, markets: !props.cards.markets })} /> :
                  <PinOn className="filters-icon" onClick={() => props.setCards({ ...props.cards, markets: !props.cards.markets })} />
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
            </>
          }
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar;
