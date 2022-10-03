import React from 'react';
import { Link } from 'react-router-dom';
import { chevronForwardOutline } from 'ionicons/icons';
import { IonItem, IonIcon } from "@ionic/react";
import i18next from 'i18next';


const SettnigsMobLinks = () => {
  return (
    <div className="account-mobile-container settings-mobile-container">
      <div className="account-links settings-links">
        <Link to='/settings/interface'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Interface")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/settings/dealing'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Dealing")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        {/* <Link to='/settings/general'>
          <IonItem button={true} type={'button'} lines="none">
            General
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link> */}
        <Link to='/settings/notifications'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Notifications")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/settings/leagues'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Leagues")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/settings/markets'>
          <IonItem button={true} type={'button'} lines="none">
            {i18next.t("Markets")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
        <Link to='/settings/security'>
          <IonItem button={true} lines="none">
            {i18next.t("Security settings")}
            <IonIcon size="small" icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </Link>
      </div>
    </div>
  )
}

export default SettnigsMobLinks;
