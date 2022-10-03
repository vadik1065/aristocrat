import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useLine = (val) => {
  const displayHandicap = useSelector(state => state.settings.displayHandicap);
  const displayZeroHandicap = useSelector(state => state.settings.displayZeroHandicap);
  const [line, setLine] = useState('');

  useEffect(() => {
    if (val !== null && val.split(' ')[0] != 0.0 && displayHandicap === 'plain') {
      setLine(val.split(' ')[0])
    }
    if (val !== null && val.split(' ')[0] != 0.0 && displayHandicap === 'brackets') {
      setLine(`(${val.split(' ')[0]})`)
    }
    if (val !== null && val.split(' ')[0] == 0.0) {
      switch (displayZeroHandicap) {
        case 'decimal':
          setLine('0.0');
          break;
        case 'plain-zero':
          setLine('0');
          break;
        case 'plus-zero':
          setLine(`+0`);
          break;
        case 'zero-in-brackets':
          setLine('(0)');
          break;
        default:
          setLine('0.0');
      }
    }
  }, [val, displayHandicap]);

  return line;
}

export default useLine;
