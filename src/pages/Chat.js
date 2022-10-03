import React, { useState, useEffect, useRef, Fragment } from 'react';
import {
  IonContent, IonSegment, IonSegmentButton, IonLabel,
  IonPage, IonSearchbar, useIonViewWillEnter, IonRadioGroup, IonItem, IonRadio, IonPopover, useIonViewWillLeave
} from "@ionic/react";
import { useDispatch, useSelector } from 'react-redux';
import IncomingMessage from '../components/chat/IncomingMessage.js';
import OutgoingMessage from '../components/chat/OutgoingMessage.js';
import OutgoingMessageDesktop from '../components/chat/OutgoingMessageDesktop.js';
import IncomingMessageDesktop from '../components/chat/IncomingMessageDesktop.js';
import ChatSidebar from '../components/chat/ChatSidebar.js';
import { ReactComponent as Userpic } from '../images/userpic.svg';
import bell from "../images/bell.svg";
import bellDisabled from "../images/bell-disabled.svg";
import help from "../images/help.svg";
import { ReactComponent as Help } from '../images/help.svg';
import search from "../images/search-gray.svg";
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { ReactComponent as Clock } from '../images/clock.svg';
import { ReactComponent as SelectArrows } from '../images/select-arrows.svg';
import { ReactComponent as SendArrowMob } from '../images/arrow-up.svg';
import { ReactComponent as SendArrowTablet } from '../images/send.svg';
import { ReactComponent as TextSizeIcon } from '../images/text-size.svg';

import plus from "../images/plus.svg";
import '../css/chat.css';
import * as API from '../api/functions.js'
import moment from 'moment';
import i18next from 'i18next';
import ChatTextSizeModal from '../components/chat/ChatTextSizeModal.js';
import { radioList } from '../utils/utils.js';
import useUpdateSettings from '../hooks/useUpdateSettings.js';
import { setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from '../store/actions/index.js';
import { getFirebaseToken } from '../firebase.js';

const Chat = (props) => {
  const dispatch = useDispatch();
  const width = useSelector(state => state.width);
  const sendColor = useSelector(state => state.settings.sendButton);
  const _chatId = useSelector(state => state.chatId);
  const [chatId, setChatId] = useState('');
  const token = useSelector(state => state.token);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const darkMode = useSelector(state => state.settings.theme.darkMode);
  const isMobile = width <= 767;
  const isTablet = width <= 1024 && width > 767;
  const isDesktop = width >= 1025 && width < 3400;
  const is4k = width >= 3400;
  const settings = useSelector(state => state.settings);
  const notifications = useSelector(state => state.settings.notifications);
  const fontSize = useSelector(state => state.settings.fontSize);
  const { updateSettings } = useUpdateSettings();
  const [segmentValue, setSegmentValue] = useState('general');
  const [tab, setTab] = useState('General');
  const messagesEndRef = useRef(null);
  const messagesSearchRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [curMessagesQuantity, setCurMessagesQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  const [searchText, setSearchText] = useState('');
  const [nextSearch, setNextSearch] = useState(0);
  const greeting = 'Welcome to chat support! Feel free to ask us about our platform.'
  let chat = document.getElementById('chat');

  function changeFont(val) {
    updateSettings({ fontSize: val });
  }


  useIonViewWillEnter(() => {
    if (chatId !== '') {
      API.getMessages(token, chatId).then(res => {
        if (res.data.data !== null) {
          setMessages(res.data.data[0].messages)
        } else {
          setMessages([{
            in: 1,
            text: greeting,
            time: moment(new Date()).unix()
          }])
        }

      })
    }
  }, [chatId])


  useEffect(() => {
    if (messages.length > 0) {
      if (curMessagesQuantity !== messages.length) {
        scrollToBottom();
      }
      const interval = setInterval(() => {
        API.getMessages(token, chatId).then(res => {
          if (res.data.data !== null) {
            setMessages(res.data.data[0].messages)
          } else {
            setMessages([{
              in: 1,
              text: greeting,
              time: moment(new Date()).unix()
            }])
          }
        })
      }, 30000);
      return () => clearInterval(interval);
    }
    // let timerId = setInterval(doAgain, 3000);
  }, [messages]);

  useEffect(() => {
    setCurMessagesQuantity(messages.length);
  }, [messages.length]);


  useEffect(() => {
    setChatId(_chatId);
    if (_chatId !== '') {
      API.getMessages(token, _chatId).then(res => {
        if (res.data.data !== null) {
          setMessages(res.data.data[0].messages)
        } else {
          setMessages([{
            in: 1,
            text: greeting,
            time: moment(new Date()).unix()
          }])
        }
      })
    }
  }, [_chatId]);


  useIonViewWillLeave(() => {
    setSearchText('');
  });


  // start search message functional
  useEffect(() => {
    if (searchText) {
      scrollToMessage();
    }
    if (!searchText) {
    }
    setNextSearch(0);
  }, [searchText]);

  function scrollToMessage() {
    setTimeout(() => {
      if (messagesSearchRef?.current?.className.includes('found')) {
        messagesSearchRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
  
  let quantityRefs = 0;
  function setRef(text) {
    if (searchText.length >= 2 && text.includes(searchText)) {
      quantityRefs++;
      return quantityRefs === nextSearch ? messagesSearchRef : null;
    }
  }

  function nextSearchHandler(val) {
    if (val === 'Enter') {
      if (quantityRefs === nextSearch) {
        setNextSearch(1);
      } else {
        setNextSearch(prev => prev + 1);
      }
      scrollToMessage();
    }
  }
  // end search message functional

  
  function sendMessage() {
    if (inputValue !== '') {
      API.sendMessage(token, chatId, inputValue).then(() => {
        API.getMessages(token, chatId).then(res => {
          setMessages(res.data.data[0].messages)
        })
      }
      )
      setInputValue('');
    }
  }


  const scrollUp = () => {
    let element = document.getElementById('chat');
    element.scrollTo({ top: 0, behavior: 'smooth' });
  }


  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function updateChatNotifications() {
    let temp = {
      chatMessages: !notifications.chatMessages,
      allEnabled: notifications.allEnabled,
      favorite: notifications.favorite,
      results: notifications.results
    }

    if (temp.chatMessages || temp.favorite || temp.results) {
      temp.allEnabled = true;
    }

    if (!temp.chatMessages && !temp.favorite && !temp.results) {
      temp.allEnabled = false;
    }

    let data = {
      interface_settings: {
        ...settings,
        notifications: temp
      }
    };

    API.updateProfile(token, data).then(() => {
      API.getInfo(token).then(response => {
        if (temp.allEnabled) {
          getFirebaseToken(token);
        }
        dispatch(toggleToastText(i18next.t(`Push notifications are ${temp.chatMessages ? 'enabled' : 'disabled'}.`)));
        dispatch(toggleToast(true));
        dispatch(setAllInterfaceSettings(response));
      })
    }).catch(() => {
      dispatch(toggleErrorToastText('Something went wrong.'));
      dispatch(toggleErrorToast(true));
    })
  }

  return (
    <IonPage>

      {isMobile &&
        <IonContent className={`chat-content desktop-main-page ${themeAccent}`} id="main">
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <div className="chat-container flex">
            {/* <div className="chat-toggle">
              <IonSegment
                mode={"ios"}
                value={segmentValue}
                className="home-top-segment"
                onIonChange={e => setSegmentValue(e.detail.value)}
              >
                <IonSegmentButton type={"button"} value="general">
                  <IonLabel>General</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton type={"button"} value="soon">
                  <IonLabel>Support</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton type={"button"} value="today">
                  <IonLabel>Finances</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div> */}
            <div id={'chat'} className={"chat-window " + (fontSize)}>
              {
                messages.map((el, i) => {
                  if (el.in === 1) {
                    return (
                      <IncomingMessage key={i} text={el.text} time={el.time} />
                    )
                  } else {
                    return (
                      <OutgoingMessage key={i} text={el.text} time={el.time} />
                    )
                  }
                })
              }
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
                <button type="submit" className={"send-button " + (sendColor)} onClick={() => sendMessage()}>
                  <SendArrowMob />
                </button>
                <input
                  placeholder={i18next.t("Type something...")}
                  className="chat-input"
                  mode={'md'}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)} />
              </form>

            </div>
          </div>
          <ChatTextSizeModal
            open={showModal}
            close={setShowModal}
            radioList={radioList}
          />
        </IonContent>
      }

      {isTablet &&
        <IonContent className={`desktop-main-page ${themeAccent}`} id="main">
          <div className="main-tablet">
            {/* <IonSegment
              mode={"ios"}
              value={segmentValue}
              className="home-top-segment chat-tablet"
              onIonChange={(e) => setSegmentValue(e.detail.value)}
            >
              <IonSegmentButton value="general">
                <IonLabel>General</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="soon">
                <IonLabel>Support</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="today">
                <IonLabel>Finances</IonLabel>
              </IonSegmentButton>
            </IonSegment> */}
            <div className="tablet-chat-container flex">
              <div className="tablet-chat-header flex">
                <div className="tablet-chat-header-left flex">
                  <div className="tablet-chat-header-label">
                    {i18next.t("Chat")}
                  </div>
                  <div className="calendar-container flex">
                    <Clock className="filters-icon" />
                    <div className="calendar-label">
                      {i18next.t("Set date")}
                    </div>
                    <SelectArrows className="filters-icon" />
                  </div>
                </div>
                <div className="tablet-chat-header-right flex">
                  <img 
                    className="tablet-chat-notice" 
                    src={bell} 
                    alt="bell" 
                    onClick={() => updateChatNotifications()}
                  />

                  <IonSearchbar
                    className="searchbar"
                    search-icon={search}
                    placeholder={i18next.t("Search in chat")}
                    showCancelButton="never"
                    value={searchText}
                    onIonChange={e => setSearchText(e.detail.value)}
                    onKeyDown={e => nextSearchHandler(e.key)}
                  >
                    <div className="search-next" onClick={() => nextSearchHandler('Enter')}></div>
                  </IonSearchbar>

                  <Help 
                    className={`desktop-chat-help ${popoverState.showPopover && darkMode ? 'white' : ''} ${popoverState.showPopover && !darkMode ? 'black' : ''}`} 
                    onClick={(e) => {
                      e.persist();
                      setShowPopover({ showPopover: true, event: e })
                    }}
                  />

                  <div className="chat-textsize-panel">
                    <div className="chat-textsize-title" onClick={() => setShowModal(true)}>
                      <TextSizeIcon />
                      {i18next.t("Text size")}
                    </div>
                  </div>
                </div>
              </div>
              <div id={'chat'} className={"chat-window tablet-chat-window " + (fontSize)}>
                {
                  messages.map((el, i) => {
                    if (el.in === 1) {
                      return (
                        <IncomingMessageDesktop 
                          key={i} 
                          text={el.text} 
                          time={el.time} 
                          setRef={setRef} 
                          searchText={searchText} 
                        />
                      )
                    } else {
                      return (
                        <OutgoingMessageDesktop 
                          key={i} 
                          text={el.text} 
                          time={el.time} 
                          setRef={setRef} 
                          searchText={searchText} 
                        />
                      )
                    }
                  })
                }
                <div ref={messagesEndRef} />
              </div>

              <div
                className="go-top-btn flex"
                onClick={scrollUp}
              >
                <Arrow className="arrow-down" />
              </div>

              <div className="tablet-input-area-container flex">
                <div className="chat-add-container flex">
                  <img src={plus} alt="plus" />
                </div>
                <form onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
                  {/* <button type="submit" className="send-button" onClick={() => sendMessage()}></button> */}
                  <input
                    placeholder={i18next.t("Type something...")}
                    className="tablet-chat-input"
                    mode={'md'}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)} />
                  <button type="submit" className={"send-button tablet " + (sendColor)} onClick={() => sendMessage()}>
                    <SendArrowTablet />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ChatTextSizeModal
            open={showModal}
            close={setShowModal}
            radioList={radioList}
          />
        </IonContent>
      }

      {
        (isDesktop || is4k) &&
        <IonContent className='desktop-main-page' id="main">
          <div className={`main-big ${themeAccent}`}>
            {/* <ChatSidebar tab={tab} setTab={setTab} /> */}

            <div className={`chat-container-wrapper ${themeAccent} ${is4k && 'ultra'}`}>
              <div className="chat-container desktop-live-main-container">
                <div className="desktop-chat-header flex">
                  <div className="desktop-chat-header-left flex">
                    <div className="desktop-chat-userpic flex">
                      <Userpic />
                    </div>
                    <div className="desktop-chat-header-label">{tab}</div>
                  </div>

                  <div className="desktop-chat-header-right flex">
                    <div className="chat-textsize-panel">
                      <div className="chat-textsize-title" >
                        <TextSizeIcon />
                        {i18next.t("Text size")}
                      </div>
                      <div className="interface-textsize-list">
                        <IonRadioGroup
                          value={fontSize}
                          onIonChange={e => changeFont(e.detail.value)}
                        >
                          {radioList.map((el, i) => (
                            <IonItem key={i}>
                              <IonRadio slot="start" value={el.value} mode="md" />
                              <IonLabel>{el.title}</IonLabel>
                            </IonItem>
                          ))}
                        </IonRadioGroup>
                      </div>
                    </div>
                    <div className="desktop-chat-notice-container">
                      <img 
                        className={`desktop-chat-notice ${notifications.chatMessages ? '' : 'dis'}`} 
                        src={notifications.chatMessages ? bell : bellDisabled} 
                        alt="bell" 
                        onClick={() => updateChatNotifications()}
                      />
                    </div>

                    <IonSearchbar
                      className="searchbar"
                      search-icon={search}
                      placeholder={i18next.t("Search in chat")}
                      showCancelButton="never"
                      value={searchText}
                      onIonChange={e => setSearchText(e.detail.value)}
                      onKeyDown={e => nextSearchHandler(e.key)}
                    >
                      <div className="search-next" onClick={() => nextSearchHandler('Enter')}></div>
                    </IonSearchbar>

                    <Help 
                      className={`desktop-chat-help ${popoverState.showPopover && darkMode ? 'white' : ''} ${popoverState.showPopover && !darkMode ? 'black' : ''}`} 
                      onClick={(e) => {
                        e.persist();
                        setShowPopover({ showPopover: true, event: e })
                      }}
                    />
                  </div>
                </div>
                <div id={'chat'} className={"chat-window desktop-chat-window " + (fontSize)}>
                  {
                    messages.map((el, i) => {
                      if (el.in === 1) {
                        return (
                          <IncomingMessageDesktop 
                            key={i} 
                            text={el.text} 
                            time={el.time} 
                            setRef={setRef} 
                            searchText={searchText} 
                          />
                        )
                      } else {
                        return (
                          <OutgoingMessageDesktop 
                            key={i} 
                            text={el.text} 
                            time={el.time} 
                            setRef={setRef}
                            searchText={searchText} 
                          />
                        )
                      }
                    })
                  }
                  <div ref={messagesEndRef} />
                </div>

                <div
                  className="go-top-btn flex"
                  onClick={scrollUp}
                >
                  <Arrow className="arrow-down" />
                </div>

                <div className="desktop-input-area-container flex">
                  <div className="chat-add-container flex">
                    <img src={plus} alt="plus" />
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
                    {/* <button type="submit" className="send-button" onClick={() => sendMessage()}></button> */}
                    <input
                      placeholder={i18next.t("Type something...")}
                      className="desktop-chat-input"
                      mode={'md'}
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      }

      <IonPopover
        mode="ios"
        cssClass={`help-popover ${themeAccent}`}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        <div className="help-popover-container" >
          <p>You can place single-bet and multi-bet via chat.</p>
          <p>To place a single bet on a match, you need to write a message in the following format:</p>
          <p><span>Team name</span></p>
          <p><span>Result (win / lose / draw / etc.)</span></p>
          <p><span>Bet amount</span></p>
          <p className="mt-20">For a multi-bet, write in the format:</p>
          <p><span>Team-1 Result, Team-2 Result, Team-N Result, Bet Amount</span></p>
          <p className="mt-20">Then send a message, our manager will process it and accept your bet, as well as report the result at the end of the match.</p>
        </div>
      </IonPopover>
    </IonPage >
  )
}

export default Chat;
