import { useContext } from "react";
import { FavoriteContext } from "../../context/FavoriteContext";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import IconButtonHOC from "../IconButton/IconButton";

import s from "./heart.module.scss";

const Heart = ({ trackId }) => {
  const { arrFavoriteId, toggleFavorite } = useContext(FavoriteContext);

  const isFavorite =
    arrFavoriteId.findIndex((favoriteId) => favoriteId === trackId) >= 0;

  return (
    <IconButtonHOC
      className={s.heartButton}
      onClick={() => toggleFavorite(trackId)}
    >
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButtonHOC>
  );
};

export default Heart;
