import { useState } from "react";
import tracksList from "../../assets/tracksList";
import { Input } from "@mui/material";

import Track from "../../components/Track/Track";
import Player from "../../components/Player/Player";

import s from "./mainPage.module.scss";

const MainPage = () => {
  const [tracks, setTracks] = useState(tracksList);

  const handleChange = (e) => {
    const query = e.target.value;
    const filteredTracks = filterTracksByQuery(query);
    setTracks(filteredTracks);
  };

  return (
    <div className={s.container}>
      <div className={s.column1}>
        <div className={s.inputContainer}>
          <Input
            onChange={handleChange}
            className={s.input}
            placeholder="пошук треків..."
          />
        </div>

        <div className={s.list}>
          {tracks.map((track) => {
            return <Track key={track.id} {...track} />;
          })}
        </div>
      </div>

      <Player />
    </div>
  );
};

function filterTracksByQuery(query) {
  if (query === "") return tracksList;

  const lowercaseQuery = query.toLowerCase();

  return tracksList.filter((track) => {
    return (
      track.title.toLocaleLowerCase().includes(lowercaseQuery) ||
      track.artists.toLocaleLowerCase().includes(lowercaseQuery)
    );
  });
}
export default MainPage;
