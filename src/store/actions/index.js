import types from "../constants/actionTypes.js";

/*api*/
export function setSportsList(data) {
  return {
    type: types.SET_SPORTS_LIST, data
  };
}
export function setSportsId(data) {
  return {
    type: types.SET_SPORTS_ID, data
  };
}
export function setMatchId(data) {
  return {
    type: types.SET_MATCH_ID, data
  };
}
export function setLiveWidgetMatchId(data) {
  return {
    type: types.SET_LIVE_WIDGET_MATCH_ID, data
  };
}
export function getEventDetails(data) {
  return {
    type: types.GET_EVENT_DETAILS, data
  };
}
export function getEvents(data) {
  return {
    type: types.GET_EVENTS, data
  };
}
export function getUserInfo(data) {
  return {
    type: types.GET_USER_INFO, data
  }
}
export function updateUserInfo(data) {
  return {
    type: types.UPDATE_USER_INFO, data
  }
}
/*api ends*/
export function toggleLOB(data) {
  return {
    type: types.TOGGLE_LOB, data
  };
}
export function setPusher(data) {
  return {
    type: types.SET_PUSHER, data
  };
}
export function filterEvents(data) {
  return {
    type: types.FILTER_EVENTS, data
  };
}
export function filterMatches(data) {
  return {
    type: types.SET_PUSHER, data
  };
}
export function mutateAllEvents(data) {
  return {
    type: types.MUTATE_ALL_EVENTS, data
  };
}
export function refreshSports(data) {
  return {
    type: types.REFRESH_SPORTS, data
  };
}
export function refreshMatch(data) {
  return {
    type: types.REFRESH_MATCH, data
  };
}
export function mutateEventDetails(data) {
  return {
    type: types.MUTATE_DETAILS, data
  };
}
export function mutateLiveEvents(data) {
  return {
    type: types.MUTATE_LIVE, data
  };
}
export function mutateEvents(data) {
  return {
    type: types.MUTATE_EVENTS, data
  };
}
export function setToken(data) {
  return {
    type: types.SET_TOKEN, data
  };
}
export function addBetslip(data) {
  return {
    type: types.ADD_BETSLIP, data
  };
}
export function editBetslip(data) {
  return {
    type: types.EDIT_BETSLIP, data
  };
}
export function addMatches() {
  return {
    type: types.ADD_MATCHES
  };
}
export function selectLive(data) {
  return {
    type: types.SELECT_LIVE, data
  };
}
export function clearAllBets(data) {
  return {
    type: types.CLEAR_ALL_BETS, data
  };
}
export function changeMenu(data) {
  return {
    type: types.CHANGE_MENU, data
  };
}
export function changeWidth(data) {
  return {
    type: types.CHANGE_WIDTH, data
  };
}

// InterfaceSettings
export function setAllInterfaceSettings(data) {
  return {
    type: types.SET_ALL_INTERFACE_SETTINGS, data
  };
}
export function changeAccent(data) {
  return {
    type: types.CHANGE_ACCENT, data
  };
}
export function changeTheme(data) {
  return {
    type: types.CHANGE_THEME, data
  };
}
export function changeSendButton(data) {
  // not use
  return {
    type: types.CHANGE_SEND_BUTTON, data
  };
}
export function changeFontSize(data) {
  return {
    type: types.CHANGE_FONT_SIZE, data
  };
}
export function changeInterfaceView(data) {
  return {
    type: types.CHANGE_INTERFACE_VIEW, data
  };
}
export function changeDealingView(data) {
  return {
    type: types.CHANGE_DEALING_VIEW, data
  };
}
export function setCommaSeparator(data) {
  return {
    type: types.SET_COMMA_SEPARATOR, data
  };
}
export function changeLanguage(data) {
  return {
    type: types.CHANGE_LANGUAGE, data
  };
}
export function changeDateFormat(data) {
  return {
    type: types.CHANGE_DATE_FORMAT, data
  };
}
export function changeTimeZone(data) {
  return {
    type: types.CHANGE_TIMEZONE, data
  };
}
export function setDisplayHandicap(data) {
  return {
    type: types.SET_DISPLAY_HANDICAP, data
  };
}
export function setDisplayZeroHandicap(data) {
  return {
    type: types.SET_DISPLAY_ZERO_HANDICAP, data
  };
}
export function setHeaderColorful(data) {
  return {
    type: types.SET_HEADER_COLORFUL, data
  };
}
export function setNotifications(data) {
  return {
    type: types.SET_NOTIFICATIONS, data
  };
}


export function toggleToast(data) {
  return {
    type: types.TOGGLE_TOAST, data
  };
}
export function toggleErrorToast(data) {
  return {
    type: types.TOGGLE_ERROR_TOAST, data
  };
}
export function toggleToastText(data) {
  return {
    type: types.TOGGLE_TOAST_TEXT, data
  };
}
export function toggleErrorToastText(data) {
  return {
    type: types.TOGGLE_ERROR_TOAST_TEXT, data
  };
}
export function toggleLoader(data) {
  return {
    type: types.TOGGLE_LOADER, data
  };
}
export function changeFavorite(data) {
  return {
    type: types.CHANGE_FAVORITE, data
  };
}
export function favoritesFilter(data) {
  return {
    type: types.SET_FAVFILTER, data
  };
}
export function betsFilter(data) {
  return {
    type: types.SET_BETFILTER, data
  };
}
export function setPaymentSystems(data) {
  return {
    type: types.SET_PAYMENT_SYSTEMS, data
  };
}
export function setNonCryptoPaymentSystems(data) {
  return {
    type: types.SET_NON_CRYPTO_PAYMENT_SYSTEMS, data
  };
}
export function setCurrencies(data) {
  return {
    type: types.SET_CURRENCIES, data
  };
}
export function setTransactions(data) {
  return {
    type: types.SET_TRANSACTIONS, data
  };
}
export function setChatId(data) {
  return {
    type: types.SET_CHAT_ID, data
  };
}
export function setQuoteData(data) {
  return {
    type: types.SET_QUOTE_DATA, data
  };
}
export function setBetQuotes(data) {
  return {
    type: types.SET_BET_QUOTES, data
  };
}
export function setCompetitionId(data) {
  return {
    type: types.SET_COMPETITION_ID, data
  };
}
export function setCompetitionsDict(data) {
  return {
    type: types.SET_COMPETITIONS_DICT, data
  };
}
export function setParticipants(data) {
  return {
    type: types.SET_PARTICIPANTS, data
  };
}
