import { useState, useEffect, useContext } from "react";
import Slider from "@mui/material/Slider";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import IconButtonHOC from "../IconButton/IconButton";
import { AudioContext } from "../../context/AudioContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./volumeSlider.module.scss";

const VolumeSlider = () => {
  const [isSliderVisible, setSliderVisible] = useState(false);
  const [volume, setVolume] = useLocalStorage("volume", 30);
  const { audio } = useContext(AudioContext);

  /////////////////////////////////////
  const handleMouseEnter = () => {
    setSliderVisible(true);
  };

  const handleMouseLeave = () => {
    setSliderVisible(false);
  };
  //////////////////////////////////////

  useEffect(() => {
    audio.volume = volume / 100;
  }, []);

  useEffect(() => {
    const resetAudioFromLocal = () => {
      setVolume(JSON.parse(localStorage.getItem("volume")));
    };

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
  //////////////////////////////////////

  const handleChange = (_, value) => {
    setVolume(value);
    audio.volume = value / 100;
  };

  return (
    <div
      className={s.volume}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconButtonHOC>
        {volume === 0 ? <VolumeOff /> : <VolumeUp />}
      </IconButtonHOC>

      {isSliderVisible && (
        <div className={s.volumeSliderWrapper}>
          <Slider
            orientation="vertical"
            value={volume}
            onChange={handleChange}
            className={s.volumeSlider}
            sx={{ "& input": { display: "none" } }}
          />
        </div>
      )}
    </div>
  );
};

export default VolumeSlider;
