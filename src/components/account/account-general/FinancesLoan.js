import React, { useEffect, useState } from 'react';
import { IonRippleEffect } from '@ionic/react'
import { useSelector } from 'react-redux';
import TakeLoanModal from './TakeLoanModal';
import { getCurrency } from '../../../utils/utils';
import { ReactComponent as LoanImg } from '../../../images/loan.svg';
import i18next from 'i18next';

const FinancesLoan = (props) => {
   const user = useSelector(
      ({ user }) => ({
         balance: user.balance,
         balanceInfo: user.balanceInfo,
         currency: user.currency
      })
   );
   useEffect(() => {
      if (user.balanceInfo && user.balanceInfo.find(el => el.credit_status === 2)) {
         setCredit(+user.balanceInfo.find(el => el.credit_status === 2).credit_value)
      }
      // console.log(credit);
   }, [user]);

   const [showTakeLoanModal, setShowTakeLoanModal] = useState(false);
   const [isLoan, setIsLoan] = useState(false);
   const [hasLoan, setHasLoan] = useState(false);
   const [credit, setCredit] = useState(0);

   return (
      <div className="loan-container">
         <div className="quantity flex column">
            <div className="finances-value">{(+user.balance).toFixed(2)}{getCurrency(user.currency)}</div>
            <div className={`finances-title ${props.isLeftBar ? 'white' : ''}`}>
               {i18next.t("Available funds. The amount you can bet now.")}
            </div>
         </div>
         {!hasLoan &&
            <div
               className="take-loan big ion-activatable column"
               onClick={() => setShowTakeLoanModal(true)}
            >
               {props.isLeftBar && <LoanImg />}
               <IonRippleEffect />
               {i18next.t("Take the loan")}
            </div>
         }
         {hasLoan &&
            <div
               className="repay-loan big ion-activatable column"
               onClick={() => setShowTakeLoanModal(true)}
            >
               {props.isLeftBar && <LoanImg />}
               <IonRippleEffect />
               {i18next.t("Repay the loan")}
            </div>
         }

         <TakeLoanModal
            open={showTakeLoanModal}
            close={setShowTakeLoanModal}
            isLoan={isLoan}
            setIsLoan={setIsLoan}
            hasLoan={hasLoan}
            setHasLoan={setHasLoan}
         />
      </div>
   )
}
export default FinancesLoan