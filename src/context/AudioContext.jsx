import { useState, useEffect } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import tracksList from "../assets/tracksList";

const audio = initAudio();

export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useLocalStorage(
    "currentTrack",
    tracksList[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState("onebyone");

  useEffect(() => {
    audio.src = currentTrack.src;
  }, []);

  ////////////////////////////////////////
  const toggleSequence = () => {
    if (sequence === "onebyone") {
      setSequence("looped");
    } else if (sequence === "looped") {
      setSequence("mixed");
    } else if (sequence === "mixed") {
      setSequence("onebyone");
    }
  };

  /////////////////////////////////
  const runTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);

    audio.src = track.src;
    audio.currentTime = 0;
    audio.play();
  };
  const runRandomTrack = () => {
    const filteredTrackList = tracksList.filter(
      (track) => track.id !== currentTrack.id
    );

    const randomIndex = Math.floor(Math.random() * filteredTrackList.length);

    const randomTrack = filteredTrackList[randomIndex];

    runTrack(randomTrack);
  };
  const playTrack = () => {
    setIsPlaying(true);
    audio.play();
  };
  const pauseTrack = () => {
    setIsPlaying(false);
    audio.pause();
  };

  /////////////////////////////////
  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      runTrack(track);
      return;
    }

    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  /////////////////////////////////
  const handleNextAudio = () => {
    if (sequence === "mixed") {
      runRandomTrack();
      return;
    }

    if (currentTrack.id === tracksList.length - 1) {
      const nextTrack = tracksList.find((track) => track.id === 0);
      runTrack(nextTrack);
      return;
    }

    const nextTrack = tracksList.find((track) => {
      return track.id === currentTrack.id + 1;
    });
    runTrack(nextTrack);
  };

  const handlePrevAudio = () => {
    if (sequence === "mixed") {
      runRandomTrack();
      return;
    }

    if (currentTrack.id === 0) {
      const prevTrack = tracksList.find(
        (track) => track.id === tracksList.length - 1
      );
      runTrack(prevTrack);
      return;
    }

    const prevTrack = tracksList.find((track) => {
      return track.id === currentTrack.id - 1;
    });

    runTrack(prevTrack);
  };

  /////////////////////////////////
  const replay10sAudio = () => {
    if (audio.currentTime <= 10) {
      audio.currentTime = 0;
      return;
    }

    audio.currentTime = audio.currentTime - 10;
  };
  const forward10sAudio = () => {
    if (audio.currentTime > currentTrack.duration - 10) {
      handleNextAudio();
      return;
    }

    audio.currentTime = audio.currentTime + 10;
  };

  /////////////////////////////////
  const volumeUp = () => {
    const volume = audio.volume;
    const range = 0.1;

    if (volume + range >= 1) {
      audio.volume = 1;
      return;
    }

    audio.volume = volume + range;
  };
  const volumeDown = () => {
    const volume = audio.volume;
    const range = 0.1;

    if (volume - range <= 0) {
      audio.volume = 0;
      return;
    }

    audio.volume = volume - range;
  };

  //////////////////////////////////
  useEffect(() => {
    const changeTrackAfterEnd = () => {
      if (sequence === "onebyone") {
        handleNextAudio();
      } else if (sequence === "looped") {
        runTrack(currentTrack);
      } else if (sequence === "mixed") {
        runRandomTrack();
      }
    };

    audio.addEventListener("ended", changeTrackAfterEnd);

    return () => {
      audio.removeEventListener("ended", changeTrackAfterEnd);
    };
  }, [currentTrack, sequence]);

  //////////////////////////////////
  useEffect(() => {
    const listenKeyBoard = (e) => {
      e.stopImmediatePropagation();
      if (e.key === " ") {
        if (isPlaying) {
          pauseTrack();
          return;
        } else {
          playTrack();
          return;
        }
      }
      if (e.key === "ArrowLeft") {
        replay10sAudio();
        return;
      }
      if (e.key === "ArrowRight") {
        forward10sAudio();
        return;
      }
      if (e.key === "ArrowUp") {
        volumeUp();
        return;
      }
      if (e.key === "ArrowDown") {
        volumeDown();
        return;
      }
    };

    document.addEventListener("keydown", listenKeyBoard);
    return () => {
      document.removeEventListener("keydown", listenKeyBoard);
    };
  }, [isPlaying]);

  //////////////////////////////////
  const value = {
    currentTrack,
    isPlaying,
    sequence,
    toggleSequence,
    handleToggleAudio,
    handleNextAudio,
    handlePrevAudio,
    replay10sAudio,
    forward10sAudio,
    audio,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

function initAudio() {
  const audio = new Audio();
  audio.currentTime = 0;

  return audio;
}

export default AudioProvider;
