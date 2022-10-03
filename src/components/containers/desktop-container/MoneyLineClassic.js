import React from 'react';
import { useSelector } from 'react-redux';
import { getPrice, sortMoneyLineBets } from '../../../utils/utils';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';

const MoneyLineClassic = (props) => {
  const bets = useSelector(state => state.bets.filter(el => el.match_id === props.matchId && el.market_name === props.marketId));
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);

  return (
    <>
      {bets.length > 0 &&
        <div className="match-money-container moneyline">
          <div className="match-money-header">
            {/* ML */}
            1X2
          </div>
          <div className="match-money-block">
            {sortMoneyLineBets(bets).map(el => {
              return (
                <div
                  key={el.id}
                  className={
                    "match-money-line" +
                    (betslip.some(elem => elem.buttonId === el.id) ? ' chosen ' : '') +
                    (el.status !== 1 ? ' non-tradable' : '')
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (el.status === 1) {
                      props.checkSelected({
                        button_id: el.id,
                        match_id: el.match_id
                      })
                    }
                  }}
                >
                  {el.status === 1 && <div className="match-money-label">{el.name}</div>}
                  {el.status === 1 && 
                    <div className="match-money-value">
                      <ChValue value={getPrice(el.price, interfaceView, isComma)} />
                    </div>
                  }
                  {el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
                </div>
              )
            })}
          </div>
        </div>
      }
    </>
  )
}

export default MoneyLineClassic;
