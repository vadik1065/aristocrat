import i18next from 'i18next';
import React, { useState } from 'react';
import { ReactComponent as PlusButton } from '../../images/pay-logos/plus.svg';

const AllPayMethods = (props) => {
  const [crypto] = useState(
    [
      {
        image: 'bitcoin.png',
        name: 'BTC'
      },
      {
        image: 'tether.png',
        name: 'USDT'
      },
      {
        image: 'ethereum.png',
        name: 'ETH'
      },
      {
        image: 'litecoin.png',
        name: 'LTC'
      },
    ]
  )

  const [bank] = useState(
    [
      {
        image: 'visa.png',
        name: 'Visa'
      },
      {
        image: 'mastercard.png',
        name: 'Mastercard'
      },
      {
        image: 'masterpass.png',
        name: 'Masterpass'
      },
      {
        image: 'paypal.png',
        name: 'PayPal'
      },
    ]
  )

  const [cash] = useState(
    [
      {
        image: 'cash.png',
        name: 'Cash method'
      },
    ]
  )

  return (
    <div className="wallet-pay-content">

      {(props.method === "crypto" || props.method === "all") &&
        <div className="wallet-pay-block">
          <div className="wallet-pay-title">
            {i18next.t("Cryptocurrency")}
          </div>
          <div className="wallet-pay-list">
            {crypto.map((el, i) => {
              return (
                <div key={i} className="wallet-pay-item">
                  <div className="wallet-pay-image">
                    <img src={require(`../../images/pay-logos/${el.image}`)} alt={el.name} />
                  </div>
                  <div className="wallet-pay-label">{el.name}</div>
                </div>
              )
            })
            }
          </div>
        </div>
      }

      {(props.method === "bank" || props.method === "all") &&
        <div className="wallet-pay-block">
          <div className="wallet-pay-title">
            {i18next.t("Bank Transfer")}
          </div>
          <div className="wallet-pay-list">
            {bank.map((el, i) => {
              return (
                <div key={i} className="wallet-pay-item">
                  <div className="wallet-pay-image">
                    <img src={require(`../../images/pay-logos/${el.image}`)} alt={el.name} />
                  </div>
                  <div className="wallet-pay-label">{el.name}</div>
                </div>
              )
            })
            }
            <div className="wallet-pay-item">
              <div className="wallet-pay-image wallet-pay-other-image">
                <PlusButton />
              </div>
              <div className="wallet-pay-label">
                {i18next.t("Other")}
              </div>
            </div>
          </div>
        </div>
      }

      {(props.method === "cash" || props.method === "all") &&
        <div className="wallet-pay-block">
          <div className="wallet-pay-title">
            {i18next.t("Cash")}
          </div>
          <div className="wallet-pay-list">
            {cash.map((el, i) => {
              return (
                <div key={i} className="wallet-pay-item">
                  <div className="wallet-pay-image">
                    <img src={require(`../../images/pay-logos/${el.image}`)} alt={el.name} />
                  </div>
                  <div className="wallet-pay-label">{el.name}</div>
                </div>
              )
            })
            }
          </div>
        </div>
      }
    </div>
  )

}

export default AllPayMethods
