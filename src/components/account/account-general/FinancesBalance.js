import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrency } from '../../../utils/utils';
import i18next from 'i18next';

const FinancesBalance = () => {
   const [credit, setCredit] = useState(0);
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
   }, [user]);

   return (
      <div className="balance-grid-container">
         <div className="balance-grid-item">
            <div className="finances-value">
               {credit > 0 ? 0 : user.balance}{getCurrency(user.currency)}
            </div>
            <div className="finances-title">
               {i18next.t("Balance. The amount you can withdraw now.")}
            </div>
         </div>
         <div className="balance-grid-item">
            <div className="finances-value">{credit.toFixed(2)}{getCurrency(user.currency)}</div>
            <div className="finances-title">
               {i18next.t("Quantity of current credit funds.")}
            </div>
         </div>
         <div className="balance-grid-item">
            <div className="finances-value">0{getCurrency(user.currency)}</div>
            <div className="finances-title">
               {i18next.t("Pending Funds for not graded events.")}
            </div>
         </div>
         <div className="balance-grid-item">
            <div className="finances-value value-green">0{getCurrency(user.currency)}</div>
            <div className="finances-title">
               {i18next.t("Your result for today’s 3 graded bets.")}
            </div>
         </div>
      </div>
   )
}

export default FinancesBalance;
