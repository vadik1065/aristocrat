import React, { useState } from "react";
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonList,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonModal
} from '@ionic/react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import i18next from "i18next";
import { useSelector } from "react-redux";



const LeaguesModal = (props) => {
  const themeAccent = useSelector(state => state.settings.theme.accent);

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
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => props.close(false)}
      cssClass={themeAccent}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>Soccer leagues</span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="modal-content-body">
          <div className="settings-leagues-switcher">
            {i18next.t("Switch all Off")}
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
        </div>
      </div>

    </IonModal>
  );
}

export default LeaguesModal;