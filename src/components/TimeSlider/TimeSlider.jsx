import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { Slider } from "@mui/material";

import s from "./timeSlider.module.scss";

import secondsToMMSS from "../../utils/secondsToMMSS";

const TimeSlider = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const { currentTrack, audio } = useContext(AudioContext);
  const { duration } = currentTrack;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleChangeSlider = (_, value) => {
    const time = (value / 1000) * duration;

    setCurrentTime(time);
    audio.currentTime = time;
  };

  const sliderCurrentTime = Math.round((currentTime / duration) * 1000);

  return (
    <>
      <div className={s.slider}>
        <p>{secondsToMMSS(currentTime)}</p>

        <Slider
          value={sliderCurrentTime}
          onChange={handleChangeSlider}
          sx={{ "& input": { display: "none" } }}
          step={1}
          min={0}
          max={1000}
        />

        <p>{secondsToMMSS(duration)}</p>
      </div>
    </>
  );
};

export default TimeSlider;
