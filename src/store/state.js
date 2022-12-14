const initialState = {
  providers: [
    {
      id: 1,
      name: 'main',
    }
  ],
  sports: [], 
  competitions: [],
  matches: [],
  bets: [],
  sportsId: 6046,
  matchId: '',
  liveWidgetMatchId: '',
  refreshSport: false,
  refreshMatchId: '',
  loader: false,
  toast: false,
  errorToast: false,
  toastText: '',
  errorToastText: '',
  token: "",
  currenciesList: [],
  paymentSystems: [],
  nonCryptoPaymentSystems: [],
  transactions: [],
  chatId: '',
  lob: false,
  betInput: '',
  user: {
    id: '',
    first_name: '',
    last_name: '',
    avatar: null,
    email: '',
    phone: '',
    countryCode: '',
    accountType: '',
    balance: '',
    balanceInfo: [],
    currency: '',
    day_limit_bet: '',
    day_limit_deposit: '',
    day_limit_withdrawal: '',
    week_limit_bet: '',
    week_limit_deposit: '',
    week_limit_withdrawal: '',
    month_limit_bet: '',
    month_limit_deposit: '',
    month_limit_withdrawal: '',
  },
  pusher: {},
  favFilter: '',
  betFilter: '',
  settings: {
    accent: {
      color: 'redux-accent-orange',
      isGradient: false
    },
    theme: {
      darkMode: true,
      accent: 'dark'
    },
    headerColorful: false,
    sendButton: 'redux-button-orange',
    fontSize: 'medium',
    interfaceView: 'Price',
    language: 'EN',
    dateFormat: 'DD.MM.YY',
    timeZone: 'auto',
    isComma: false,
    displayHandicap: 'plain',
    displayZeroHandicap: 'decimal',
    dealingView: 'cis',
    notifications: {
      allEnabled: false,
      favorite: false,
      chatMessages: false,
      results: false
    },
    markets: [
      { name: 'Under/Over - Home Team', active: true, sort: 1010 },
      { name: 'Under/Over - Away Team', active: true, sort: 1020 },
      { name: '1X2 Corners', active: true, sort: 4090 },
      { name: 'Corners Handicap', active: true, sort: 950 },
      { name: 'Total Corners', active: true, sort: 110 },
      { name: 'Double Chance', active: true, sort: 15 },
    ]
  },
  dropBets: false,
  liveEvents: [],
  favorites: [],
  width: window.innerWidth,
  menuState: false,
  betslip: [],
  betQuotes: '',
  temp_matches: [],
  eventDetails: {},
  quoteData: {},
  competitionId: 'all',
  competitionsDict: {},
  participants: {}
};

export default initialState;
