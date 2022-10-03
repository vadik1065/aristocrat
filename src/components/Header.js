import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as API from '../api/functions.js';
import { changeMenu, changeTheme, setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../store/actions/index.js';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { getCurrency, getSportPic, radioList } from '../utils/utils.js';
// Ionic
import { IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { menuController } from "@ionic/core";
import { menu, close } from 'ionicons/icons';
// Images
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
// import ball from '../images/games-icons/soccer.png';
import { ReactComponent as LogoMobile } from '../images/logo-aristocrat/logo.svg';
// import logoBlackSmall from '../images/logo-aristocrat/logo-monkey-black.png';
// import logoBlackBig from '../images/logo-aristocrat/logo-monkey-black-big.png';
// import logoWhiteSmall from '../images/logo-aristocrat/logo-monkey-white.png';
// import logoWhiteBig from '../images/logo-aristocrat/logo-monkey-white-big.png';
import logoBlackSmall from '../images/logo-aristocrat/new-logo-white.png';
import logoBlackBig from '../images/logo-aristocrat/new-logo-white.png';
import logoWhiteSmall from '../images/logo-aristocrat/new-logo-black.png';
import logoWhiteBig from '../images/logo-aristocrat/new-logo-black.png';
import searchIcon from '../images/header-icons/loupe.png';
// import { ReactComponent as LightThemeIcon } from '../images/header-icons/night.svg';
// import { ReactComponent as DarkThemeIcon } from '../images/header-icons/day.svg';
import themeImg from '../images/header-icons/theme.png';
import settingsIcon from '../images/header-icons/settings.png';
import myAccountIcon from '../images/header-icons/myaccount.png';
import walletIcon from '../images/header-icons/wallet.png';
import textSizeIcon from '../images/text-size.svg';
// CSS
import '../css/header.css';
// Components
import Settings from './old-settings/SettingsDropDown';
// Other
import i18next from 'i18next';
import ChatTextSizeModal from './chat/ChatTextSizeModal.js';
import useSetTheme from '../hooks/useSetTheme.js';



const Header = ({ pagesWithoutBars }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const width = useSelector(state => state.width);
  const isDesktop = width >= 1025;
  const user = useSelector(
    ({ user }) => ({
      balance: user.balance,
      currency_id: user.currency
    })
  );
  const sportsId = useSelector(state => state.sportsId);
  const [sportPic, setSportPic] = useState(getSportPic(sportsId));
  const theme = useSelector(state => state.settings.theme);
  const { setTheme } = useSetTheme();
  const menuState = useSelector(state => state.menuState);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const headerColorful = useSelector(state => state.settings.headerColorful);
  const accentColor = useSelector(state => state.settings.accent.color);
  const isLargeWidth = useSelector(state => state.width >= 768);
  const [menuMode, setMenuMode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const pagesArr = pagesWithoutBars.filter(page => location.pathname == page);

  useEffect(() => {
    setSportPic(getSportPic(sportsId));
  }, [sportsId]);

  useEffect(() => {
    if (menuMode === 'settings') {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [menuMode]);


  function handleClickOutside(event) {
    const modal = document.getElementById('settingsModal');
    const options = document.getElementsByTagName('ion-popover')[0];
    if (modal !== null && options === undefined && !modal.contains(event.target)) {
      setMenuMode('');
    }
  }

  return (
    <>
      {pagesArr.length == 0 &&

        <IonToolbar className={`main-header ${!headerColorful ? themeAccent : ''} ${headerColorful ? accentColor + ' redux-accent-white-color' : ''}`} >

          {isLargeWidth &&
            <div className={`desktop-header flex`} >
              <IonButtons slot="start">
                <IonButton
                  className={`menu-button menu-button-left ${headerColorful ? accentColor : ''}`} size={'large'}
                  onClick={() => {
                    menuController.toggle('start');
                    // changeMenu(menuState ? false : true);
                    dispatch(changeMenu(menuState ? false : true));
                  }}
                >
                  {/* {!props.menuState && <IonIcon size={'large'} icon={menu} />} */}
                  {/* {props.menuState && <IonIcon size={'large'} icon={close} />} */}
                  {!menuState && <IonIcon size={'large'} icon={menu} />}
                  {menuState && <IonIcon size={'large'} icon={close} />}
                </IonButton>
              </IonButtons>
              <Link className="header-logo" to='/home'>
                {(theme.darkMode || headerColorful) && <ResponsiveImage alt="Aristocrat">
                  <ResponsiveImageSize
                    default
                    minWidth={0}
                    path={logoBlackSmall}
                  />
                  <ResponsiveImageSize
                    minWidth={3400}
                    path={logoBlackBig}
                  />
                </ResponsiveImage>
                }
                {(!theme.darkMode && !headerColorful) && <ResponsiveImage alt="Aristocrat">
                  <ResponsiveImageSize
                    default
                    minWidth={0}
                    path={logoWhiteSmall}
                  />
                  <ResponsiveImageSize
                    minWidth={3400}
                    path={logoWhiteBig}
                  />
                </ResponsiveImage>
                }
              </Link>
              <div className="links flex">
                <div>
                  <Link className={location.pathname === '/home' ? 'active' : ''} to='/home'>{i18next.t("Home")}</Link>
                </div>

                <div>
                  <Link className={location.pathname === '/live' ? 'active' : ''} to='/live'>
                    {i18next.t("Live")}
                  </Link>
                </div>

                <div>
                  <Link className={location.pathname === '/events' ? 'active' : ''} to='/events'>
                    {i18next.t("Events")}
                  </Link>
                </div>

                <div>
                  <Link className={location.pathname === '/bets' ? 'active' : ''} to='/bets'>
                    {i18next.t("Bets")}
                  </Link>
                </div>

                <div>
                  <Link className={location.pathname === '/favorites' ? 'active' : ''} to='/favorites'>
                    {i18next.t("Favorites")}
                  </Link>
                </div>

                <div>
                  <Link className={location.pathname === '/chat' ? 'active' : ''} to='/chat'>
                    {i18next.t("Chat")}
                  </Link>
                </div>

                {/* <div>
                  <Link className={location.pathname === '/news' ? 'active' : ''} to='/news'>
                    {i18next.t("News")}
                  </Link>
                </div> */}

                {/* <div>
                  <Link className={location.pathname === '/promotions' ? 'active' : ''} to='/promotions'>
                    {i18next.t("Promotions")}
                  </Link>
                </div> */}

              </div>
              <div className='menu-buttons-container'>
                <div className={'menu-buttons-wrapper ' + (menuMode.toString() === 'search' ? 'picked' : '')}>
                  <div
                    onClick={() => { menuMode !== 'search' ? setMenuMode('search') : setMenuMode('') }}
                    className="menu-search"
                  >
                    {/* <SearchIcon /> */}
                    <img src={searchIcon} alt="search" />
                  </div>
                </div>
                <div className={'menu-buttons-wrapper ' + (menuMode.toString() === 'colors' ? 'picked' : '')}>
                  <div
                    onClick={() => setTheme()}
                    className="menu-theme-color"
                  >
                    {/* {themeIcon === true ? <DarkThemeIcon /> : <LightThemeIcon />} */}
                    {/* <ThemeIcon /> */}
                    <img src={themeImg} alt="theme" />
                  </div>
                </div>

                <div className={'menu-buttons-wrapper ' + (location.pathname === '/settings' ? 'picked ' : '')}>
                  <Link to="/settings" >
                    <div className="menu-settings">
                      <img src={settingsIcon} alt="settings" />
                    </div>
                  </Link>
                </div>

                {/* <div className={'menu-buttons-wrapper ' + (menuMode.toString() === 'settings' ? 'picked' : '')}>
                  <div
                    onClick={() => { menuMode !== 'settings' ? setMenuMode('settings') : setMenuMode('') }}
                    className="menu-settings"
                  >
                    <img src={settingsIcon} alt="settings" />
                  </div>
                </div> */}

              </div>
              <div className={(location.pathname === '/account' ? 'active ' : '') + 'my-account-container-header flex'}>
                <Link to="/account" className="my-account-header-inner flex">
                  <div className="my-account-image">
                    {/* <MyAccountIcon /> */}
                    <img src={myAccountIcon} alt="my account" />
                  </div>
                  <div className="my-account-text">
                    {i18next.t("My Account")}
                  </div>
                  <span onClick={() => setMenuMode('settings')}></span>
                </Link>
              </div>
              <div className={(location.pathname === '/wallet' ? 'active ' : '') + "wallet-container-header flex"}>
                {/* <Link to="/wallet" className="wallet-header-inner flex"> */}
                <div className="wallet-header-inner flex">
                  <img src={walletIcon} alt="wallet" />
                  <div className="wallet-header-text">{user.balance}{getCurrency(user.currency_id)}</div>
                </div>
                {/* </Link> */}
              </div>
            </div>
          }

          {!isLargeWidth &&
            <div className={`mobile-header flex ${headerColorful ? accentColor : ''}`}>
              <IonButtons slot="start">
                <IonButton
                  className={`menu-button menu-button-left ${headerColorful ? accentColor : ''}`} size={'large'}
                  onClick={() => {
                    menuController.toggle('start');
                    // changeMenu(props.menuState ? false : true);
                    dispatch(changeMenu(menuState ? false : true));
                  }}
                >
                  {!menuState && <IonIcon size={'large'} icon={menu} />}
                  {menuState && <IonIcon size={'large'} icon={close} />}
                </IonButton>
              </IonButtons>
              <div className={`logo-container ${headerColorful ? '' : 'header-plain'}`}>
                <Link className="header-logo" to='/home'>
                  <div>
                    {(theme.darkMode || headerColorful) && <img src={logoBlackSmall} alt="logo" />}
                    {(!theme.darkMode && !headerColorful) && <img src={logoWhiteSmall} alt="logo" />}
                  </div>
                  {/* <LogoMobile /> */}
                </Link>
              </div>

              {location.pathname === '/chat'
                ? <IonButtons slot="end">
                  <IonButton
                    className={`menu-button menu-button-right ${headerColorful ? accentColor : ''}`} size={'large'}
                    onClick={() => setShowModal(true)}
                  >
                    <IonIcon size={'large'} icon={textSizeIcon} />
                  </IonButton>
                </IonButtons>
                : <IonButtons slot="end">
                  <IonButton
                    className={`menu-button menu-button-right ${headerColorful ? accentColor : ''}`} size={'large'}
                    onClick={() => menuController.toggle('end')}
                  >
                    <img src={require(`../images/games-icons/${sportPic}.png`)} alt="icon" />
                    {/* <IonIcon size={'large'} icon={require(`../images/games-logos/${sportPic}.svg`)} /> */}
                  </IonButton>
                </IonButtons>
              }
              <ChatTextSizeModal
                open={showModal}
                close={setShowModal}
                radioList={radioList}
              />
            </div>
          }
        </IonToolbar>
      }

      {(isLargeWidth) && menuMode === "settings" &&
        <Settings />
      }


    </>
  )
}

export default Header;
