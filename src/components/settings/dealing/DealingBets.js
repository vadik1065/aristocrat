import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDate, getPrice, getTime } from '../../../utils/utils';
import useLine from '../../../hooks/useLine';
import team1logo from '../../../images/leagues/team1.png';
import team2logo from '../../../images/leagues/team2.png';
import { ReactComponent as More } from '../../../images/more.svg';
import { ReactComponent as Star } from '../../../images/star.svg';
import { ReactComponent as Watch } from '../../../images/show.svg';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import { ReactComponent as Arrows } from '../../../images/arrows.svg';

const HandicapLineButton = (props) => {
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(props.button.line);
  
  return (
    <button className="card-event-cfc-left">
      <div className="card-event-cfc-left-label">{i18next.t(`H1`)} {line}</div>
      <div className="card-event-cfc-left-val">
        <p className="started">{getPrice(props.button.price, interfaceView, isComma)}</p>
      </div>
    </button>
  )
}

const HandicapButtonClassic = (props) => {
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const line = useLine(props.button.line);

  return (
    <div className="match-money-line">
      <div className="match-money-label">{line}</div>
      <div className="match-money-value">
        <p className="started">{getPrice(props.button.price, interfaceView, isComma)}</p>
      </div>
    </div>
  )
}

const HandicapButtonAsian = (props) => {
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);
  const [line, setLine] = useState('');

  useEffect(() => {
    if (props.button.line) {
      let result = Math.abs(props.button.line.split(' ')[0]);
      setLine(result);
    }
  }, [props.button]);

  return (
    <div className="match-money-line">
      <div className="match-money-label">
        {props.index % 2 == 0 && line}
      </div>
      <div className={`match-money-icon ${props.index % 2 == 0 ? 'blue' : 'red'}`}>
        {props.index % 2 == 0 ? '—' : '+'}
      </div>
      <div className="match-money-value">
        <p className="started">{getPrice(props.button.price, interfaceView, isComma)}</p>
      </div>
    </div>
  )
}

const DealingBets = () => {
  const dealing = useSelector(state => state.settings.dealingView);
  const dateFormat = useSelector(state => state.settings.dateFormat);
  const timeZone = useSelector(state => state.settings.timeZone);
  const interfaceView = useSelector(state => state.settings.interfaceView);
  const isComma = useSelector(state => state.settings.isComma);

  const moneyLineBtn = [{ line: '1', price: 3.19 }, { line: 'X', price: 3.55 }, { line: '2', price: 2.21 }];
  const handicapBtn = [{ line: '-0.75 (0-0)', price: 4.3 }, { line: '0.75 (0-0)', price: 1.29 }];
  const totalBtn = [{ name: 'Under', line: '0.5', price: 12.1 }, { name: 'Over', line: '0.5', price: 1.08 }];

  function setDealingClass(value) {
    if (value === 'cis') {
      return 'cis-view'
    } else if (value === 'classic') {
      return 'classic-view'
    } else if (value === 'asian') {
      return 'asian-view'
    }
  }

  function getClassName() {
    return (
      "dealing-settings-match " +
      setDealingClass(dealing)
    )
  }

  return (
    <div className={getClassName()}>
      <div className="event-card-header flex">
        <div className="left-side">
          <p className="time">{getTime(1629918000, timeZone)}</p>
          <p className="date">{getDate(1629918000, dateFormat, timeZone)}</p>
        </div>
        <div className="right-side flex">
          <Watch className="watch-icon" />
          <Star className="star-icon" />
          <More className="more-icon" />
        </div>
      </div>
      <div className="teams-vs flex">
        <div className="team flex">
          <p>Liverpool</p>
          <img src={team1logo} alt="participant1" />
        </div>
        <div className="team flex team-2">
          <img src={team2logo} alt="participant2" />
          <p>Tottenham</p>
        </div>
      </div>

      <div className="stakes-line flex">
        <>
          {dealing === "cis" && 
            <>
              <div className="card-event-cfc-container money-line">
                {moneyLineBtn.map((button, i) =>
                  <button key={i} className="card-event-cfc-left">
                    <div className="card-event-cfc-left-label">{button.line}</div>
                    <div className="card-event-cfc-left-val">
                      <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                    </div>
                  </button>
                )}
              </div>

              <div className="card-event-cfc-container handicap">
                {handicapBtn.map((button, i) => 
                  <HandicapLineButton key={i} button={button} />
                )}
                <div id='modalLines' className={`more-lines-container ${dealing}`}>
                  <Arrow className='pic-right bet-arrow' />
                </div>
              </div>

              <div className="card-event-cfc-container total">
                {totalBtn.map((button, i) => 
                  <button key={i} className="card-event-cfc-left">
                    <div className="card-event-cfc-left-label">{button.name} {button.line}</div>
                    <div className="card-event-cfc-left-val">
                      <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                    </div>
                  </button>
                )}
                <div id='modalLines' className={`more-lines-container ${dealing}`}>
                  <Arrow className='pic-right bet-arrow' />
                </div>
              </div>
            </>
          }
          
          {dealing === "classic" && 
            <>
              <div className="match-money-wrapper">
                <div className="match-money-container moneyline">
                  <div className="match-money-header">1X2</div>
                  <div className="match-money-block">
                    {moneyLineBtn.map((button, i) => 
                      <div key={i} className="match-money-line">
                        <div className="match-money-label">{button.line}</div>
                        <div className="match-money-value">
                          <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="match-money-container handicap">
                  <div className="match-money-header">
                    {i18next.t("Handicap")}
                  </div>
                  <div className="match-money-block">
                    {handicapBtn.map((button, i) => 
                      <HandicapButtonClassic key={i} button={button} />
                    )}

                    <div className="match-money-line expand">
                      <div id='modalLines' className={`more-lines-container ${dealing}`}>
                        <Arrows className='pic-right' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="match-money-container underover">
                  <div className="match-money-header">
                    {i18next.t("Total")}
                  </div>
                  <div className="match-money-block ">
                    {totalBtn.map((button, i) => 
                      <div key={i} className="match-money-line">
                        <div className="match-money-label">{button.name} {button.line}</div>
                        <div className="match-money-value">
                          <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                        </div>
                      </div>
                    )}

                    <div className="match-money-line expand">
                      <div id='modalLines' className={`more-lines-container ${dealing}`}>
                        <Arrows className='pic-right' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }

          {dealing === "asian" && 
            <>
              <div className="match-money-wrapper">
                <div className="match-money-container moneyline">
                  <div className="match-money-header">1X2</div>
                  <div className="match-money-block">
                    {moneyLineBtn.map((button, i) => 
                      <div key={i} className="match-money-line">
                        <div className="match-money-label">{button.line}</div>
                        <div className="match-money-value">
                          <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="match-money-container handicap">
                  <div className="match-money-header">
                    {i18next.t("Handicap")}
                  </div>
                  <div className="match-money-block">
                    {handicapBtn.map((button, i) => 
                      <HandicapButtonAsian key={i} button={button} index={i} />
                    )}
                    
                    <div className="match-money-line expand">
                      <div id='modalLines' className={`more-lines-container ${dealing}`}>
                        <Arrows className='pic-right' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="match-money-container handicap">
                  <div className="match-money-header">
                    {i18next.t("Total")}
                  </div>
                  <div className="match-money-block">
                    {totalBtn.map((button, i) => 
                      <div key={i} className="match-money-line">
                        <div className="match-money-label">
                          {i % 2 == 0 ? button.line : ''}
                        </div>
                        <div className="match-money-icon">
                          {i % 2 == 0 ? 'U' : 'O'}
                        </div>
                        <div className="match-money-value">
                          <p className="started">{getPrice(button.price, interfaceView, isComma)}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="match-money-line expand">
                      <div id='modalLines' className={`more-lines-container ${dealing}`}>
                        <Arrows className='pic-right' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </>
      </div>
    </div>

    // <div className="dealing-settings-match">
    //   <div className="dealing-match-info">
    //     <div className="dealing-match-team">Liverpool<br />Tottenham</div>
    //     <div className="dealing-match-time">
    //       {i18next.t("Today")}, 20:00
    //     </div>
    //   </div>

    //   <div className="dealing-settings-match-bets">
    //     <div className="dealing-bets-stake dealing-bets-stake-small">
    //       <div className="dealing-bets-stake-label">1</div>
    //       <div className="dealing-bets-stake-value">{getPrice(4.95, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-small">
    //       <div className="dealing-bets-stake-label">X</div>
    //       <div className="dealing-bets-stake-value">{getPrice(2.25, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-small">
    //       <div className="dealing-bets-stake-label">2</div>
    //       <div className="dealing-bets-stake-value">{getPrice(1.95, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-big">
    //       <div className="dealing-bets-stake-label">H1 - 0.25</div>
    //       <div className="dealing-bets-stake-value">{getPrice(4.95, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-big">
    //       <div className="dealing-bets-stake-label">H2 + 0.25</div>
    //       <div className="dealing-bets-stake-value">{getPrice(4.95, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-big">
    //       <div className="dealing-bets-stake-label">Over 2.25</div>
    //       <div className="dealing-bets-stake-value">{getPrice(4.95, interfaceView, isComma)}</div>
    //     </div>
    //     <div className="dealing-bets-stake dealing-bets-stake-big">
    //       <div className="dealing-bets-stake-label">Under 2.25</div>
    //       <div className="dealing-bets-stake-value">{getPrice(4.95, interfaceView, isComma)}</div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default DealingBets;
