import React, { useState } from "react";
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonList,
  IonToggle,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const LeaguesSettings = (props) => {
  const [selectSport, setSelectSport] = useState('soccer');
  const options = { cssClass: 'custom-select' };

  //временный объект для рендера
  const tempObj = [
    {
      leagueImg: 'uefa.png',
      leagueTitle: 'UEFA',
      leagueNames: ['Champions League', 'Europa League', 'EURO-2020 Qualification', 'Nations League', 'UEFA: Super Cip']
    },
    {
      leagueImg: 'uefa.png',
      leagueTitle: 'FNL',
      leagueNames: ['Russian Premier League', 'Russian National Football League', 'Russian Professional Football League', 'Russian Amateur Football League']
    },
    {
      leagueImg: 'uefa.png',
      leagueTitle: 'La Liga',
      leagueNames: ['La Liga', 'Segunda División', 'Segunda División B', 'Tercera División', '1st Regional Division', '2nd Regional Division']
    }
  ]

  return (
    <>
      <div className="settings-leagues-top">
        <IonSelect
          className="select sport-games-select"
          value={selectSport}
          onIonChange={(e) => setSelectSport(e.detail.value)}
          interfaceOptions={options}
          interface={'popover'}
          mode={'md'}
        >
          <IonSelectOption value="soccer">Soccer</IonSelectOption>
          <IonSelectOption value="baseball">Baseball</IonSelectOption>
          <IonSelectOption value="tennis">Tennis</IonSelectOption>
          <IonSelectOption value="basketball">Basketball</IonSelectOption>
          <IonSelectOption value="voleyball">Voleyball</IonSelectOption>
          <IonSelectOption value="table-tennis">Table tennis</IonSelectOption>
          <IonSelectOption value="football">Football</IonSelectOption>
          <IonSelectOption value="bowling">Bowling</IonSelectOption>
        </IonSelect>
        <div className="settings-leagues-switcher">Switch all Off</div>
      </div>

      <IonList className="settings-leagues" lines="none">
        {
          tempObj.map((el, i) => {
            return (
              <div key={i} className="settings-leagues-card">
                <div className="settings-leagues-card-header">
                  <div className="settings-leagues-image">
                    <img src={require(`../../images/leagues/${el.leagueImg}`)} alt="logo" />
                  </div>
                  <div className="settings-leagues-league-title">{el.leagueTitle}</div>
                  <IonToggle checked={true} className='toggle-card' />
                </div>
                <div className="settings-leagues-card-inner">
                  {el.leagueNames.map((element, index) => {
                    return (
                      <IonItem key={index} className="card-leagues-element">
                        <IonLabel>{element}</IonLabel>
                        <IonCheckbox mode='md' slot='start' checked={true} onIonChange={e => console.log(e.detail.checked)} />
                      </IonItem>
                    )
                  })}
                </div>
              </div>
            )
          }
          )
        }
      </IonList>
    </>
  )

}

export default LeaguesSettings
