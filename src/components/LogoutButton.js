import React from 'react';
import * as API from '../api/functions.js';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/actions/index.js';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import i18next from 'i18next';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.token);

  function logOut() {
    API.logout(token).then(() => {
      dispatch(setToken(''));
      localStorage.removeItem('token');
      history.push('/login')
    });
  }


  return (
    <IonButton className="logout-btn" onClick={() => logOut()}>
      {i18next.t("Log out")}
    </IonButton>
  )
}

export default LogoutButton;
