import React, { useState } from 'react';
import DesktopLeftBar from '../components/DesktopLeftBar.js';
import { ReactComponent as Filter } from '../images/filter.svg';
import { ReactComponent as SearchIcon } from '../images/search-mini.svg';
import newsImg from "../images/articles/news-img.png";
import news2Img from "../images/articles/news2-img.png";
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { ReactComponent as Calendar } from "../images/calendar.svg";
import '../css/news.css'
import {
  IonContent,
  IonPage,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { useSelector } from 'react-redux';
import WalletMobile from '../components/WalletMobile.js';
import i18next from 'i18next';

const tempNews = [
  {
    id: 'news1',
    date: '25.09.2020, 11:34',
    title: 'Barcelona considering April 27 training return La Liga',
    image: newsImg,
    text: "Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation. Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation."
  },
  {
    id: 'news2',
    date: '25.09.2020, 11:34',
    title: 'Barcelona considering April 27 training return La Liga',
    image: news2Img,
    text: "Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation. Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation."
  },
  {
    id: 'news3',
    date: '25.09.2020, 11:34',
    title: 'Barcelona considering April 27 training return La Liga',
    image: news2Img,
    text: "Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation. Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation."
  },
  {
    id: 'news4',
    date: '25.09.2020, 11:34',
    title: 'Barcelona considering April 27 training return La Liga',
    image: newsImg,
    text: "Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation. Barcelona considering April 27 training return La Liga confirmed earlier today the suspension of all professional football in Spain would be extended beyond the current April 4 deadline, for an unspecified period. Barcelona have shut down all club activities and training sessions as part of the wider restrictions imposed within the state of alarm issued by the Spanish government. However, according to reports in Diario AS, the Catalan giants have provisionally named a new date for their return to training. A return in late April would fit with the reported La Liga restart date of mid May, and allow for two weeks of full training as the players return from self isolation."
  }
];

const News = (props) => {
  const width = useSelector(state => state.width);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [news] = useState(tempNews);
  const [currentNews, setCurrentNews] = useState(news[0].id);
  const [currentNewsMobile, setCurrentNewsMobile] = useState(null);
  const [selectSport, setSelectSport] = useState('soccer');



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
            <div className="news-container">
              <div className="home-top-container">
                <div className="home-top-container-label">
                  {currentNewsMobile ?
                    <div
                      className="home-top-container-back flex"
                      onClick={() => setCurrentNewsMobile(null)}
                    >
                      <Arrow className="arrow-right" />
                      <div>
                        {i18next.t("Back to News")}
                      </div>
                    </div>
                    : 'News'
                  }
                </div>
                {!currentNewsMobile &&
                  <div className="home-top-container-btns">
                    <button className="btn-filter">
                      <Filter className="filters-icon" />
                    </button>
                    <button className="btn-search">
                      <SearchIcon className="filters-icon" />
                    </button>
                  </div>
                }
              </div>

              {!currentNewsMobile && news.map((el) =>
                <article key={el.id} className={`card-single`}>
                  <img src={el.image} className="card-single-image" alt="news pic" />
                  <div className="card-single-bottom">
                    <p className="card-single-date">{el.date}</p>
                    <p className="card-single-title">{el.title}</p>
                    <p
                      className="readmore"
                      onClick={() => setCurrentNewsMobile(el.id)}
                    >
                      {i18next.t("Read more")} &gt;
                    </p>
                  </div>
                </article>
              )}

              {currentNewsMobile &&
                <div className="news-card-details">
                  {news.map((el) => el.id === currentNewsMobile &&
                    <div key={el.id} className="news-article-content">
                      <img
                        src={el.image}
                        className="news-article-image"
                        alt="news pic"
                      />
                      <h2 className="news-article-title">{el.title}</h2>
                      <div className="news-article-text">{el.text}</div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </IonContent>
      }

      {isTablet &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <div className="main-tablet">
            <div className="main-tablet-top">
              <IonSelect
                className="select sport-games-select"
                interface="popover"
                value={selectSport}
                onIonChange={(e) => setSelectSport(e.detail.value)}
                mode={'md'}
              >
                <IonSelectOption value="soccer">
                  {i18next.t("Soccer")}
                </IonSelectOption>
                <IonSelectOption value="baseball">
                  {i18next.t("Baseball")}
                </IonSelectOption>
                <IonSelectOption value="tennis">
                  {i18next.t("Tennis")}
                </IonSelectOption>
                <IonSelectOption value="basketball">
                  {i18next.t("Basketball")}
                </IonSelectOption>
                <IonSelectOption value="voleyball">
                  {i18next.t("Voleyball")}
                </IonSelectOption>
                <IonSelectOption value="table-tennis">
                  {i18next.t("Table tennis")}
                </IonSelectOption>
                <IonSelectOption value="football">
                  {i18next.t("Football")}
                </IonSelectOption>
                <IonSelectOption value="bowling">
                  {i18next.t("Bowling")}
                </IonSelectOption>
              </IonSelect>
            </div>
            <div className="tablet-cards-container news-tablet-cards-container">
              <div className="home-top-container">
                <div className="home-top-container-label">
                  {currentNewsMobile ?
                    <div
                      className="home-top-container-back flex"
                      onClick={() => setCurrentNewsMobile(null)}
                    >
                      <Arrow className="arrow-right" />
                      <div>
                        {i18next.t("Back to News")}
                      </div>
                    </div>
                    : 'News'
                  }
                </div>
                {!currentNewsMobile &&
                  <div className="home-top-container-btns">
                    <button className="btn-filter">
                      <Filter className="filters-icon" />
                    </button>
                    <button className="btn-search">
                      <SearchIcon className="filters-icon" />
                    </button>
                  </div>
                }
              </div>

              {!currentNewsMobile &&
                <div className="news-cards tablet">
                  {news.map((el) =>
                    <article key={el.id} className={`card-single`}>
                      <img src={el.image} className="card-single-image" alt="news pic" />
                      <div className="card-single-bottom">
                        <p className="card-single-date">{el.date}</p>
                        <p className="card-single-title">{el.title}</p>
                        <p
                          className="readmore"
                          onClick={() => setCurrentNewsMobile(el.id)}
                        >
                          {i18next.t("Read more")} &gt;
                        </p>
                      </div>
                    </article>
                  )}
                </div>
              }
              {currentNewsMobile &&
                <div className="news-card-details tablet">
                  {news.map((el) => el.id === currentNewsMobile &&
                    <div key={el.id} className="news-article-content">
                      <img
                        src={el.image}
                        className="news-article-image"
                        alt="news pic"
                      />
                      <h2 className="news-article-title">{el.title}</h2>
                      <div className="news-article-text">{el.text}</div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </IonContent>
      }

      {(isDesktop || is4k) &&
        <IonContent className='desktop-main-page' id="main">
          <div className="main-big">
            <DesktopLeftBar />
            <div className={`desktop-live-main-wrapper ${is4k && 'ultra'}`}>
              <div className="news-container desktop-live-main-container ">
                <div className="home-top-container">
                  <div className="home-top-container-label">
                    {i18next.t("News")}
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
                <div className="news-cards">
                  {news.map((el) =>
                    <article key={el.id} className={`card-single ${el.id === currentNews && 'active'}`}>
                      <img src={el.image} className="card-single-image" alt="news pic" />
                      <div className="card-single-bottom">
                        <p className="card-single-date">{el.date}</p>
                        <p className="card-single-title">{el.title}</p>
                        <p
                          className="readmore"
                          onClick={() => setCurrentNews(el.id)}
                        >
                          {i18next.t("Read more")} &gt;
                        </p>
                      </div>
                    </article>
                  )}
                </div>
              </div>

              <div className={`news-container desktop-live-main-container ${is4k && 'ultra'}`}>
                <div className="home-top-container">
                  <div className="home-top-container-label">
                    {i18next.t("Article")}
                  </div>
                </div>
                {news.map((el) => el.id === currentNews &&
                  <div key={el.id} className="news-article-content">
                    <img
                      src={el.image}
                      className="news-article-image"
                      alt="news pic"
                    />
                    <h2 className="news-article-title">{el.title}</h2>
                    <div className="news-article-text">{el.text}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </IonContent>
      }
    </IonPage>
  )
}

export default News;
