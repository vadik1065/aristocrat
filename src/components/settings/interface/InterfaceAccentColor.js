import React, { useEffect, useState } from 'react';
import { IonToggle } from '@ionic/react';
import * as API from '../../../api/functions.js';
import { useDispatch, useSelector } from 'react-redux';
import { changeAccent, setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../../../store/actions';
import { getAccentColor } from '../../../utils/utils';
import i18next from 'i18next';

const InterfaceAccentColor = () => {
  const colors = {
    solidColor: [
      'redux-accent-orange',
      'redux-accent-red',
      'redux-accent-pink',
      'redux-accent-violet',
      'redux-accent-purple',
      'redux-accent-light-blue',
      'redux-accent-green',
    ],
    gradientColor: [
      'redux-accent-orange-gradient',
      'redux-accent-red-gradient',
      'redux-accent-pink-gradient',
      'redux-accent-violet-gradient',
      'redux-accent-purple-gradient',
      'redux-accent-light-blue-gradient',
      'redux-accent-green-gradient',
    ]
  }

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const settings = useSelector(state => state.settings);
  const accent = useSelector(state => state.settings.accent);
  const isDarkMode = useSelector(state => state.settings.theme.darkMode);
  const [colorSolid, setColorSolid] = useState(null);
  const [colorGradient, setColorGradient] = useState(null);
  const [isGradientAccentColor, setIsGradientAccentColor] = useState(null);

  useEffect(() => {
    setIsGradientAccentColor(accent.isGradient);
    if (accent.color.includes('gradient')) {
      setColorGradient(accent.color);
    } else {
      setColorSolid(accent.color);
    }
  }, [accent]);

  function setAccent(val, type) {
    updateSettings(val)
    if (type === 'solid') {
      setColorSolid(val);
    }
    if (type === 'gradient') {
      setColorGradient(val);
    }
  }

  function updateSettings(val) {
    let data = {
      interface_settings: {
        ...settings,
        accent: {
          color: val,
          isGradient: val.includes('gradient')
        }
      }
    };

    API.updateProfile(token, data).then((res) => {
      API.getInfo(token).then(response => {
        dispatch(setAllInterfaceSettings(response));
      })
    }).catch(() => {
      dispatch(toggleErrorToastText('Something went wrong.'));
      dispatch(toggleErrorToast(true));
    })
  }

  return (
    <div className="interface-block">
      <div className="interface-block-inner">
        <div className="settings-title-big">
          {i18next.t("Accent color")}
        </div>
        <div className="interface-design-list">
          <div className="interface-design-item interface-item-left">
            <div className="interface-design-header">
              <div className={`settings-title-small ${!isGradientAccentColor ? 'activated' : ''}`}>
                {i18next.t("Solid")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={!isGradientAccentColor}
                onIonChange={(e) => {
                  setIsGradientAccentColor(!e.detail.checked);
                  if (e.detail.checked) {
                    setColorSolid(colors.solidColor[0]);
                    updateSettings(colors.solidColor[0])
                  }
                }}
              />
            </div>
            <div className="interface-design-body interface-color-body">
              {colors.solidColor.map((elColor, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (!isGradientAccentColor) {
                        setAccent(elColor, 'solid')
                      }
                    }}
                    className={`interface-color-mode ${(!isGradientAccentColor && elColor === colorSolid ? 'active-theme' : '')} ${(!isGradientAccentColor ? 'active-mode' : '')}`}
                  >
                    <div style={{ backgroundColor: getAccentColor(elColor, isDarkMode) }}></div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="interface-design-item interface-item-right">
            <div className="interface-design-header">
              <div className={`settings-title-small ${isGradientAccentColor ? 'activated' : ''}`}>
                {i18next.t("Gradient")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={isGradientAccentColor}
                onIonChange={(e) => {
                  setIsGradientAccentColor(e.detail.checked);
                  if (e.detail.checked) {
                    setColorGradient(colors.gradientColor[0]);
                    updateSettings(colors.gradientColor[0])
                  }
                }}
              />
            </div>
            <div className="interface-design-body interface-color-body">
              {colors.gradientColor.map((elColor, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                        if (isGradientAccentColor) {
                          setAccent(elColor, 'gradient')
                        }
                    }}
                    className={`interface-color-mode ${(isGradientAccentColor && elColor === colorGradient ? 'active-theme' : '')} ${(isGradientAccentColor ? 'active-mode' : '')}`}
                  >
                    <div style={{ background: getAccentColor(elColor, isDarkMode) }}></div>
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

export default InterfaceAccentColor;
