import React, { useState } from 'react';
import {
  IonToggle
} from '@ionic/react';
const MarketsSettings = () => {
  const settings = [
    {
      name: 'Money Line',
      shade: true,
      value: true
    },
    {
      name: 'Double chance',
      shade: true,
      value: true
    },
    {
      name: 'Handicap',
      shade: true,
      value: true
    },
    {
      name: 'Totals',
      shade: false,
      value: true
    },
    {
      name: 'Both teams to score',
      shade: false,
      value: true
    },
    {
      name: 'Team to score',
      shade: false,
      value: true
    },
    {
      name: 'First team to score',
      shade: false,
      value: true
    },
    {
      name: 'Individual totals',
      shade: false,
      value: true
    },
    {
      name: 'To Win To nil',
      shade: false,
      value: true
    },
    {
      name: 'Correct score',
      shade: false,
      value: true
    }
  ]


  return (
    <div className='market-settings-container'>
      {
        settings.map((el, i) => {
          return (
            <div key={i} className={'market-settings-line ' + (el.shade === true ? 'darkened' : '')}>
              {el.shade === true && <IonToggle disabled checked className='toggle-card defused' />}
              {el.shade === false && <IonToggle checked className='toggle-card' />}
              <div className="market-settings-title">{el.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MarketsSettings
