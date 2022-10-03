import React, { useEffect, useState } from 'react';
import { IonRippleEffect, IonToggle } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../api/functions.js';
import i18next from 'i18next';
import { setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../../../store/actions';
import { getFirebaseToken } from '../../../firebase.js';

const NotificationList = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const width = useSelector(state => state.width);
  const isMobile = width <= 600;

  const settings = useSelector(state => state.settings);
  const gl_notifications = useSelector(state => state.settings.notifications);
  const [notifications, setNotifications] = useState({});
  const [changed, setChanged] = useState(false);
  const [allEnabledFocus, setAllEnabledFocus] = useState(false);
  const [favoriteFocus, setFavoriteFocus] = useState(false);
  const [chatMessagesFocus, setChatMessagesFocus] = useState(false);
  const [resultsFocus, setResultsFocus] = useState(false);

  useEffect(() => {
    setNotifications(gl_notifications);
  }, [gl_notifications]);

  function updateNotifications(notific) {
    let temp = { ...notifications };
    if (notific.hasOwnProperty('allEnabled')) {
      temp = {
        allEnabled: notific.allEnabled,
        favorite: notific.allEnabled,
        chatMessages: notific.allEnabled,
        results: notific.allEnabled
      }
    }

    if (!notific.hasOwnProperty('allEnabled')) {
      temp = { ...temp, ...notific };
      let arr = Object.entries(temp).filter(el => el[0] !== 'allEnabled');
      if (arr.every(el => el[1] === false)) {
        temp = { ...temp, allEnabled: false };
      }
    }

    setNotifications(temp);
    setChanged(true);
  }

  function saveSettings() {
    let data = {
      interface_settings: {
        ...settings,
        notifications: notifications
      }
    };

    API.updateProfile(token, data).then(() => {
      API.getInfo(token).then(response => {
        if (notifications.allEnabled) {
          getFirebaseToken(token);
        }
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


  // function updateNotifications(notific) {
  //   let temp = { ...notifications };
  //   if (notific.hasOwnProperty('allEnabled')) {
  //     temp = {
  //       allEnabled: notific.allEnabled,
  //       favorite: notific.allEnabled,
  //       chatMessages: notific.allEnabled,
  //       results: notific.allEnabled
  //     }
  //   }

  //   if (!notific.hasOwnProperty('allEnabled')) {
  //     temp = { ...temp, ...notific };
  //     let arr = Object.entries(temp).filter(el => el[0] !== 'allEnabled');
  //     if (arr.every(el => el[1] === false)) {
  //       temp = { ...temp, allEnabled: false };
  //     }
  //   }

  //   let data = {
  //     interface_settings: {
  //       ...settings,
  //       notifications: temp
  //     }
  //   };

  //   API.updateProfile(token, data).then((res) => {
  //     API.getInfo(token).then(response => {
  //       if (temp.allEnabled) {
  //         getFirebaseToken(token);
  //       }
  //       dispatch(setAllInterfaceSettings(response));
  //     })
  //   }).catch(() => {
  //     dispatch(toggleErrorToastText('Something went wrong.'));
  //     dispatch(toggleErrorToast(true));
  //   })
  // }


  return (
    <>
      <div className="settings-notification">
        <div className="notifications-preferences">
          <div className={isMobile ? "settings-title-big" : "settings-title-small"}>
            {i18next.t("Notifications preferences")}
          </div>
          <div className="notification-list">
            <div className="notification-item">
              <div>
                {i18next.t("Enable notifications")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={notifications.allEnabled}
                onIonFocus={() => setAllEnabledFocus(true)}
                onIonBlur={() => setAllEnabledFocus(false)}
                onIonChange={(e) => {
                  if (allEnabledFocus) {
                    updateNotifications({ allEnabled: e.detail.checked })
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="notifications-service">
          <div className="settings-title-big">
            {i18next.t("Service notifications")}
          </div>
          <div className="notification-list">
            <div className="notification-item">
            <div>
              {i18next.t("Favorite events notifications")}
            </div>
            <IonToggle
              className='toggle-card orange-toggle'
              checked={notifications.favorite}
              disabled={!notifications.allEnabled}
              onIonFocus={() => setFavoriteFocus(true)}
              onIonBlur={() => setFavoriteFocus(false)}
              onIonChange={(e) => {
                if (favoriteFocus) {
                  updateNotifications({ favorite: e.detail.checked })
                }
              }}
            />
            </div>
            <div className="notification-item">
              <div>
                {i18next.t("New messages")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={notifications.chatMessages}
                disabled={!notifications.allEnabled}
                onIonFocus={() => setChatMessagesFocus(true)}
                onIonBlur={() => setChatMessagesFocus(false)}
                onIonChange={(e) => {
                  if (chatMessagesFocus) {
                    updateNotifications({ chatMessages: e.detail.checked })
                  }
                }}
              />
            </div>
            <div className="notification-item">
              <div>
                {i18next.t("Results notifications")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={notifications.results}
                disabled={!notifications.allEnabled}
                onIonFocus={() => setResultsFocus(true)}
                onIonBlur={() => setResultsFocus(false)}
                onIonChange={(e) => {
                  if (resultsFocus) {
                    updateNotifications({ results: e.detail.checked })
                  }
                }}
              />
            </div>
            {/* <div className="notification-item">
              <div>
                {i18next.t("Recieved Bets")}
              </div>
              <IonToggle
                className='toggle-card orange-toggle'
                checked={notificationsEnabled ? betsNotificationsChecked : notificationsEnabled}
                disabled={!notificationsEnabled}
                onIonChange={(e) => setBetsNotificationsChecked(e.detail.checked)}
              />
            </div> */}
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
    </>
  )
}

export default NotificationList;
