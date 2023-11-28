import { useState, useEffect, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { AudioContext } from "../../context/AudioContext";

import s from "./VolumeHorizontalSlider.module.scss";

const VolumeHorizontalSlider = () => {
  const [volume, setVolume] = useLocalStorage("volume", 30);

  const { audio } = useContext(AudioContext);

  const resetAudioFromLocal = () => {
    setVolume(JSON.parse(localStorage.getItem("volume")));
  };

  //////////////////////////////////
  useEffect(() => {
    audio.volume = volume / 100;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resetAudioFromLocal);
    return () => {
      window.removeEventListener("resize", resetAudioFromLocal);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVolume(Math.round(audio.volume * 100));
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //////////////////////////////////

  const handleVolumeChange = (_, value) => {
    setVolume(value);
    audio.volume = value / 100;
  };

  return (
    <div className={s.sliderContainer}>
      <VolumeDown />

      <Slider
        value={volume}
        onChange={handleVolumeChange}
        aria-labelledby="continuous-slider"
        sx={{ "& input": { display: "none" } }}
      />

      <VolumeUp />
    </div>
  );
};

export default VolumeHorizontalSlider;
