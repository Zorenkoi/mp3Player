import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";

import TimeSlider from "../TimeSlider/TimeSlider";
import Controls from "../Controls/Controls";
import VolumeHorizontalSlider from "../VolumeHorizontalSlider/VolumeHorizontalSlider";

import s from "./player.module.scss";

const Player = () => {
  return (
    <div className={s.playerContainer} translate="no">
      <div className={s.player}>
        <TrackInfo />
        <TimeSlider />
        <Controls />
      </div>
      <VolumeHorizontalSlider />
    </div>
  );
};

const TrackInfo = () => {
  const { currentTrack } = useContext(AudioContext);
  const { preview, artists, title } = currentTrack;

  return (
    <div className={s.info}>
      <img src={preview} alt={title} className={s.preview} />
      <h4 className={s.title}>{title}</h4>
      <p className={s.artists}>{artists}</p>
    </div>
  );
};

export default Player;
