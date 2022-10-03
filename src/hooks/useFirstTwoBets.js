import { useEffect, useState } from "react";

const useFirstTwoBetsHandicap = (bets) => {
  const [firstTwoBetsHandicap, setFirstTwoBetsHandicap] = useState([]);
  
  useEffect(() => {
    if (bets.length) {
      let arr1 = bets.filter(el => el.name == 1 && el.status === 1);
      let arr2 = bets.filter(el => el.name == 2 && el.status === 1);
  
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].line.split(' ')[0] != 0.0 && (arr1[i].line.split(' ')[0] == (arr2[j].line.split(' ')[0] * -1) || (arr1[i].line.split(' ')[0] * -1) == arr2[j].line.split(' ')[0])) {
            setFirstTwoBetsHandicap([arr1[i], arr2[j]]);
            break;
          }
        }
      }
    }
  }, [bets]);

  return firstTwoBetsHandicap;
}

export default useFirstTwoBetsHandicap;
