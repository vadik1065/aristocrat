import React, { useState } from 'react';
import { IonItem, IonIcon, IonRippleEffect } from '@ionic/react'
import { useSelector } from 'react-redux';
// Icons
import { ReactComponent as Usrimg } from '../../../images/usrimg.svg';
import diamond from '../../../images/diamond.png';
import arrowIcon from '../../../images/arrow-orange.svg';
import { ReactComponent as DepositImg } from '../../../images/deposit.svg';
import { ReactComponent as WithdrawalImg } from '../../../images/withdrawal.svg';
import FinancesLoan from './FinancesLoan';
import DepositModal from './DepositModal.js';
import WithdrawModal from './WithdrawModal.js';
import { getCurrencyString } from '../../../utils/utils.js';
import ChangeCurrencyModal from '../../ChangeCurrency.js';
import i18next from 'i18next';
import AvatarModal from './AvatarModal';

const MyAccountTop = () => {
   const [showAvatarModal, setShowAvatarModal] = useState(false);
   const [showDepositModal, setShowDepositModal] = useState(false);
   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
   const [showCurrencyModal, setShowCurrencyModal] = useState(false);
   const user = useSelector(
      ({ user }) => ({
         currency: user.currency,
         first_name: user.first_name,
         last_name: user.last_name,
         avatar: user.avatar
      })
   );

   return (
      <div className="my-account-top">
         <div className="user-card">
            <div 
               onClick={() => setShowAvatarModal(true)} 
               className={`img-container flex ${(!user.avatar || user.avatar === null) ? 'default' : ''}`}
               style={{ background: `url(${user.avatar})` }}
            >
               {(!user.avatar || user.avatar === null) && <Usrimg />}
            </div>
            <div className="info-container flex">
               <div className="email">
                  <p>{user.first_name} {user.last_name}</p>
               </div>
               <div className="account-type flex">
                  <p>
                     {i18next.t("Premium account")}
                  </p>
                  <img
                     className="account-type-img"
                     alt="diamond"
                     src={diamond}
                  />
               </div>
            </div>
            <IonItem onClick={() => setShowCurrencyModal(true)} className="currency-switch orange-select">
               <p>{getCurrencyString(user.currency)}</p>
               <IonIcon
                  className="password-eye"
                  icon={arrowIcon}
               >
               </IonIcon>
            </IonItem>
         </div>
         <div className='deposit-withdraw-container flex'>
            <div onClick={() => setShowDepositModal(true)} className="take-loan big ion-activatable deposit column">
               <DepositImg />
               <IonRippleEffect />
               {i18next.t("Deposit money")}
            </div>
            <div onClick={() => setShowWithdrawModal(true)} className="repay-loan big ion-activatable withdraw column">
               <WithdrawalImg />
               <IonRippleEffect />
               {i18next.t("Withdraw money")}
            </div>
         </div>

         <FinancesLoan isLeftBar={true} />
         <AvatarModal open={showAvatarModal} close={setShowAvatarModal} />
         <DepositModal open={showDepositModal} close={setShowDepositModal} />
         <WithdrawModal open={showWithdrawModal} close={setShowWithdrawModal} />
         <ChangeCurrencyModal open={showCurrencyModal} close={setShowCurrencyModal}></ChangeCurrencyModal>
      </div>
   )
}

export default MyAccountTop;
