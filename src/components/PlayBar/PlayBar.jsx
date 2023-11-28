import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import Controls from "../Controls/Controls";

import VolumeSlider from "../VolumeSlider/VolumeSlider";
import TimeSlider from "../TimeSlider/TimeSlider";

import s from "./playBar.module.scss";

const PlayBar = () => {
  return (
    <div className={s.playbar} translate="no">
      <div className={s.container}>
        <div className={s.playbarLeft}>
          <TrackInfo />
        </div>

        <div className={s.playbarRight}>
          <Controls />

          <TimeSlider />
        </div>
      </div>
    </div>
  );
};

const TrackInfo = () => {
  const { currentTrack } = useContext(AudioContext);

  const { preview, artists, title } = currentTrack;

  return (
    <div className={s.info}>
      <VolumeSlider />
      <img className={s.preview} src={preview} alt="preview" />

      <div className={s.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
    </div>
  );
};

export default PlayBar;
