import { createContext, useContext, useRef, useState } from "react";

const VideoPlayerContext = createContext();

export const useVideoPlayer = () => {
  return useContext(VideoPlayerContext);
};

export const VideoPlayerContainer = ({ children }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0.0);
  const [seeking, setSeeking] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (!hasStarted) setHasStarted(true);
  };

  const handleTimeUpdate = (state) => {
    const videoElement = state.target;

    if (videoElement && videoElement.duration) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      const fraction = currentTime / duration;
      if (!seeking) {
        setPlayed(fraction);
      }
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    const duration = playerRef.current.duration;

    const fraction = parseFloat(e.target.value);

    if (duration) {
      playerRef.current.currentTime = duration * fraction;
    }
  };

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
  };

  const valueContext = {
    playing,
    setPlaying,
    volume,
    setVolume,
    muted,
    setMuted,
    played,
    setPlayed,
    seeking,
    setSeeking,
    hasStarted,
    setHasStarted,
    playerRef,
    handlePlayPause,
    handleTimeUpdate,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handleToggleMute,
  };

  return (
    <VideoPlayerContext.Provider value={valueContext}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
