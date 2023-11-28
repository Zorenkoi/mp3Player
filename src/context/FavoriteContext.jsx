import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const FavoriteContext = createContext({});

const FavoriteProvider = ({ children }) => {
  const [arrFavoriteId, setArrFavoriteId] = useLocalStorage("favoriteKey", []);

  const toggleFavorite = (trackId) => {
    let startLength = arrFavoriteId.length;

    let newArrFavoriteId = arrFavoriteId.filter(
      (favoriteId) => trackId !== favoriteId
    );

    if (newArrFavoriteId.length < startLength) {
      setArrFavoriteId(newArrFavoriteId);
      return;
    }

    setArrFavoriteId([...newArrFavoriteId, trackId]);
  };

  const value = {
    arrFavoriteId,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
