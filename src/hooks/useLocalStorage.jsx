import { useState, useEffect } from "react";

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    const stateFromLocal = localStorage.getItem(key);

    if (stateFromLocal) {
      return JSON.parse(stateFromLocal);
    }

    return initialState;
  });

  const changeState = (newState) => {
    setState(newState);
    localStorage.setItem(key, JSON.stringify(newState));
  };

  return [state, changeState];
};

export default useLocalStorage;
