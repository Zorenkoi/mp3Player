import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";

import IconButtonHOC from "../IconButton/IconButton";
import {
  Pause,
  PlayArrow,
  SkipPreviousTwoTone,
  SkipNextTwoTone,
  Forward10TwoTone,
  Replay10TwoTone,
  RepeatTwoTone,
  RepeatOneTwoTone,
  ShuffleTwoTone,
} from "@mui/icons-material";

import Heart from "../Heart/Heart";

import s from "./controls.module.scss";

const Controls = () => {
  const {
    currentTrack,
    isPlaying,
    sequence,
    toggleSequence,
    handleToggleAudio,
    handleNextAudio,
    handlePrevAudio,
    replay10sAudio,
    forward10sAudio,
  } = useContext(AudioContext);

  const { id } = currentTrack;

  const getSequenceIcon = (sequence) => {
    if (sequence === "looped") return <RepeatOneTwoTone />;
    if (sequence === "mixed") return <ShuffleTwoTone />;
    if (sequence === "onebyone") return <RepeatTwoTone />;
  };

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className={s.controls}>
      <IconButtonHOC
        type="button"
        className={s.emotionalButton}
        onClick={toggleSequence}
        onKeyDown={handleKeyDown}
      >
        {getSequenceIcon(sequence)}
      </IconButtonHOC>

      <IconButtonHOC
        type="button"
        className={s.skipButton}
        onClick={handlePrevAudio}
        onKeyDown={handleKeyDown}
      >
        <SkipPreviousTwoTone />
      </IconButtonHOC>

      <IconButtonHOC
        type="button"
        className={s.replayButton}
        onClick={replay10sAudio}
        onKeyDown={handleKeyDown}
      >
        <Replay10TwoTone />
      </IconButtonHOC>

      <IconButtonHOC
        type="button"
        className={s.playButton}
        onClick={() => handleToggleAudio(currentTrack)}
        onKeyDown={handleKeyDown}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButtonHOC>

      <IconButtonHOC
        type="button"
        className={s.replayButton}
        onClick={forward10sAudio}
        onKeyDown={handleKeyDown}
      >
        <Forward10TwoTone />
      </IconButtonHOC>

      <IconButtonHOC
        type="button"
        className={s.skipButton}
        onClick={handleNextAudio}
        onKeyDown={handleKeyDown}
      >
        <SkipNextTwoTone />
      </IconButtonHOC>

      <Heart trackId={id} />
    </div>
  );
};

export default Controls;
