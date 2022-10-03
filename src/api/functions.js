import axios from 'axios';
import url from '../axios.js';
import FP from '@fingerprintjs/fingerprintjs-pro'
// import Pusher from 'pusher-js';
const { v4: uuidv4 } = require('uuid');
axios.interceptors.response.use(response => {
  if (response.data.message === "Unauthenticated.") {
    console.log("Unauthenticated.");
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href="/login";
    
  }
  return response;
}, function (error, response) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
        localStorage.clear();
        window.location.href="/login";
    }
   return Promise.reject(error);

 });
export async function login(username, password){
  var uuid = uuidv4();
  let requestMetadata = { UUID: uuid };
  async function sendInfo() {
    let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
    let response = await fp.get({ tag: requestMetadata, callbackData: true });
    return response;
  }
  let response;
    response = await axios({
      method: 'post',
      url: url + "/api/login",
      data: {
        password: password,
        login: username,
        uuid: uuid
      }
    });
  sendInfo();
  return response;
};
export async function confirmLogin(login, password, confirmation) {
  let response = axios({
    method: 'post',
    url: url + '/api/login/confirm',
    data: {
      login,
      password,
      confirmation
    }
  })
  return response;
};
export async function set2faMode(token, mode2fa) {
  let response = axios({
    method: 'post',
    url: url + '/api/set-2fa-mode',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      mode2fa: Number(mode2fa)
    }
  })
  return response;
};
export async function confirm2faMode(token, mode2fa, confirmation) {
  let response = axios({
    method: 'post',
    url: url + '/api/confirm-2fa-mode',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      mode2fa: Number(mode2fa),
      confirmation
    }
  })
  return response;
};
export async function updateProfile(token, obj){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/update-profile',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: obj
    })
  return response;
};
export async function getCryptoPaymentSystemList(token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/get-paymentsystem-list',
      headers: {
           'Authorization': `Bearer ${token}`,
       }
    })
  return response.data.data.listPaymentSystem;
};
export async function getNonCryptoPaymentSystemList(token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/list-payment-details',
      headers: {
           'Authorization': `Bearer ${token}`,
       }
    })
  return response.data.data.list;
};
export async function setPaymentsDetails(token, obj) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/set-payments-details',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: obj
    })
  return response;
};
export async function restorePassword(email) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/restore-password',
      data: {
        restore: email
      }
    })
  return response;
};
export async function updatePassword(obj) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/restore-confirm',
      data: obj
    })
  return response;
};
// list-bets – возвращает список ставок
// (1. если передан параметр “bets_type=open_bets” - открытые ставки .
// 2. Если передан параметр “bets_type=history_bets” - закрытые ставки за период "date_from" по "date_to")
export async function getBets(token, obj){
  let objToSend = {};
  if (obj.type === 'open') {
    objToSend.bets_type = 'open_bets'
  };
  if (obj.type === 'history') {
    objToSend.bets_type = 'history_bets';
    objToSend.date_from = obj.dateFrom;
    objToSend.date_to = obj.dateTo;
  };
  // objToSend.date_from = '2021-01-02';
  // objToSend.date_to = '2021-04-15';
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/list-bets',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: objToSend
    })
  return response.data.data.listBets;
};

export async function setBet(token, arr){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/set-bets',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: arr
    })
  return response;
};
export async function getBetId(token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/get-bet-id',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  return response.data.data;
};
export async function getBetsMinMax(token, obj) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/get-bets-min-max',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: obj
    })
  return response;
};
// Будет нужен для словаря
export async function getMarketTypes(token) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/get-market-types',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  return response.data;
};
export async function setFavorite(token, obj){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/set-favorite',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: obj
    })
  return response.data.data;
};
export async function logout(token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/logout',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  return response;
};

export async function getInfo(token) {
  let response;
  response = await axios({
    method: 'post',
    url: url + '/api/user',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return response.data.data;
};

export async function getListSports(token) {
  const response = await axios({
    method: 'post',
    url: url + '/api/list-sports',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {}
  });
  return response;
}
export async function getEvents(token, { sportsId, id = -1, live = 'all' }) {
  let response;
  response = await axios({
    method: 'post',
    url: url + '/api/list-fixtures',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {
      live: live,
      sport_id: sportsId,
      competition_id: id
    }
  });
  return response;
}
export async function getEventDetails(id, token) {
  let response;
  response = await axios({
    method: 'post',
    url: url + '/api/info-fixture',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {
      fixture_id: id
    }
  });
  return response;
}
// export async function getCompetitionEvents(token, sportId, compId) {
//   let response;
//     response = await axios({
//       method: 'post',
//       url: url + '/api/list-fixtures',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       data: {
//         sport_id: sportId,
//         competition_id: compId
//       }
//     });
//   return response;
// }
export async function getFavs(token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/list-fixtures',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        favorite: 'true'
      }
    });
    // console.log(response.data.data.listFixtures[0]);
  return response;
}
export async function getAllTournamentEvents(id, token){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/list-fixtures',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        sport_id: id,
      }
    });
    // console.log(response.data.data.listFixtures);
  return response;
}
export async function getAllLiveEvents(id, token) {
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/list-fixtures',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        live: 'true',
        sport_id: id,
      }
    });
  return response;
}
// export async function getLiveEvents(id, compId, token) {
//   let response;
//     response = await axios({
//       method: 'post',
//       url: url + '/api/list-fixtures',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       data: {
//         live: 'true',
//         sport_id: id,
//         competition_id: compId
//       }
//     });
//   return response;
// }
export async function getCurrencies(){
  let response;
    response = await axios({
      method: 'post',
      url: url + '/api/get-currencies',
    })
  return response;
};
export async function getTransactionsHistory(token, obj) {
  let response;
  response = await axios({
    method: 'post',
    url: url + '/api/history-transactions',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {
      date_from: obj.from,
      date_to: obj.to
    }
  });
  return response.data.data;
};
// chat
export async function getMessages(token,id){
    let response = await axios({
      method: 'post',
      url: url + '/api/get-chat-messages-auth',
      headers: {
           Authorization: `Bearer ${token}`,
       },
      data: {
        chat_id: id,
      }
    });
  return response;
};
export async function getChatId(token) {
  let response = axios({
    method: 'post',
    url: url + '/api/get-chat-id-auth',
    headers: {
         Authorization: `Bearer ${token}`,
     },
    data: {}
  })
  return response
};
export async function sendMessage(token, chatId, message) {
  let response = axios({
      method: 'post',
      url: url + '/api/send-chat-message-auth',
      headers: {
           Authorization: `Bearer ${token}`,
       },
      data: {
        message: message,
        chat_id: chatId
      }
    })
  return response
}
export async function cancelBet(token, id ) {
  let response = axios({
    method: 'post',
    url: url + '/api/cancel-bet',
    headers: {
         Authorization: `Bearer ${token}`,
     },
    data: {
      id: id
    }
  })
  return response
};
export async function getListCompetitions(token, language_id) {
  let response = axios({
    method: 'post',
    url: url + '/api/list-competitions',
    headers: {
         Authorization: `Bearer ${token}`,
     },
    data: {
      language_id
    }
  })
  return response
};
export async function getListParticipants(token, language_id) {
  let response = axios({
    method: 'post',
    url: url + '/api/list-participants',
    headers: {
         Authorization: `Bearer ${token}`,
     },
    data: {
      language_id
    }
  })
  return response
};
export async function saveFcmToken(authToken, fcmToken) {
  let response = axios({
    method: 'post',
    url: url + '/api/save-fcm-token',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: {
      token: fcmToken
    }
  })
  return response;
};
