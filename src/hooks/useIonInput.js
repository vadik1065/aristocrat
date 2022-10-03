import { useState } from "react";

const useIonInput = (initial) => {
  const [value, setValue] = useState(initial);

  return {
    value,
    onIonChange: (e) => setValue(e.detail.value),
    setReset: () => setValue(''),
    setValue: (e) => setValue(e)
  }
}

export default useIonInput;
