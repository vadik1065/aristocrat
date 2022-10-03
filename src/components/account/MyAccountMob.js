import React from 'react';
import { Link } from 'react-router-dom';
import { chevronForwardOutline } from 'ionicons/icons';
import { IonItem, IonIcon } from "@ionic/react";
import MyAccountTop from './account-general/MyAccountTop.js';
import LogoutButton from '../LogoutButton.js';
import i18next from 'i18next';



const MyAccountMob = () => {
  return (
    <div className="account-mobile-container main-account-mobile-container">
      <MyAccountTop />
      <div className="account-links">
        <Link to='/account/notifications'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Notifications")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/account/finances'>
          <IonItem button={true} lines="none">
            {i18next.t("Finances & Balance")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/account/security'>
          <IonItem button={true} lines="none">
            {i18next.t("Security settings")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/account/personal'>
          <IonItem button={true} lines="none">
            {i18next.t("Edit personal information")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/account/password-change'>
          <IonItem button={true} lines="none">
            {i18next.t("Change password")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <LogoutButton />
      </div>
    </div>
  )
}

export default MyAccountMob;
