import React, { useState } from 'react';
import {
   IonSegment,
   IonSegmentButton,
   IonLabel
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { getCurrency } from '../../../utils/utils';
import i18next from 'i18next';

const TransactionsComponent = (props) => {
   const { image, operation, amount, payment_system_name, date, currency_id } = props.el;

   return (
      <div className="transaction-card">
         <div className="transaction-top">
            <div>
               {(operation === 'deposit' || operation === 'loan repayment') &&
                  <img src={require(`../../../images/trans-income.svg`)} alt="tr" />
               }
               {(operation === 'withdrawal' || operation === 'loan issue') &&
                  <img src={require(`../../../images/trans-withdraw.svg`)} alt="tr" />
               }
               <span>{operation}</span>
            </div>
            <div>{amount}{getCurrency(currency_id)}</div>
         </div>
         <div className="transaction-bottom">
            <div>{payment_system_name}</div>
            <div>{date}</div>
         </div>
      </div>
   )
}

const FinancesTransactions = () => {
   const [segmentValue, setSegmentValue] = useState("all");
   const transactions = useSelector(state => state.transactions);
   const noTransactions = i18next.t("No transactions history.");

   return (
      <>
         <IonSegment
            mode={"ios"}
            value={segmentValue}
            className="top-segment"
            onIonChange={e => setSegmentValue(e.detail.value)}
         >
            <IonSegmentButton type={"button"} value="all">
               <IonLabel>
                  {i18next.t("All")}
               </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="deposits">
               <IonLabel>
                  {i18next.t("Deposits")}
               </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="withdrawal">
               <IonLabel>
                  {i18next.t("Withdrawals")}
               </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton type={"button"} value="loans">
               <IonLabel>
                  {i18next.t("Loans")}
               </IonLabel>
            </IonSegmentButton>
         </IonSegment>

         <div className="transactions-history">
            {segmentValue === 'all' && transactions.map((el, i) =>
               <TransactionsComponent key={i} el={el} />
            )}

            {segmentValue === 'deposits' &&
               transactions.map((el, i) =>
                  el.operation === 'deposit' && <TransactionsComponent key={i} el={el} />
               )}

            {segmentValue === 'withdrawal' &&
               transactions.map((el, i) =>
                  el.operation === 'withdrawal' && <TransactionsComponent key={i} el={el} />
               )}

            {segmentValue === 'loans' &&
               transactions.map((el, i) =>
                  (el.operation === 'loan issue' || el.operation === 'loan repayment') && <TransactionsComponent key={i} el={el} />
               )}

            {segmentValue === 'deposits' &&
               transactions.filter((el) => el.operation === 'deposit').length === 0 &&
               <p>{noTransactions}</p>
            }

            {segmentValue === 'withdrawal' &&
               transactions.filter((el) => el.operation === 'withdrawal').length === 0 &&
               <p>{noTransactions}</p>
            }

            {segmentValue === 'loans' &&
               transactions.filter((el) => el.operation === 'loan issue' || el.operation === 'loan repayment').length === 0 &&
               <p>{noTransactions}</p>
            }

            {transactions.length === 0 && <p>{noTransactions}</p>}
         </div>
      </>
   )
}

export default FinancesTransactions;
