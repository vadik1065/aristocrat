import initialState from '../state.js';

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAYMENT_SYSTEMS':
      return { ...state, paymentSystems: action.data }
    case 'SET_NON_CRYPTO_PAYMENT_SYSTEMS':
      return { ...state, nonCryptoPaymentSystems: action.data }
    case 'SET_CURRENCIES':
      return { ...state, currenciesList: action.data }
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.data }
    case 'SET_PUSHER':
      return { ...state, pusher: action.data };
    case 'SET_TOKEN':
      return { ...state, token: action.data };
    case 'SET_CHAT_ID':
      return { ...state, chatId: action.data };
    case 'SET_SPORTS_ID':
      return { ...state, sportsId: action.data };
    case 'SET_MATCH_ID':
      return { ...state, matchId: action.data };
    case 'SET_LIVE_WIDGET_MATCH_ID':
      return { ...state, liveWidgetMatchId: action.data };
    case 'GET_USER_INFO':
      return { ...state, user: Object.assign(state.user, {
        id: action.data.id,
        first_name: action.data.player.first_name,
        last_name: action.data.player.last_name,
        avatar: action.data.player.avatar,
        email: action.data.player.email,
        login: action.data.login,
        phone: action.data.player.phone,
        countryCode: action.data.player.country_code,
        accountType: action.data.player.player_status_id,
        mode2fa: action.data.player.mode2fa,
        currency: action.data.player.currency_id,
        balance: action.data.balance[0].ob_priv,
        balanceInfo: action.data.balance,
        day_limit_bet: action.data.player.day_limit_bet,
        day_limit_deposit: action.data.player.day_limit_deposit,
        day_limit_withdrawal: action.data.player.day_limit_withdrawal,
        week_limit_bet: action.data.player.week_limit_bet,
        week_limit_deposit: action.data.player.week_limit_deposit,
        week_limit_withdrawal: action.data.player.week_limit_withdrawal,
        month_limit_bet: action.data.player.month_limit_bet,
        month_limit_deposit: action.data.player.month_limit_deposit,
        month_limit_withdrawal: action.data.player.month_limit_withdrawal,
      })};
    case 'UPDATE_USER_INFO':
      let result = Object.assign(state.user, action.data)
      return { ...state, user: result };
    case 'CHANGE_WIDTH':
      return { ...state, width: action.data };

    case 'SET_ALL_INTERFACE_SETTINGS':
      let settings = {};
      if (action.data.player.settings && action.data.player.settings !== null) {
        settings = JSON.parse(action.data.player.settings);
      } else {
        settings = { ...state.settings };
      }
      return { ...state, settings: settings };
    case 'CHANGE_FONT_SIZE':
      return { ...state, settings: { ...state.settings, fontSize: action.data } };
    case 'CHANGE_ACCENT':
      let accentColor = {
        color: action.data,
        isGradient: action.data.includes('gradient')
      };
      // localStorage.setItem("accentColor", JSON.stringify(accentColor));
      return { ...state, settings: { ...state.settings, accent: accentColor } };
    case 'CHANGE_SEND_BUTTON':
      return { ...state, settings: { ...state.settings, sendButton: action.data } };
    case 'CHANGE_INTERFACE_VIEW':
      return { ...state, settings: { ...state.settings, interfaceView: action.data } };
    case 'CHANGE_LANGUAGE':
      return { ...state, settings: { ...state.settings, language: action.data } };
    case 'CHANGE_DATE_FORMAT':
      return { ...state, settings: { ...state.settings, dateFormat: action.data } };
    case 'CHANGE_TIMEZONE':
      return { ...state, settings: { ...state.settings, timeZone: action.data } };
    case 'CHANGE_DEALING_VIEW':
      return { ...state, settings: { ...state.settings, dealingView: action.data } };
    case 'SET_COMMA_SEPARATOR':
      // localStorage.setItem("isComma", action.data);
      return { ...state, settings: { ...state.settings, isComma: action.data } };
    case 'SET_DISPLAY_HANDICAP':
      // localStorage.setItem("displayHandicap", action.data);
      return { ...state, settings: { ...state.settings, displayHandicap: action.data } };
    case 'SET_DISPLAY_ZERO_HANDICAP':
      // localStorage.setItem("displayZeroHandicap", action.data);
      return { ...state, settings: { ...state.settings, displayZeroHandicap: action.data } };
    case 'SET_HEADER_COLORFUL':
      // localStorage.setItem("headerColorful", action.data);
      return { ...state, settings: { ...state.settings, headerColorful: action.data } };
    case 'SET_NOTIFICATIONS':
      // localStorage.setItem("notificationsEnabled", action.data);
      return { ...state, settings: { ...state.settings, notifications: action.data } };
    case 'CHANGE_THEME':
      // localStorage.setItem("theme", JSON.stringify(action.data));
      if (action.data.darkMode) {
        document.getElementsByTagName('body')[0].classList.add('dark');
      }
      if (!action.data.darkMode) {
        document.getElementsByTagName('body')[0].classList.remove('dark');
      }
      return { ...state, settings: { ...state.settings, theme: action.data } };
    case 'CHANGE_MENU':
      return { ...state, menuState: action.data };
    case 'TOGGLE_TOAST':
      return { ...state, toast: action.data };
    case 'TOGGLE_TOAST_TEXT':
      return { ...state, toastText: action.data };
    case 'TOGGLE_ERROR_TOAST_TEXT':
      return { ...state, errorToastText: action.data };
    case 'TOGGLE_ERROR_TOAST':
      return { ...state, errorToast: action.data };
    case 'TOGGLE_LOADER':
      return { ...state, loader: action.data };
    case 'SET_QUOTE_DATA':
      return { ...state, quoteData: action.data };
    case 'SET_BET_QUOTES':
      return { ...state, betQuotes: action.data };
    case 'SET_COMPETITIONS_DICT':
      return { ...state, competitionsDict: action.data };
    case 'SET_PARTICIPANTS':
      return { ...state, participants: action.data };
    case 'SET_SPORTS_LIST':
      return { 
        ...state, 
        sports: action.data.map(el => {
          return {
            id: el.id,
            cnt_inplay: el.cnt_inplay,
            cnt_prematch: el.cnt_prematch,
            image: el.image,
            name: el.name,
            provider_id: 1
          }
        })
      };
    case 'SET_COMPETITION_ID':
      return { ...state, competitionId: action.data };
    case 'GET_EVENTS':
      let competitions = state.competitions.slice();
      let matches = state.matches.slice();
      let bets = state.bets.slice();

      for (let idx in action.data) {
        let el = action.data[idx];
        if (!competitions.some(comp => comp.id === el.competition_id)) {
          competitions = [
            ...competitions,
            {
              id: el.competition_id,
              sport_id: el.sport_id,
              name: el.competitionname
            }
          ]
        }

        let t_mark = []
        for (let i in el.Markets) {
          let mark_el = el.Markets[i];
          // if (!markets.some(mark => mark.id === mark_el.market_id+'_'+mark_el.provider_id)) {
          //   markets = [
          //     ...markets,
          //     {
          //       id: mark_el.market_id+'_'+mark_el.provider_id,
          //       market_name: mark_el.market_name
          //     }
          //   ]
          // }
          t_mark = Array.from(new Set([...t_mark, mark_el.market_name]))
          let bet_id = (el.id).toString()+'_'+(mark_el.market_name).toString()+'_'+(mark_el.bet_name).toString()+'_'+mark_el.line;
          if (!bets.some(bet => bet.id === bet_id)) {
            bets = [
              ...bets,
              {
                id: bet_id,
                bet_id: (mark_el.bet_id).toString(),
                match_id: el.id,
                provider_id: mark_el.provider_id,
                market_id: mark_el.market_id+'_'+mark_el.provider_id,
                market_name: mark_el.market_name,
                name: mark_el.bet_name,
                line: mark_el.line,
                provider_name: mark_el.provider_name,
                status: mark_el.status,
                price: mark_el.price,
                sort: mark_el.sort
              }
            ]
          } else {
            let idx = bets.findIndex(bet => bet.id === bet_id);
            bets[idx].status = mark_el.status;
            bets[idx].price = mark_el.price;
          }
        }

        if (!matches.some(match => match.id == el.id)) {
          matches = [
            ...matches,
            {
              id: el.id,
              competition_id: el.competition_id,
              competition_name: el.competitionname,
              sport_id: el.sport_id,
              name: el.name,
              starttime: el.starttime,
              favorite: el.favorite,
              matchstatus: el.matchstatus == 9 ? 1 : el.matchstatus,
              matchsummary: el.matchsummary,
              team1: el.team1,
              team1_id: el.team1_id,
              team2: el.team2,
              team2_id: el.team2_id,
              markets: t_mark
            }
          ]
        } else {
          let idx = matches.findIndex(match => match.id == el.id);
          matches[idx].matchstatus = el.matchstatus == 9 ? 1 : el.matchstatus;
          matches[idx].matchsummary = el.matchsummary;
        }
      }

      return { 
        ...state,
        competitions: competitions,
        matches: matches,
        bets: bets
      }
    case 'MUTATE_ALL_EVENTS':
      let sports = state.sports.slice();
      let competits = state.competitions.slice();
      let matchs = state.matches.slice();
      let bts = state.bets.slice();

      if (matchs.find(match => match.sport_id == action.data.Sport_id) != undefined) {
        if (matchs.find(match => match.id == action.data.FixtureId) === undefined) { // Если матча нет, то перезапрашиваем list-sports и get-events
          return { ...state, refreshSport: true };
        } else if (action.data.BetsRemoved) { // Если есть BetsRemoved, то удаляем их у нас
          let arrIds = action.data.BetsRemoved.map(el => el.bet_id);
          return {
            ...state,
            bets: [ ...bts.filter(bet => !arrIds.includes(bet.bet_id)) ]
          }
        } else if (action.data.Livescore?.Scoreboard?.Status == 3 && (!action.data.Markets || action.data.Markets == null)) {
          // Если у пришедшего статус = 3 (закончен), то у sports уменьшаем cnt_prematch/cnt_inplay на 1
          let matc_status = matchs.find(match => match.id == action.data.FixtureId).matchstatus;
          let sport_id = matchs.find(match => match.id == action.data.FixtureId).sport_id;
          let sport = sports.find(sport => sport.id == sport_id);
          if (matc_status == 1) {
            sport.cnt_prematch -= 1;
          } else if (matc_status == 2) {
            sport.cnt_inplay -= 1;
          } else {
            return { ...state, refreshSport: true };
          }
  
          // и обновляем sports, competitions, bets, matches и betslip
          let matchesFiltered = matchs.filter(match => match.id != action.data.FixtureId);
          return { 
            ...state, 
            sports: [...sports.filter(sport => sport.id != sport_id), sport],
            competitions: competits.filter(comp => matchesFiltered.filter(m => m.competition_id == comp.id).length > 0),
            bets: bts.filter(bet => bet.match_id != action.data.FixtureId), 
            matches: matchesFiltered,
            betslip: [...state.betslip.filter(el => el.matchId != action.data.FixtureId)]
          };
        } else if (action.data.Livescore?.Scoreboard?.Status == 2 && (!action.data.Markets || action.data.Markets == null)) {
          // Если у пришедшего статус = 2 (live), а у нашего матча был статус != 2, то ставим нашему статус = 2
          if (matchs.find(el => el.id == action.data.FixtureId).matchstatus == 2 && action.data.Livescore.Scoreboard.matchsummary) {
            return { 
              ...state, 
              matches: state.matches.map(match => {
                if (match.id == action.data.FixtureId) {
                  return {
                    ...match,
                    matchsummary: action.data.Livescore.Scoreboard.matchsummary
                  };
                } else {
                  return match
                }
              })
            }
          } else if (matchs.find(el => el.id == action.data.FixtureId).matchstatus != 2) {
            return { 
              ...state, 
              matches: state.matches.map(match => {
                if (match.id == action.data.FixtureId) {
                  return {
                    ...match,
                    matchstatus: 2
                  };
                } else {
                  return match
                }
              })
            }
          } else {
            return state
          }
        } else if (action.data.Markets !== null) {
          let i = matchs.findIndex((match) => match.id == action.data.FixtureId);
  
          let mutated = action.data.Markets.map(el => {    
            if (!matchs[i].markets.some(mark => mark == el.market_name)) {
              matchs[i].markets = [...matchs[i].markets, el.market_name];
            }
            return {
              id: (action.data.FixtureId).toString()+'_'+(el.market_name).toString()+'_'+(el.bet_name).toString()+'_'+el.line,
              bet_id: el.bet_id.toString(),
              match_id: action.data.FixtureId,
              provider_id: el.provider_id,
              market_id: el.market_id+'_'+el.provider_id,
              market_name: el.market_name,
              name: el.bet_name,
              line: el.line,
              provider_name: el.provider_name,
              status: el.status,
              price: el.price
            }
          });
  
          let ids = mutated.map(el => el.id);
          bts = bts.filter(el => !ids.includes(el.id));
          let newBets = [...bts, ...mutated];
          return { ...state, bets: newBets, matches: matchs };
        } else {
          return state;
        }
      } else {
        return state;
      }
    case 'REFRESH_SPORTS':
      return { ...state, refreshSport: action.data };
    case 'REFRESH_MATCH':
      return { ...state, refreshMatchId: action.data };
    case 'TOGGLE_LOB':
      return { ...state, lob: action.data };
    case 'ADD_BETSLIP':
      // Если нет и кнопки, и матча, добавляем эвент
      if (!state.betslip.some(el => el.buttonId === action.data.buttonId) && !state.betslip.some(el => el.matchId === action.data.matchId)) {
        return { ...state, betslip: [...state.betslip, action.data], refreshMatchId: action.data.matchId };
      }
      // Если есть кнопка, удаляем эвент
      if (state.betslip.some(el => el.buttonId === action.data.buttonId)) {
        let newButton = state.betslip.find(el => el.buttonId === action.data.buttonId).buttonId;
        return { ...state, betslip: state.betslip.filter(elem => elem.buttonId !== newButton) };
      }
      // Если нет кнопки, но есть матч, удаляем матч, затем добавляем эвент
      if (!state.betslip.some(el => el.buttonId === action.data.buttonId) && state.betslip.some(el => el.matchId === action.data.matchId)) {
        let newMatch = state.betslip.find(el => el.matchId === action.data.matchId).matchId;
        let tempBetslip = state.betslip.filter(elem => elem.matchId !== newMatch);
        tempBetslip = [...tempBetslip, action.data];
        return { ...state, betslip: tempBetslip, refreshMatchId: action.data.matchId };
      } 
    case 'CLEAR_ALL_BETS':
      return { ...state, betslip: [], dropBets: action.data };
    case 'CHANGE_FAVORITE':
      console.log(action.data);
      return {
        ...state, 
        matches: state.matches.map(el => {
          if (el.id === action.data.id) {
            return {
              ...el,
              favorite: action.data.favorite
            };
          } else {
            return el
          }
        })
      }










      
    case 'GET_EVENT_DETAILS':
      if (action.data.id) {
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        let obj = {
          id: action.data.id,
          tags: action.data.event.Markets.map(el => el.Tags.name).filter(onlyUnique),
          types: action.data.event.Markets.map(el => el.Tags.type).filter(onlyUnique),
          team1Id: action.data.event.Participants[0].Tags.SSLNParticipantID,
          team2Id: action.data.event.Participants[1].Tags.SSLNParticipantID,
          team1: action.data.event.Participants[0].Name,
          team2: action.data.event.Participants[1].Name,
          team1Img: 'team1.png',
          team2Img: 'team2.png',
          tournamentId: action.data.event.Tags.CompetitionId,
          tournament: action.data.event.Tags.CompetitionName,
          matchstatus: action.data.event.MatchStatus,
          time: action.data.event.StartTime,
          bets: action.data.event.Markets
            .map(market => market.Tags.type)
            .filter(onlyUnique)
            .map(item => {
              var arr = [];
              action.data.event.Markets.map(el => {
                if (el.Tags.type === item) {
                  el.Selections.map(element => {
                    let tmp = {
                      Price: element.Price,
                      price_american: element.price_american,
                      price_british: element.price_british,
                      price_hongkong: element.price_hongkong,
                      price_indonesian: element.price_indonesian,
                      price_malay: element.price_malay,
                    }
                    arr.push({
                      id: element.Id,
                      title: element.Tags.name,
                      // value: getPrice(tmp),
                      // value: element[state.settings.interfaceView],
                      value: element.Price,
                      price: tmp,
                      tradable: element.Tradable,
                      fixture_id: action.data.event.Id,
                      market_id: el.Id
                    })
                  });
                };

              });
              let obj = {
                name: item,
                list: arr,
              }
              return obj
            })
        }
        // console.log(obj)
        return { ...state, eventDetails: obj }
      } else {
        // console.log(2);
        return { ...state, eventDetails: [] }
      }
    case 'MUTATE_LIVE':
      let mutBetslip = state.betslip;
      let tempLive = state.liveEvents;
      action.data.filter(el => el.matchstatus === 50).forEach(matchElement => {
        //удаляем матч из списка
        // let removeIndex = tempLive.indexOf(tempLive.find((el) => el.id === action.data.find(elem => elem.id).id));
        let removeIndex = tempLive.indexOf(tempLive.find((el) => el.id === matchElement.id));
        mutBetslip = mutBetslip.filter(item => item.matchId !== matchElement.id)
        tempLive.splice(removeIndex, 1);
      })

      if (!action.data.some(el => el.matchstatus === 50) && tempLive.some((el) => el.id === action.data.find(elem => elem.id).id)) {
        //мутируем состояние существующих событий
        let mutated = action.data.map(element => {
          if (element.Markets.length > 0) {
            let arr = []
            element.Markets.map(elem => {
              elem.Selections.map(el => {
                mutBetslip.filter(it => it.buttonId === el.Id).forEach(matched => {
                  matched.value = el.Price
                })
              
                let tmp = {
                  Price: el.Price,
                  price_american: el.price_american,
                  price_british: el.price_british,
                  price_hongkong: el.price_hongkong,
                  price_indonesian: el.price_indonesian,
                  price_malay: el.price_malay,
                }
                arr.push({
                  id: el.Id,
                  // value: getPrice(tmp),
                  // value: el[state.settings.interfaceView],
                  value: el.Price,
                  price: tmp,
                  tradable: el.Tradable,
                  summary: element.matchsummary
                });
              })
            });
            return arr
          } else {
            return element.Markets
          }
        });

        mutated[0].forEach(mutatedElement => {
          tempLive.forEach(element => {
            if (element.underOver) {
              element.underOver.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary
                }
              })
            }
            if (element.handicap) {
              element.handicap.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary;
                }
              })
            }
            if (element.money_line) {
              element.money_line.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary;
                }
              })
            }

          })
        });
      }
      return { ...state, ...state.liveEvents = tempLive, ...state.betslip = mutBetslip }
    case 'MUTATE_EVENTS':
      let mutateBetslip = state.betslip;
      let tempEvents = state.temp_matches;

      // Пока не работает, с сервака не приходит последний сокет со сменой статуса
      // action.data.filter(el => el.matchstatus === 50).forEach(matchElement => {
      //   //удаляем матч из списка
      //   let removeIndex = tempEvents.indexOf(tempEvents.find((el) => el.id === matchElement.id));
      //   mutateBetslip = mutateBetslip.filter(item => item.matchId !== matchElement.id)
      //   tempEvents.splice(removeIndex, 1);
      // })

      if (!action.data.some(el => el.matchstatus === 50) && tempEvents.some((el) => el.id === action.data.find(elem => elem.id).id)) {
        //мутируем состояние существующих событий
        let mutated = action.data.map(element => {
          if (element.Markets.length > 0) {
            let arr = []
            element.Markets.map(elem => {
              elem.Selections.map(el => {
                mutateBetslip.filter(it => it.buttonId === el.Id).forEach(matched => {
                  matched.value = el.Price
                })
              
                let tmp = {
                  Price: el.Price,
                  price_american: el.price_american,
                  price_british: el.price_british,
                  price_hongkong: el.price_hongkong,
                  price_indonesian: el.price_indonesian,
                  price_malay: el.price_malay,
                }
                arr.push({
                  id: el.Id,
                  value: el.Price,
                  price: tmp,
                  tradable: el.Tradable,
                  summary: element.matchsummary
                });
              })
            });
            return arr
          } else {
            return element.Markets
          }
        });

        mutated[0].forEach(mutatedElement => {
          tempEvents.forEach(element => {
            if (element.underOver) {
              element.underOver.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary
                }
              })
            }
            if (element.handicap) {
              element.handicap.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary;
                }
              })
            }
            if (element.money_line) {
              element.money_line.forEach(elem => {
                if (elem.id === mutatedElement.id) {
                  elem.value = mutatedElement.value;
                  element.summary = mutatedElement.summary;
                }
              })
            }

          })
        });
      }
      return { ...state, ...state.temp_matches = tempEvents, ...state.betslip = mutateBetslip }
    case 'MUTATE_DETAILS':
      let betslip = state.betslip;
      betslip.map(it => {
        action.data.map(but => {
          if (it.buttonId === but.id) {
            it.value = but.value
          }
        })
      })
      let test = {};
      test.eventDetails = state.eventDetails.bets;
      // if (test.eventDetails.id) {
      test.eventDetails.map(element => {
        //list внутри
        element.list.map(elem => {
          //мутированный
          action.data.map(el => {
            if (elem.id === el.id) {
              elem.value = el.value;
              elem.tradable = el.tradable
            }
          })
        })
      })
      // }
      return { ...state, ...state.eventDetails = test.eventDetails, ...state.betslip = betslip };
    case 'ADD_MATCHES':
      return { ...state, matches: [...state.matches, ...state.matches] };
    case 'EDIT_BETSLIP':
      let arrId = action.data;
      let newArr = state.betslip.filter(el => !arrId.includes(el.betId));
      return { ...state, betslip: newArr };
    case 'SELECT_LIVE':
      let id_index = state.betCardLive.map(e => e.id).indexOf(action.data.id);
      /*добавляем новый элемент в массив */
      // console.log(state.betCardLive[id_index].type === action.data.type);
      if (id_index === -1) {
        let obj;

        state.temp_matches.forEach((item, i) => {
          if (action.data.id === item.id) {
            item.bets.forEach((el) => {
              if (el.value === action.data.value) {
                obj = {
                  id: item.id,
                  item: item,
                  value: action.data.value,
                  type: action.data.type
                };
              }
            });
          }
        });
        return { ...state, betCardLive: [...state.betCardLive, obj] };
        /*убираем существующий элемент*/
      } if (id_index !== -1 &&
        state.betCardLive[id_index].type === action.data.type &&
        state.betCardLive[id_index].value === action.data.value
      ) {
        let arr = state.betCardLive;
        const cloneRecipes = [...arr];
        cloneRecipes.splice(id_index, 1);
        return { ...state, betCardLive: cloneRecipes }
        /*переключаем на другой элемент с таким же id*/
      } else {
        let arr = state.betCardLive;
        const cloneRecipes = [...arr];

        state.liveGames.forEach((item, i) => {
          if (action.data.id === item.id) {
            item.money_line.forEach((el) => {
              if (el.value === action.data.value) {
                cloneRecipes.splice(id_index, 1, {
                  id: item.id,
                  item: item,
                  value: action.data.value,
                  type: action.data.type
                });
              }
            });
          }
        });
        return { ...state, betCardLive: cloneRecipes };
      };
    case 'SET_FAVFILTER':
      return { ...state, favFilter: action.data };
    case 'SET_BETFILTER':
      return { ...state, betFilter: action.data };
    default:
      return state;
  }
}

export default rootReducer;
