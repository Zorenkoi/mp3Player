import { useState } from "react";
import tracksList from "../../assets/tracksList";
import { Input } from "@mui/material";

import Player from "../../components/Player/Player";
import Track from "../../components/Track/Track";
import PlayBar from "../../components/PlayBar/PlayBar";

import s from "./mainPage.module.scss";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState(tracksList);

  const handleChange = (e) => {
    const value = e.target.value;
    const filteredTracks = filterTracksByQuery(value);

    setTracks(filteredTracks);
    setQuery(value);
  };

  return (
    <div className={s.container}>
      <div className={s.column1} translate="no">
        <div className={s.inputContainer}>
          <Input
            onChange={handleChange}
            className={s.input}
            placeholder="пошук треків..."
          />
        </div>

        {tracks.length === 0 ? (
          <div className={s.title}>Треків за запитом "{query}" не знайдено</div>
        ) : (
          <div className={s.list}>
            {tracks.map((track) => {
              return <Track key={track.id} {...track} />;
            })}
          </div>
        )}

        <PlayBar />
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
