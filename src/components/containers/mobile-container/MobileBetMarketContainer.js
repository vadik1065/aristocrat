import React, { useState } from 'react';
import { asianHandicaps, capitalize, getPrice, sortMoneyLineBets, totals } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import useLine from '../../../hooks/useLine';
import ChValue from '../../ChValue';
import { ReactComponent as Lock } from '../../../images/padlock.svg';
import { ReactComponent as PinOn } from '../../../images/pin-on.svg';
import { ReactComponent as PinOff } from '../../../images/pin-off.svg';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';

const Button = (props) => {
  const betslip = useSelector(state => state.betslip);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(props.el.line);

  return (
    <button
      onClick={() => {
        if (props.el.status === 1) {
          props.checkSelected({
            button_id: props.el.id,
            match_id: props.el.match_id
          })
        }
      }}
      className={`card-event-cfc-left 
        ${(betslip.some(elem => elem.buttonId === props.el.id) ? 'chosen' : '')} 
        ${(props.el.status !== 1 ? 'non-tradable' : '')}
        ${((!asianHandicaps.includes(props.marketName) && !totals.includes(props.marketName) && (props?.marketList?.length === 2 || props?.marketList?.length > 3)) ? 'one-second' : '')}
      `}
    >
      {props.el.status === 1 && 
        <div className="card-event-cfc-left-label">
          {!asianHandicaps.includes(props.el.market_name) && `${props.el.name} ${props.el.line !== null ? props.el.line : ''}`}
          {asianHandicaps.includes(props.el.market_name) && `${i18next.t(`H${props.el.name}`)} ${line}`}
        </div>
      }
      {props.el.status === 1 && <div className="card-event-cfc-left-val"><ChValue value={getPrice(props.el.price, interfaceView, isComma)} /></div>}
      {props.el.status !== 1 && <Lock className="lock-pic" onClick={(e) => e.stopPropagation()} />}
    </button>
  )
}

const SingleBetMarket = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const [pin, setPin] = useState(true);
  // const [scoreTab, setScoreTab] = useState('table');
  // const [scoreFirst, setScoreFirst] = useState(0);
  // const [scoreSecond, setScoreSecond] = useState(0);

  return (
    <>
      {isMobile &&
        <>
          <p className="card-event-large-title">{capitalize(props.marketName)}</p>
          <div className="card-event-cfc-container">
            {sortMoneyLineBets(props.marketList).map(el => el.status === 1 &&
              <Button 
                key={el.id} 
                el={el} 
                checkSelected={props.checkSelected}
                marketList={props.marketList}
              />
            )}
          </div>
        </>
      }

      {isTablet &&
        <>
          <div className="tablet-card-event-cfc-container-header flex">
            <div className="tablet-card-event-cfc-container-header-label">{capitalize(props.marketName)}</div>
            <div className={`tablet-card-event-cfc-container-header-right flex`}>
              {pin ?
                <PinOn className="pin filters-icon" onClick={() => setPin(!pin)} /> :
                <PinOff className="pin filters-icon" onClick={() => setPin(!pin)} />
              }
              <Arrow className="arrow" onClick={() => props.setClose(!props.close)} />
            </div>
          </div>
          <div className="card-event-cfc-container">
            {sortMoneyLineBets(props.marketList).map(el => {
              if (el.status === 1) {
                return (
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected}
                    marketList={props.marketList}
                  />
                )
              }
            })}
          </div>
        </>
      }
    </>
  )
}

const AsianHandicapBetMarket = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const [pin, setPin] = useState(true);
  // const [scoreTab, setScoreTab] = useState('table');
  // const [scoreFirst, setScoreFirst] = useState(0);
  // const [scoreSecond, setScoreSecond] = useState(0);

  return (
    <>
      {isMobile &&
        <>
          <p className="card-event-large-title">{capitalize(props.marketName)}</p>
          <div className="card-event-cfc-container">
            <div className="left-column">
              {props.marketList
                .filter(mark => mark.name == 1)
                .sort((a, b) => a.line.split(' ')[0] - b.line.split(' ')[0])
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
            <div className="right-column">
              {props.marketList
                .filter(mark => mark.name == 2)
                .sort((a, b) => b.line.split(' ')[0] - a.line.split(' ')[0])
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
          </div>
        </>
      }

      {isTablet &&
        <>
          <div className="tablet-card-event-cfc-container-header flex">
            <div className="tablet-card-event-cfc-container-header-label">{capitalize(props.marketName)}</div>
            <div className={`tablet-card-event-cfc-container-header-right flex`}>
              {pin ?
                <PinOn className="pin filters-icon" onClick={() => setPin(!pin)} /> :
                <PinOff className="pin filters-icon" onClick={() => setPin(!pin)} />
              }
              <Arrow className="arrow" onClick={() => props.setClose(!props.close)} />
            </div>
          </div>
          <div className="card-event-cfc-container">
            <div className="left-column">
              {props.marketList
                .filter(mark => mark.name == 1)
                .sort((a, b) => a.line.split(' ')[0] - b.line.split(' ')[0])
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
            <div className="right-column">
              {props.marketList
                .filter(mark => mark.name == 2)
                .sort((a, b) => b.line.split(' ')[0] - a.line.split(' ')[0])
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
          </div>
        </>
      }
    </>
  )
}

const TotalBetMarket = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const [pin, setPin] = useState(true);
  // const [scoreTab, setScoreTab] = useState('table');
  // const [scoreFirst, setScoreFirst] = useState(0);
  // const [scoreSecond, setScoreSecond] = useState(0);

  return (
    <>
      {isMobile &&
        <>
          <p className="card-event-large-title">{capitalize(props.marketName)}</p>
          <div className="card-event-cfc-container">
            <div className="left-column">
              {props.marketList
                .filter(mark => mark.name == 'Under')
                .sort((a, b) => a.line - b.line)
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
            <div className="right-column">
              {props.marketList
                .filter(mark => mark.name == 'Over')
                .sort((a, b) => a.line - b.line)
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
          </div>
        </>
      }

      {isTablet &&
        <>
          <div className="tablet-card-event-cfc-container-header flex">
            <div className="tablet-card-event-cfc-container-header-label">{capitalize(props.marketName)}</div>
            <div className={`tablet-card-event-cfc-container-header-right flex`}>
              {pin ?
                <PinOn className="pin filters-icon" onClick={() => setPin(!pin)} /> :
                <PinOff className="pin filters-icon" onClick={() => setPin(!pin)} />
              }
              <Arrow className="arrow" onClick={() => props.setClose(!props.close)} />
            </div>
          </div>
          <div className="card-event-cfc-container">
            <div className="left-column">
              {props.marketList
                .filter(mark => mark.name == 'Under')
                .sort((a, b) => a.line - b.line)
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
            <div className="right-column">
              {props.marketList
                .filter(mark => mark.name == 'Over')
                .sort((a, b) => a.line - b.line)
                .map(el => 
                  <Button 
                    key={el.id} 
                    el={el} 
                    checkSelected={props.checkSelected} 
                  />
                )}
            </div>
          </div>
        </>
      }
    </>
  )
}

const MobileBetMarketContainer = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const [close, setClose] = useState(false);

  function getClassName() {
    if (isMobile) {
      return `card-event-large-container ${props.isLarge ? 'large-open' : ''} ${props.idx === 0 ? 'first' : ''}`
    }
    if (isTablet) {
      return `tablet-card-event-cfc-container ${close ? 'close' : ''}`
    }
  }

  return (
    <div className={getClassName()}>
      {!asianHandicaps.includes(props.marketName) && !totals.includes(props.marketName) &&
        <SingleBetMarket
          marketName={props.marketName}
          marketList={props.marketList.filter(bet => bet.status === 1)}
          checkSelected={props.checkSelected}
          close={close}
          setClose={setClose}
        />
      }

      {asianHandicaps.includes(props.marketName) &&
        <AsianHandicapBetMarket
          marketName={props.marketName}
          marketList={props.marketList}
          checkSelected={props.checkSelected}
          close={close}
          setClose={setClose}
        />
      }

      {totals.includes(props.marketName) &&
        <TotalBetMarket
          marketName={props.marketName}
          marketList={props.marketList}
          checkSelected={props.checkSelected}
          close={close}
          setClose={setClose}
        />
      }
    </div>
  )
}

export default MobileBetMarketContainer;
