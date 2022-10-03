import React from 'react';
import '../css/promotions.css';
import { useSelector } from 'react-redux';
import DesktopLeftBar from '../components/DesktopLeftBar';
import { ReactComponent as Filter } from '../images/filter.svg';
import { ReactComponent as SearchIcon } from '../images/search-mini.svg';
import { ReactComponent as Calendar } from "../images/calendar.svg";
import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import WalletMobile from '../components/WalletMobile';
import i18next from 'i18next';

const Promotions = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;
  const themeAccent = useSelector(state => state.settings.theme.accent);


  return (
    <IonPage>
      {
        //true && <Redirect to="/login" />
      }

      {/*<IonContent scrollEvents={true} onIonScroll={(e) => checkScroll(e)} id="main" fullscreen>*/}

      {isMobile &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <div className="main-mobile">
            <WalletMobile />
            <div className="news-container promotions">
              <div className="home-top-container">
                <div className="home-top-container-label">
                  {i18next.t("Promotions")}
                </div>
                <div className="home-top-container-btns">
                  <button className="btn-filter">
                    <Filter className="filters-icon" />
                  </button>
                  <button className="btn-search">
                    <SearchIcon className="filters-icon" />
                  </button>
                </div>
              </div>
              {[1, 1, 1, 1].map((el, i) =>
                <article key={i} className="card-single">
                  <img src={require("../images/articles/promotion.png")} alt="promotion" />
                  <p className="promotion-date">
                    <span className="accent-color orange">
                      {i18next.t("REFFERAL BONUS")}
                    </span>
                    <span>·  10 SEP 2020</span>
                  </p>
                  <p className="promotion-text">
                    {i18next.t("The purpose of this promotion")}
                  </p>
                  <p className="readmore">
                    {i18next.t("Read more")} &gt;
                  </p>
                </article>
              )}
            </div>
          </div>
        </IonContent>
      }

      {isTablet &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <div className="main-tablet">
            {/* <div className="promotion-tabs"> */}
            <IonSegment
              mode={"ios"}
              value="all"
              // onIonChange={(e) => setScoreTab(e.detail.value)}
              className="home-top-segment promotions-tablet"
            >
              <IonSegmentButton value="all">
                <IonLabel>
                  {i18next.t("All")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="active">
                <IonLabel>
                  {i18next.t("Active")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="past">
                <IonLabel>
                  {i18next.t("Past")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
            {/* </div> */}
            <div className="tablet-cards-container news-tablet-cards-container">
              <div className="home-top-container">
                <div className="home-top-container-label">
                  {i18next.t("Promotions")}
                </div>
                <div className="home-top-container-btns">
                  <button className="btn-filter">
                    <Filter className="filters-icon" />
                  </button>
                  <button className="btn-search">
                    <SearchIcon className="filters-icon" />
                  </button>
                </div>
              </div>
              <div className="news-cards tablet">
                {[1, 1, 1, 1].map((el, i) =>
                  <article key={i} className="card-single">
                    <img src={require("../images/articles/promotion.png")} alt="promotion" />
                    <div className="card-single-bottom">
                      <p className="promotion-date">
                        <span className="accent-color orange">
                          {i18next.t("REFFERAL BONUS")}
                        </span>
                        <span>·  10 SEP 2020</span>
                      </p>
                      <p className="promotion-text">
                        {i18next.t("The purpose of this promotion")}
                      </p>
                      <p className="readmore">
                        {i18next.t("Read more")} &gt;
                      </p>
                    </div>
                  </article>
                )}
              </div>
            </div>
          </div>
        </IonContent>
      }

      {(isDesktop || is4k) &&
        <IonContent className='desktop-main-page' id="main">
          <div className="main-big flex">
            <DesktopLeftBar />
            <div className={`desktop-live-main-wrapper ${is4k && 'ultra'}`}>
              <div className="news-container promotions desktop-live-main-container">
                <div className="home-top-container">
                  <div className="home-top-container-label">
                    {i18next.t("Promotions")}
                  </div>
                  <div className="home-top-container-btns">
                    <button className="btn-filter">
                      <Filter className="filters-icon" />
                    </button>
                    <button className="btn-search">
                      <SearchIcon className="filters-icon" />
                    </button>
                    <div className="calendar-container flex">
                      <div className="calendar-label">
                        {i18next.t("Calendar")}
                      </div>
                      <Calendar />
                    </div>
                  </div>
                </div>
                <div className="promotion-tabs">
                  <IonSegment
                    mode={"ios"}
                    value="all"
                    // onIonChange={(e) => setScoreTab(e.detail.value)}
                    className="home-top-segment"
                  >
                    <IonSegmentButton value="all">
                      <IonLabel>
                        {i18next.t("All")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="active">
                      <IonLabel>
                        {i18next.t("Active")}
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="past">
                      <IonLabel></IonLabel>
                      {i18next.t("Past")}
                    </IonSegmentButton>
                  </IonSegment>
                </div>
                <div className="news-cards">
                  {[1, 1, 1, 1].map((el, i) =>
                    <article key={i} className="card-single">
                      <img src={require("../images/articles/promotion.png")} alt="promotion" />
                      <div className="card-single-bottom">
                        <p className="promotion-date">
                          <span className="accent-color orange">
                            {i18next.t("REFFERAL BONUS")}
                          </span>
                          <span>·  10 SEP 2020</span>
                        </p>
                        <p className="promotion-text">
                          {i18next.t("The purpose of this promotion")}
                        </p>
                        <p className="readmore">
                          {i18next.t("Read more")} &gt;
                        </p>
                      </div>
                    </article>
                  )}
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      }
    </IonPage>
  )
}

export default Promotions;
