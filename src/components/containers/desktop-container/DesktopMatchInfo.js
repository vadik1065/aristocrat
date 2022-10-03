import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDate,
  getParticipantLogo,
  getParticipantName,
  getСompetitionLogo,
  getСompetitionName,
  getTime,
} from "../../../utils/utils";
import { ReactComponent as Selected } from "../../../images/selected.svg";
import { ReactComponent as Star } from "../../../images/star.svg";
import { ReactComponent as Watch } from "../../../images/show.svg";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { setLiveWidgetMatchId } from "../../../store/actions";

const DesktopMatchInfo = (props) => {
  const dispatch = useDispatch();
  const competitions = useSelector((state) => state.competitions);
  const matches = useSelector((state) => state.matches);
  const [match, setMatch] = useState({});
  const participants = useSelector((state) => state.participants);
  const dateFormat = useSelector((state) => state.settings.dateFormat);
  const timeZone = useSelector((state) => state.settings.timeZone);
  const dealing = useSelector((state) => state.settings.dealingView);
  const [toggleTime, setToggleTime] = useState("ft");

  useEffect(() => {
    if (matches.some((el) => el.id === props.link)) {
      setMatch(matches.find((el) => el.id === props.link));
    }
  }, [matches]);

  return (
    <>
      {match.id && (
        <>
          <div className="desktop-live-container-info flex">
            <div className="card-event-date">
              <Star
                onClick={(e) => {
                  e.stopPropagation();
                  let fav = match.favorite ? 0 : 1;
                  props.setFav(match.id, fav);
                }}
                className={"star-icon " + (match.favorite === 1 ? "activated" : "")}
              />
              <div className="card-event-start-time">{getTime(match.starttime, timeZone)}</div>
              {match.matchstatus !== 2 && (
                <div className="card-event-start-date">
                  {getDate(match.starttime, dateFormat, timeZone)}
                </div>
              )}
            </div>
            <div
              className={`desktop-card-event-toggle-container ${
                dealing === "classic" ? "classic" : ""
              }`}
            >
              {/* <IonSegment
                mode={"ios"}
                onClick={(e) => e.stopPropagation()}
                onIonChange={e => setToggleTime(e.detail.value)}
                value={toggleTime}
                className="desktop-live-container-toggle horizontal"
              >
                <IonSegmentButton value="ft">
                  <IonLabel>FT</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="1h">
                  <IonLabel>1H</IonLabel>
                </IonSegmentButton>
              </IonSegment> */}

              {match.matchsummary != null && match.matchsummary != "" && (
                <div className="card-event-live-time">
                  {match.matchsummary.split(" ")[1].split(":")[0]}
                </div>
              )}
            </div>
            {/* {dealing === "cis" &&
              <>
                <img className="team-img" alt='team 1' src={getParticipantLogo(participants[match.team1_id])}></img>
                <img className="team-img" alt='team 2' src={getParticipantLogo(participants[match.team2_id])}></img>
              </>
            } */}
            <Watch
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setLiveWidgetMatchId(match.id));
                props.setShowWidgetModal(true);
              }}
              className={`watch-icon ${props.showWidgetModal ? "activated" : ""}`}
            />
            <div className="teams">
              {dealing === "cis" && (
                <>
                  <p className="team-title">
                    {getParticipantName(participants[match.team1_id]) || match.team1}
                  </p>
                  <p className="team-title draw">Draw</p>
                  <p className="team-title">
                    {getParticipantName(participants[match.team2_id]) || match.team2}
                  </p>
                </>
              )}

              {(dealing === "classic" || dealing === "asian") && (
                <>
                  <div className="team-container flex">
                    {/* <img className="team-img small" alt='team 1' src={getParticipantLogo(participants[match.team1_id])}></img> */}
                    <p className="team-title">
                      {getParticipantName(participants[match.team1_id]) || match.team1}
                    </p>
                  </div>
                  <div className="team-container flex">
                    {/* <div className="collapse"></div> */}
                    <p className="team-title draw">Draw</p>
                  </div>
                  <div className="team-container flex">
                    {/* <img className="team-img small" alt='team 2' src={getParticipantLogo(participants[match.team2_id])}></img> */}
                    <p className="team-title">
                      {getParticipantName(participants[match.team2_id]) || match.team2}
                    </p>
                  </div>
                  {/* <div className="team-container competition-container flex">
                    <img className="team-img small" alt='competition logo' src={getСompetitionLogo(competitions[match.competition_id])}></img>
                    <p className="team-title">{match.competition_name}</p>
                  </div> */}
                </>
              )}
            </div>
            {(dealing === "classic" || dealing === "asian") && (
              <div className="team-container competition-container flex">
                <img
                  className="team-img small"
                  alt="competition logo"
                  src={getСompetitionLogo(competitions[match.competition_id])}
                ></img>
                <p className="team-title">
                  {getСompetitionName(competitions[match.competition_id]) || match.competition_name}
                </p>
              </div>
            )}
          </div>
          <div className="score">
            {match.matchstatus === 2 && match.matchsummary !== null && (
              <>
                <p
                  className={
                    match.matchsummary.split(", ")[0].split("-")[0] >
                    match.matchsummary.split(", ")[0].split("-")[1]
                      ? "leader"
                      : ""
                  }
                >
                  {match.matchsummary.split(", ")[0].split("-")[0] >
                  match.matchsummary.split(", ")[0].split("-")[1] ? (
                    <Selected className="selected arrow-right" />
                  ) : (
                    ""
                  )}
                  {match.matchsummary.split(", ")[0].split("-")[0]}
                </p>
                <p
                  className={
                    match.matchsummary.split(" ")[0].split("-")[1] >
                    match.matchsummary.split(" ")[0].split("-")[0]
                      ? "leader"
                      : ""
                  }
                >
                  {match.matchsummary.split(", ")[0].split("-")[1] >
                  match.matchsummary.split(", ")[0].split("-")[0] ? (
                    <Selected className="selected arrow-right" />
                  ) : (
                    ""
                  )}
                  {match.matchsummary.split(", ")[0].split("-")[1]}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DesktopMatchInfo;
