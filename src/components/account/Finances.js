import React, { useState } from 'react';
import {
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonItem,
  IonBackButton
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../store/actions';
// Components
import FinancesTransactions from './account-general/FinancesTransactions';
import FinancesBalance from './account-general/FinancesBalance';
import FinancesLoan from './account-general/FinancesLoan';
// Icons
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import arrowIcon from '../../images/arrow-orange.svg';
import i18next from 'i18next';



const Finances = (props) => {
  const width = useSelector(state => state.width);
  const isDesktop = width >= 1025;
  const isTablet = width <= 1024 && width >= 601;
  const isMobile = width <= 600;
  const title = i18next.t("Finances & Balance");

  const dispatch = useDispatch();
  const user = useSelector(
    ({ user }) => ({
      currency: user.currency,
      email: user.email
    })
  );
  // const currency = useSelector(state => state.user.currency)
  const [open, setOpen] = useState(true);
  const [financesValue, setFinancesValue] = useState("balance")
  const options = { cssClass: 'custom-select' }



  return (
    <div className="rectangular-area-wrapper big finances">
      <div
        className={(open === true ? "open " : "close ") +
          (isMobile ? "account-mobile-container " : "") +
          "rectangular-area"}
      >

        {isDesktop && <div className="dashboard-head">
          <span>{title}</span>
          <CloseIcon className="close-icon" onClick={() => props.setCards({ ...props.cards, finances: false })} />
        </div>}

        {isMobile &&
          <div className='back-container'>
            <IonBackButton defaultHref="/account" text={i18next.t("Back")} />
          </div>
        }

        {isTablet &&
          <>
            <div
              className="dashboard-head-tablet"
              onClick={() => setOpen(!open)}
            >
              <span>{title}</span>
              <ArrowIcon className="fold-icon" />
            </div>
            <div className="finances-tabs">
              <IonSegment
                mode={"ios"}
                value={financesValue}
                className="top-segment"
                onIonChange={e => setFinancesValue(e.detail.value)}
              >
                <IonSegmentButton type={"button"} value="balance">
                  <IonLabel>
                    {i18next.t("Balance")}
                  </IonLabel>
                </IonSegmentButton>
                <IonSegmentButton type={"button"} value="transactions">
                  <IonLabel>
                    {i18next.t("Transactions")}
                  </IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>
          </>
        }

        {isMobile &&
          <div className="dashboard-head-mobile">{title}</div>
        }

        {/* dashboard-finance-body */}
        <div className="dashboard-columns-body flex">
          {/* dashboard-left */}
          {(financesValue === "balance" || !isTablet) &&
            <div className="dashboard-left">
              <div className="dashboard-finances-head">
                <div>
                  {i18next.t("Balance")}
                </div>
                {/*
                  <IonItem className="orange-select">
                  <IonSelect
                    value={user.currency}
                    onIonChange={e => dispatch(updateUserInfo({currency: e.detail.value}))}
                    interfaceOptions={options}
                    interface={'popover'}
                    mode={'md'}
                  >
                    <IonSelectOption value={840}>USD</IonSelectOption>
                    <IonSelectOption value={978}>EUR</IonSelectOption>
                  </IonSelect>
                  <IonIcon
                    className="password-eye"
                    icon={arrowIcon}
                  >
                  </IonIcon>
                </IonItem>*/
                }
              </div>
              <FinancesLoan />


              {isMobile &&
                <div className="finances-balance">
                  <div className="title">
                    {i18next.t("Balance")}
                  </div>
                  <FinancesBalance />
                </div>
              }

              {!isMobile &&
                <FinancesBalance />
              }
            </div>
          }
          {/* dashboard-left end */}

          {/* dashboard-right end */}
          {(financesValue === "transactions" || !isTablet) &&
            <div className="dashboard-right">
              <div className="dashboard-finances-head">
                <div>
                  {i18next.t("Transactions")}
                </div>
              </div>
              <FinancesTransactions />
            </div>
          }
          {/* dashboard-right end */}
        </div>
        {/* dashboard-finance-body end */}
      </div>
    </div>
  )
}

export default Finances;
