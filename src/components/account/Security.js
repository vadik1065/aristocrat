import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import TwoFactorAuthentication from './account-general/TwoFactorAuthentication';
import LimitInput from './account-general/LimitInput';
import LimitAmount from './account-general/LimitAmount';
import LimitWithdrawal from './account-general/LimitWithdrawal';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { useLocation } from 'react-router';
import { IonBackButton } from '@ionic/react';
import i18next from 'i18next';

const Security = (props) => {
  const location = useLocation();
  const width = useSelector(state => state.width);
  const isDesktop = width >= 1025;
  const isTablet = width <= 1024 && width >= 601;
  const isMobile = width <= 600;
  const title = i18next.t("Security Settings");

  const [open, setOpen] = useState(true);

  return (
    // <div className={"rectangular-area-wrapper security " + (location.pathname.includes('account') ? 'big' : 'set-small')}>
    <div
      className={(open ? "open " : "close ") +
        (isMobile ? "account-mobile-container " : "") +
        "rectangular-area"}
    >

      {isDesktop && <div className="dashboard-head">
        <span>{title}</span>
        <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, security: false })} />
      </div>}

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

      {/* dashboard-finance-body */}
      <div className="dashboard-grid-body">
        <TwoFactorAuthentication />
        <LimitInput />
        <LimitAmount />
        <LimitWithdrawal />
      </div>
      {/* dashboard-finance-body end */}
    </div>
    // </div >
  )
}

export default Security;
