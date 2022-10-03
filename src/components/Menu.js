import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../api/functions.js';
import { changeMenu, changeTheme, setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../store/actions/index.js';
import {
  IonMenu, IonContent, IonFooter, IonSegment,
  IonSegmentButton, IonLabel
} from '@ionic/react';
import { Link, useLocation } from 'react-router-dom';
import { menuController } from "@ionic/core";
// Components
import SystemSettings from './old-settings/SystemSettings.js';
import MarketsSettings from './old-settings/MarketsSettings.js';
import LeaguesSettings from './old-settings/LeaguesSettings.js';
import LogoutButton from './LogoutButton.js';
// CSS
import '../css/menu.css';
// Icons
import searchIcon from '../images/header-icons/loupe.png';
import themeImg from '../images/header-icons/theme.png';
import settingsIcon from '../images/header-icons/settings.png';
import i18next from 'i18next';
import useSetTheme from '../hooks/useSetTheme.js';
// import { ReactComponent as LightThemeIcon } from '../images/header-icons/night.svg';
// import { ReactComponent as DarkThemeIcon } from '../images/header-icons/day.svg';
// import { ReactComponent as SettingsIcon } from '../images/settings.svg';



const Menu = ({ pagesWithoutBars }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const menuState = useSelector(state => state.menuState);
  const [settingsSegmentValue, setSettingsSegmentValue] = useState('system');
  const [menuMode, setMenuMode] = useState('default');
  const { setTheme } = useSetTheme();
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const isSmallWidth = useSelector(state => state.width <= 1380);
  const pagesArr = pagesWithoutBars.filter(page => location.pathname == page);

  return <>
    {isSmallWidth && pagesArr.length == 0 &&
      <IonMenu
        className={`main-menu ${themeAccent}`}
        onIonDidClose={() => { setMenuMode('default') }}
        onIonWillClose={() => { menuState !== false && dispatch(changeMenu(false)) }}
        side="start"
        contentId="main"
      >
        <IonContent>
          <div className="menu-upper">
            <div className='menu-buttons-container'>
              <div
                // className={'menu-buttons-wrapper ' + (menuMode.toString() === 'search' ? 'picked' : '')}
                className={'menu-buttons-wrapper'}
              >
                <div
                  onClick={() => { menuMode !== 'search' ? setMenuMode('search') : setMenuMode('') }}
                  className="menu-search"
                >
                  {/* <SearchIcon /> */}
                  <img src={searchIcon} alt="search" />
                </div>
              </div>
              <div
                // className={'menu-buttons-wrapper ' + (menuMode.toString() === 'colors' ? 'picked' : '')}
                className={'menu-buttons-wrapper'}
              >
                <div
                  onClick={() => setTheme()}
                  className="menu-theme-color"
                >
                  <img src={themeImg} alt="theme" />
                  {/* <ThemeIcon /> */}
                  {/* {themeIcon === true ? <DarkThemeIcon /> : <LightThemeIcon />} */}
                </div>
              </div>
              <div
                // className={'menu-buttons-wrapper ' + (menuMode.toString() === 'settings' ? 'picked' : '')}
                className={'menu-buttons-wrapper'}
              >
                {/* <div
                  onClick={() => { menuMode !== 'settings' ? setMenuMode('settings') : setMenuMode('') }}
                  className="menu-settings"
                >
                  <img src={settingsIcon} alt="settings" />
                </div> */}

                <Link to="/settings" >
                  <div onClick={() => menuController.toggle('start')}>
                    <div className="menu-settings">
                      <img src={settingsIcon} alt="settings" />
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </div>
          {
            // default menu mode
            menuMode === 'default' &&
            <div className="menu-links-mobile">
              <div onClick={() => { menuController.toggle('start'); }}>
                <Link to='/home'>
                  {i18next.t("Home")}
                </Link>
              </div>
              <div onClick={() => { menuController.toggle('start'); }}>
                <Link to='/live'>
                  {i18next.t("Live")}
                </Link>
              </div>
              <div onClick={() => { menuController.toggle('start'); }}>
                <Link to='/events'>
                  {i18next.t("Events")}
                </Link>
              </div>
              <div onClick={() => { menuController.toggle('start'); }} >
                <Link to='/bets'>
                  {i18next.t("Bets")}
                </Link>
              </div>
              <div onClick={() => menuController.toggle('start')}>
                <Link to='/favorites'>
                  {i18next.t("Favorites")}
                </Link>
              </div>
              <div onClick={() => menuController.toggle('start')}>
                <Link to='/chat'>
                  {i18next.t("Chat")}
                </Link>
              </div>
              {/* <div onClick={() => menuController.toggle('start')}>
              <Link to='/news'>News</Link>
            </div> */}
              {/* <div onClick={() => menuController.toggle('start')}>
              <Link to='/promotions'>Promotions</Link>
            </div> */}
              <div onClick={() => menuController.toggle('start')}>
                <Link to='/account'>
                  {i18next.t("My Account")}
                </Link>
              </div>
              {/* <div onClick={() => menuController.toggle('start')}>
              <Link to='/wallet'>Balance</Link>
            </div> */}
            </div>
          }
          {/* {
            // settings menu mode
            menuMode === 'settings' &&
            <div className="mob-settings-container">
              <div className="top-segment-container">
                <IonSegment
                  mode={"ios"}
                  value={settingsSegmentValue}
                  className="top-segment"
                  onIonChange={e => setSettingsSegmentValue(e.detail.value)}
                >
                  <IonSegmentButton type={"button"} value="system">
                    <IonLabel>
                      {i18next.t("System")}
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton type={"button"} value="leagues">
                    <IonLabel>
                      {i18next.t("Leagues")}
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton type={"button"} value="markets">
                    <IonLabel>
                      {i18next.t("Markets")}
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </div>

              {
                settingsSegmentValue === 'system' &&
                <SystemSettings />
              }
              {
                settingsSegmentValue === 'leagues' &&
                <LeaguesSettings />
              }
              {
                settingsSegmentValue === 'markets' &&
                <MarketsSettings />
              }
            </div>
          } */}
        </IonContent>

        {menuMode === 'default' &&
          <IonFooter className="ion-no-border menu-footer">
            <LogoutButton />
          </IonFooter>
        }

      </IonMenu>
    }
  </>
}

export default Menu;
