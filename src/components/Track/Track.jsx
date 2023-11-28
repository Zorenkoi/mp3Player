import { useContext } from "react";
import cn from "classnames";

import { AudioContext } from "../../context/AudioContext";
import secondsToMMSS from "../../utils/secondsToMMSS";

import IconButtonHOC from "../IconButton/IconButton";
import { PlayArrow, Pause } from "@mui/icons-material";
import Heart from "../Heart/Heart";

import s from "./track.module.scss";

const Track = (track) => {
  const { id, preview, duration, artists, title } = track;
  const { handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === id;

  return (
    <div className={cn(s.track, isCurrentTrack && s.playing)} translate="no">
      <IconButtonHOC
        className={s.playButton}
        onClick={() => handleToggleAudio(track)}
      >
        {isPlaying && isCurrentTrack ? <Pause /> : <PlayArrow />}
      </IconButtonHOC>

      <img
        src={preview}
        alt="preview"
        className={s.preview}
        onClick={() => handleToggleAudio(track)}
      />

      <div onClick={() => handleToggleAudio(track)} className={s.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>

      <p className={s.duration}>{secondsToMMSS(duration)}</p>

      <Heart trackId={id} />
    </div>
  );
};

export default Track;
