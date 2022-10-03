import url from '../axios.js';
import moment from 'moment';
import * as fr from 'fractional';
import defaultTourLogo from '../images/leagues/uefa.png';
import defaultParticipantLogo from '../images/leagues/team1.png';

// Если появятся другие виды спорта, то добавлять сюда, в sports и в changeTitleSport
const sports = [
  {
    pic: 'soccer',
    title: 'Soccer',
    name: 'Football'
  },
  {
    pic: 'baseball',
    title: 'Baseball',
    name: 'Baseball'
  },
  {
    pic: 'tennis',
    title: 'Tennis',
    name: 'Tennis'
  },
  {
    pic: 'tennisDoubles',
    title: 'Tennis Doubles',
    name: "TennisDoubles"
  },
  {
    pic: 'basketball',
    title: 'Basketball',
    name: 'Basketball'
  },
  {
    pic: 'voleyball',
    title: 'Voleyball',
    name: 'Voleyball'
  },
  {
    pic: 'table-tennis',
    title: 'Table Tennis',
    name: 'TableTennis'
  },
  {
    pic: 'football',
    title: 'Football',
    name: "AmericanFootball"
  },
  {
    pic: 'bowling',
    title: 'Bowling',
    name: "Bowling"
  },
  {
    pic: 'iceHockey',
    title: 'Ice Hockey',
    name: "Ice Hockey"
  },
];

// Шрифты в чате
export const radioList = [
  { value: 'extra-small', title: 'Extra small' },
  { value: 'small', title: 'Small' },
  { value: 'medium', title: 'Medium' },
  { value: 'large', title: 'Large' },
  { value: 'extra-large', title: 'Extra large' },
]

export const asianHandicaps = [
  'Asian Handicap',
  'Asian Handicap 1st Period',
  'Asian Handicap 2nd Period',
  'Asian Handicap - Full Time'
]

export const totals = [
  'Under/Over',
  'Under/Over - Home Team',
  'Under/Over - Away Team',
  'Total Corners'
]

export const requiredMarkets = [
  '1X2',
  'Asian Handicap',
  'Under/Over'
]

export function changeTitleSport(string) {
  switch (string) {
    case 'Football':
      return 'Soccer';
    case 'TennisDoubles':
      return 'Tennis Doubles';
    case 'TableTennis':
      return 'Table Tennis';
    case 'AmericanFootball':
      return 'Football';
    case 'IceHockey':
      return 'Ice Hockey';
    default:
      return string;
  }
}

export function getTitleSportForPusher(id) {
  switch (id) {
    case 6046:
      return 'Football';
    case 48242:
      return 'Basketball';
    case 4:
      return 'Baseball';
    case 54094:
      return 'Tennis';
    case 25:
      return 'TennisDoubles';
    case 1:
      return 'AmericanFootball';
    case 35232:
      return 'IceHockey';
    default:
      return 'Football';
  }
}

export function getSportListToShow(sportsList) {
  const list = sportsList.map(el => {
    let obj;
    sports.map((item) => {
      if (item.name === el.name) {
        obj = item;
        obj.id = el.id;
        obj.name = el.name;
        obj.inplay = el.cnt_inplay;
        obj.prematch = el.cnt_prematch;
        obj.pic = item.pic;
      }
    });
    return obj;
  });
  return list;
}

export function getSportPic(sportId) {
  switch (sportId) {
    case 6046:
      return 'soccer';
    case 35232:
      return 'iceHockey';
    case 48242:
      return 'basketball';
    case 4:
      return 'baseball';
    case 54094:
      return 'tennis';
    case 25:
      return 'tennisDoubles';
    case 1:
      return 'football';
    default:
      return 'soccer';
  }
}

export function getAccentColor(val, isDarkMode) {
  switch (val) {
    case 'redux-accent-orange':
      return `${isDarkMode ? '#99562D' : '#D9773C'}`;
    case 'redux-accent-red':
      return `${isDarkMode ? '#A23B3B' : '#D04D4D'}`;
    case 'redux-accent-pink':
      return `${isDarkMode ? '#99396D' : '#BC60AD'}`;
    case 'redux-accent-violet':
      return `${isDarkMode ? '#7038A8' : '#8360BC'}`;
    case 'redux-accent-purple':
      return `${isDarkMode ? '#3D49B1' : '#576EE8'}`;
    case 'redux-accent-light-blue':
      return `${isDarkMode ? '#177097' : '#42A5BB'}`;
    case 'redux-accent-green':
      return `${isDarkMode ? '#317D38' : '#63AB62'}`;
    case 'redux-accent-orange-gradient':
      return `${isDarkMode ? 'linear-gradient(#A13B3B, #99562D)' : 'linear-gradient(#D04D4D, #D9773C)'}`;
    case 'redux-accent-red-gradient':
      return `${isDarkMode ? 'linear-gradient(#A13B3B, #99396D)' : 'linear-gradient(#D04D4D, #BC60AD)'}`;
    case 'redux-accent-pink-gradient':
      return `${isDarkMode ? 'linear-gradient(#99396D, #7038A8)' : 'linear-gradient(#BC60AD, #8360BC)'}`;
    case 'redux-accent-violet-gradient':
      return `${isDarkMode ? 'linear-gradient(#7038A8, #3D49B1)' : 'linear-gradient(#8360BC, #576EE8)'}`;
    case 'redux-accent-purple-gradient':
      return `${isDarkMode ? 'linear-gradient(#3D49B1, #177097)' : 'linear-gradient(#576EE8, #42A5BB)'}`;
    case 'redux-accent-light-blue-gradient':
      return `${isDarkMode ? 'linear-gradient(#177097, #317D38)' : 'linear-gradient(#42A5BB, #63AB62)'}`;
    case 'redux-accent-green-gradient':
      return `${isDarkMode ? 'linear-gradient(#317D38, #928513)' : 'linear-gradient(#63AB62, #BDA241)'}`;
    default:
      return '#D9773C';
  }
}

export function getCurrency(currency_id) {
  if (currency_id === 840) {
    return '$'
  }
  if (currency_id === 978) {
    return '€'
  }
  if (currency_id === 643) {
    return '₽'
  }
  if (currency_id === 826) {
    return '£'
  }
  if (currency_id === 'bitcoin') {
    return 'BTC'
  }
};
export function getCurrencyString(currency_id) {
  if (currency_id === 840) {
    return 'USD'
  }
  if (currency_id === 978) {
    return 'EUR'
  }
  if (currency_id === 643) {
    return 'RUB'
  }
  if (currency_id === 826) {
    return 'GBP'
  }
  if (currency_id === 'bitcoin') {
    return 'BTC'
  }
}
export function capitalize(str) {
  return str.replace(/_/g, ' ').split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
}

// export function getPrice(priceView) {
//   switch (priceView) {
//     case 'classic':
//       return 'price_classic';
//     case 'american':
//       return 'price_american';
//     case 'british':
//       return 'price_british';
//     case 'hongkong':
//       return 'price_hongkong';
//     case 'indonesian':
//       return 'price_indonesian';
//     case 'malay':
//       return 'price_malay';
//     default:
//       return 'price_classic';
//   }
// }

// export function getFullDateFromFullFormat(fullDate, dateFormat, timeZone) {
//   let temp = moment(fullDate).local(); // неправильно отображает, переделать
//   if (timeZone === 'auto') {
//     temp = temp.format(`${dateFormat} — HH:mm`);
//   } else {
//     temp = temp.utcOffset(+timeZone).format(`${dateFormat} — HH:mm`);
//   }
//   return temp;
// }

export function getFullDate(fullDate, dateFormat, timeZone) {
  let temp = moment(moment.unix(fullDate).toDate()).local();
  if (timeZone === 'auto') {
    temp = temp.format(`${dateFormat} — HH:mm`);
  } else {
    temp = temp.utcOffset(+timeZone).format(`${dateFormat} — HH:mm`);
  }
  return temp;
}

export function getDate(date, dateFormat, timeZone) {
  let temp = moment(moment.unix(date).toDate()).local();
  if (timeZone === 'auto') {
    temp = temp.format(dateFormat);
  } else {
    temp = temp.utcOffset(+timeZone).format(dateFormat);
  }
  return temp;
}

export function getTime(time, timeZone) {
  let temp = moment(moment.unix(time).toDate()).local();
  if (timeZone === 'auto') {
    temp = temp.format('HH:mm');
  } else {
    temp = temp.utcOffset(+timeZone).format('HH:mm');
  }
  return temp;
}

export function getDateFromUnix(date, dateFormat, timeZone) {
  let temp = moment(date).local();
  if (timeZone === 'auto') {
    temp = temp.format(dateFormat);
  } else {
    temp = temp.utcOffset(+timeZone).format(dateFormat);
  }
  return temp;
}

export const getMatchStatus = (status) => {
  if (status === 40) {
    return 'live';
  }
  if (status === 30) {
    return 'prematch';
  }
}

export function sortMoneyLineBets(bets) {
  if (bets.length === 3) {
    let result = [...bets];
    result.sort((a, b) => {
      let srt = ['1', 'X', '2', 'undefined'];
      return srt.findIndex(el => el === a.name) - srt.findIndex(el => el === b.name);
    });
    return result;
  } else {
    return bets;
  }
}

export function roundToTwo(value) {
  return Math.round(value * 100) / 100;
}

export function mathRound(value, exp) {
  // Если степень не определена, либо равна нулю...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }
  value = +value;
  exp = +exp;
  // Если значение не является числом, либо степень не является целым числом...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  
  let znak = Math.sign(value);
  value = Math.abs(value);
  // Сдвиг разрядов
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Обратный сдвиг
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)) * znak;
}

// export function getCalendarDate(time, dateFormat, timeZone) {
//   let temp = moment(time).local();
//   if (timeZone === 'auto') {
//     temp = temp.format(dateFormat);
//   } else {
//     temp = temp.utcOffset(+timeZone).format(dateFormat);
//   }
//   return temp;
// }

export function getSeparator(price, isComma) {
  if (isComma) {
    return price.toString().split('.').join(',');
  } else {
    return price;
  }
}

export const getPrice = (price, priceView, isComma) => {
  isComma = (isComma === 'true');
  switch (priceView) {
    case 'Price':
      return getSeparator(price, isComma);

    case 'price_american':
      if (price >= 2) {
        let result = (price - 1) * 100;
        return result.toFixed(0);
      }
      if (price < 2) {
        let result = 100 / (price - 1);
        return (-result).toFixed(0);
      }

    case 'price_british':
      price -= 1;
      let temp = new fr.Fraction(price);
      let result = `${temp.numerator}/${temp.denominator}`;
      // let result = new fr.Fraction(price).toString();

      // let gcd = (a, b) => {
      //   if (b < 0.0000001) return a; 
      //   return gcd(b, Math.floor(a % b));
      // };
      // let len = price.toString().length - 2;
      // let denominator = Math.pow(10, len);
      // let numerator = price * denominator;      
      // let divisor = gcd(numerator, denominator);      
      // numerator /= divisor;
      // denominator /= divisor;
      // let result = Math.floor(numerator) + '/' + Math.floor(denominator);
      return result;

    case 'price_hongkong':
      return getSeparator((price - 1).toFixed(2), isComma);
      // return (price - 1).toFixed(2);

    case 'price_indonesian':
      if (price >= 2) {
        let result = price - 1;
        return getSeparator(result.toFixed(2), isComma);
        // return result.toFixed(2);
      }
      if (price < 2) {
        let result = -1 / (price - 1);
        return getSeparator(result.toFixed(2), isComma);
        // return result.toFixed(2);
      }

    case 'price_malay':
      if (price >= 2) {
        let result = -1 / (price - 1) ;
        return getSeparator(result.toFixed(2), isComma);
        // return result.toFixed(2);
      }
      if (price < 2) {
        let result = price - 1;
        return getSeparator(result.toFixed(2), isComma);
        // return result.toFixed(2);
      }

    default:
      return getSeparator(price, isComma);
  }
}

export const getСompetitionName = (сompetition) => {
  if (сompetition) {
    return сompetition.name_lg !== null ? сompetition.name_lg : false;
  } else {
    return false;
  }
}

export const getСompetitionLogo = (сompetition) => {
  if (сompetition) {
    return сompetition.image_url !== null ? `${url}/${сompetition.image_url}` : defaultTourLogo;
  } else {
    return defaultTourLogo;
  }
}

export const getParticipantName = (participant) => {
  if (participant) {
    return participant.name_lg !== null ? participant.name_lg : false;
  } else {
    return false;
  }
}

export const getParticipantLogo = (participant) => {
  if (participant) {
    return participant.image_url !== null ? `${url}/${participant.image_url}` : defaultParticipantLogo;
  } else {
    return defaultParticipantLogo;
  }
}

export const convertArrayToObject = (array, id) => {
  return Object.fromEntries(array.map(el => [el[id], el]));
}

// второй вариант
// export const convertArrayToObject = (array, id) => {
//   let result = new Map() ;
//   for (let i = 0; i < array.length; i++) {
//     result.set(array[i][id], array[i]);
//   }

//   return Object.fromEntries(result);
// }

// медленный вариант
// export const convertArrayToObject = (array, key) => {
//   const initialValue = {};
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       [item[key]]: item,
//     };
//   }, initialValue);
// };

// export const hideToolbar = () => {
//   const tabs = document.querySelectorAll('ion-tab-bar')[0];
//   if (tabs !== undefined) {
//     tabs.remove();
//   }
// }