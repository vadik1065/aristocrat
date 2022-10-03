import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSortMarkets = (matchId) => {
  const gl_bets = useSelector(state => state.bets);
  const markets = useSelector(state => state.settings.markets);
  const [sortMarkets, setSortMarkets] = useState([]);

  useEffect(() => {
    if (gl_bets.length && matchId) {
      let temp = gl_bets
        .filter(el => el.match_id === matchId && el.status == 1)
        .sort((a, b) => a.sort - b.sort)
        .map(elem => elem.market_name);
      let bets = Array.from(new Set(temp));
      // включение отображения маркетов из настроек
      bets = bets.filter(bet => !markets.find(arMark => arMark.name === bet && !arMark.active));

      setSortMarkets(bets);
    }
  }, [gl_bets, matchId]);

  return sortMarkets;
}

export default useSortMarkets;
