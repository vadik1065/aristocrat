import { useEffect, useState } from "react";

const useFirstTwoBetsTotal = (bets) => {
  const [firstTwoBetsTotal, setFirstTwoBetsTotal] = useState([]);
  
  useEffect(() => {
    if (bets.length) {
      let arr1 = bets.filter(el => el.name == 'Under' && el.status === 1);
      let arr2 = bets.filter(el => el.name == 'Over' && el.status === 1);
  
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].line == arr2[j].line) {
            setFirstTwoBetsTotal([arr1[i], arr2[j]]);
            break;
          }
        }
      }
    }
  }, [bets]);

  return firstTwoBetsTotal;
}

export default useFirstTwoBetsTotal;
