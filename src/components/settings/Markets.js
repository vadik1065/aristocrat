import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../api/functions.js';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { IonBackButton, IonRippleEffect, IonToggle } from '@ionic/react';
import i18next from 'i18next';
import { setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../../store/actions/index.js';
import { requiredMarkets } from '../../utils/utils.js';


const Markets = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const width = useSelector(state => state.width);
  const isDesktop = width >= 1025;
  const isTablet = width <= 1024 && width >= 601;
  const isMobile = width <= 600;
  const settings = useSelector(state => state.settings);
  const gl_markets = useSelector(state => state.settings.markets);
  const [markets, setMarkets] = useState([]);
  const [changed, setChanged] = useState(false);
  const [open, setOpen] = useState(true);

  const title = i18next.t("Markets");

  useEffect(() => {
    setMarkets(gl_markets);
  }, [gl_markets]);

  function updateMarkets(obj) {
    setMarkets([ ...markets.filter(el => el.name !== obj.name), obj ]);
    setChanged(true);
  }

  function saveSettings() {
    let data = {
      interface_settings: {
        ...settings,
        markets: markets
      }
    };

    API.updateProfile(token, data).then(() => {
      API.getInfo(token).then(response => {
        dispatch(toggleToastText('Your personal settings was updated.'));
        dispatch(toggleToast(true));
        dispatch(setAllInterfaceSettings(response));
        setChanged(false);
      })
    }).catch(() => {
      dispatch(toggleErrorToastText('Something went wrong.'));
      dispatch(toggleErrorToast(true));
    })
  }

  return (
    <div className="rectangular-area-wrapper set-small">
      <div className={(open ? "open " : "close ") + "rectangular-area"}>
        {isDesktop &&
          <div className="dashboard-head">
            <span>{title}</span>
            <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, markets: false })} />
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
          <div className="dashboard-body-inner">
            <div className="market-settings-darkened">
              {
                requiredMarkets.map(el => 
                  <div key={el} className={'market-settings-toggle darkened'}>
                    <IonToggle disabled checked className='toggle-card defused' />
                    <div className="market-settings-title">{el}</div>
                  </div>
                )
              }
            </div>
            <div className="market-settings">
              {
                markets.length && markets
                  .sort((a, b) => a.sort - b.sort)
                  .map(el => 
                    <div key={el.name} className='market-settings-toggle'>
                      <IonToggle
                        className='toggle-card' 
                        checked={el.active}
                        onIonChange={(e) => updateMarkets({ name: el.name, sort: el.sort, active: e.detail.checked })}
                      />
                      <div className="market-settings-title">{el.name}</div>
                    </div>
                )
              }
            </div>
          </div>
        </div>

        {changed &&
          <div
            className="take-loan settings-save-btn ion-activatable"
            onClick={() => saveSettings()}
          >
            <IonRippleEffect />
            {i18next.t("Save changes")}
          </div>
        }
      </div>
    </div>
  )
}

export default Markets;
