import React, {useEffect, useState} from 'react';

const ChValue = ({value}) => {
  const [number, setNumber] = useState(null);
  const [isChangedUp, setIsChangedUp] = useState(false);
  const [isChangedDn, setIsChangedDn] = useState(false);
  const [started, setStarted] = useState(true);

  useEffect(() => {
    let timeoutId;

    function callback() {
      setIsChangedUp(false);
      setIsChangedDn(false);
      setStarted(false)
    }

    if (number !== null && number < value) {
      setIsChangedUp(true);
    };
    
    if (number !== null && number > value) {
      setIsChangedDn(true);
    };

    timeoutId = setTimeout(callback, 2000);
    setNumber(value);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [number, value]);

  return(
    // <p className={(isChangedDn ? 'value-changed ' : '') + ((isChangedUp ? ' value-changed-up' : '') + (started ? "started" : ''))}>
    <p className={`${isChangedDn ? 'value-changed' : ''} ${isChangedUp ? 'value-changed-up' : ''} ${started ? 'started' : ''}`}>
      {number}
    </p>
  )
}

export default ChValue;
