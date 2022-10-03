import React, { useEffect, useState } from 'react';
import { IonToggle } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import { changeTheme, toggleErrorToast, toggleErrorToastText } from '../../../store/actions';
import i18next from 'i18next';
import dark from '../../../images/theme-modes/dark.svg';
import accentDark from '../../../images/theme-modes/dark-accent.svg';
import contrastDark from '../../../images/theme-modes/dark-contrast.svg';
import light from '../../../images/theme-modes/light.svg';
import softLight from '../../../images/theme-modes/light-soft.svg';
import contrastLight from '../../../images/theme-modes/light-contrast.svg';
import useSetTheme from '../../../hooks/useSetTheme.js';

const InterfaceDesignMode = () => {
  const themeMode = {
    darkTheme: [
      {
        value: 'dark',
        name: 'Dark',
        image: dark,
      },
      {
        value: 'accent-dark',
        name: 'Accent dark',
        image: accentDark,
      },
      {
        value: 'contrast-dark',
        name: 'Contrast dark',
        image: contrastDark,
      }],
    lightTheme: [
      {
        value: 'light',
        name: 'Light',
        image: light,
      },
      {
        value: 'soft-light',
        name: 'Soft light',
        image: softLight,
      },
      {
        value: 'contrast-light',
        name: 'Contrast light',
        image: contrastLight,
      }
    ]
  }

  const theme = useSelector(state => state.settings.theme);
  const { setTheme } = useSetTheme();
  const [darkModeFocus, setDarkModeFocus] = useState(false);
  const [lightModeFocus, setLightModeFocus] = useState(false);

  function setAccent(val, isDark) {
    setTheme({ darkMode: isDark, accent: val });
  }

  return (
    <div className="interface-block">
      <div className="interface-block-inner">
        <div className="settings-title-big">
          {i18next.t("Mode design")}
        </div>
        <div className="interface-design-list">
          <div className="interface-design-item interface-item-left">
            <div className="interface-design-header">
              {/* <div className="settings-title-small">Dark mode {designDarkMode && <span>- <span>ACTIVE</span></span>}</div> */}
              <div className={`settings-title-small ${theme.darkMode ? 'activated' : ''}`}>
                {i18next.t("Dark mode")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={theme.darkMode}
                onIonFocus={() => setDarkModeFocus(true)}
                onIonBlur={() => setDarkModeFocus(false)}
                onIonChange={(e) => {
                  if (darkModeFocus && e.detail.checked) {
                    setTheme({darkMode: !theme.darkMode, accent: themeMode.darkTheme[0].value});
                  }
                  if (darkModeFocus && !e.detail.checked) {
                    setTheme({darkMode: !theme.darkMode, accent: themeMode.lightTheme[0].value});
                  }
                }}
              />
            </div>
            <div className="interface-design-body">
              {themeMode.darkTheme.map((mode, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (theme.darkMode) {
                        setAccent(mode.value, true)
                      }
                    }}
                    className={`interface-design-mode ${(theme.darkMode && mode.value === theme.accent ? 'active-theme' : '')} ${(theme.darkMode ? 'active-mode' : '')}`}
                  >
                    <div className="interface-design-mode-image">
                      <img src={mode.image} alt="theme" />
                    </div>
                    <div className="interface-design-mode-name">
                      {i18next.t(mode.name)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="interface-design-item interface-item-right">
            <div className="interface-design-header">
              {/* <div className="settings-title-small">Light mode {designLightMode && <span>- <span>ACTIVE</span></span>}</div> */}
              <div className={`settings-title-small ${theme.darkMode ? '' : 'activated'}`}>
                {i18next.t("Light mode")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={!theme.darkMode}
                onIonFocus={() => setLightModeFocus(true)}
                onIonBlur={() => setLightModeFocus(false)}
                onIonChange={(e) => {
                  if (lightModeFocus && e.detail.checked) {
                    setTheme({darkMode: !theme.darkMode, accent: themeMode.lightTheme[0].value});
                  }
                  if (lightModeFocus && !e.detail.checked) {
                    setTheme({darkMode: !theme.darkMode, accent: themeMode.darkTheme[0].value});
                  }
                }}
              />
            </div>
            <div className="interface-design-body">
              {themeMode.lightTheme.map((mode, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (!theme.darkMode) {
                        setAccent(mode.value, false)
                      }
                    }}
                    className={`interface-design-mode ${(!theme.darkMode && mode.value === theme.accent ? 'active-theme' : '')} ${(!theme.darkMode ? 'active-mode' : '')}`}
                  >
                    <div className="interface-design-mode-image">
                      <img src={mode.image} alt="theme" />
                    </div>
                    <div className="interface-design-mode-name">
                      {i18next.t(mode.name)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterfaceDesignMode;
