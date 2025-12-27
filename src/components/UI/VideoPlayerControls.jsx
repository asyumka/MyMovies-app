import { useVideoPlayer } from "../../context/VideoPlayerContainer";
import { useFullScreen } from "../../context/FullScreenContainer";
import classes from "./VideoPlayer.module.css";
import MoviePlayIcon from "../../assets/svg/play.svg";
import MoviePauseIcon from "../../assets/svg/pause.svg";
import MoviePlayIconSmall from "../../assets/svg/play.svg?react";
import MoviePauseIconSmall from "../../assets/svg/pause.svg?react";
import FullScreenIcon from "../../assets/svg/fullscreen.svg?react";
import ExitFullScreenIcon from "../../assets/svg/exit-fullscreen.svg?react";
import VolumeUpIcon from "../../assets/svg/volume-up.svg?react";
import VolumeMuteIcon from "../../assets/svg/volume-mute.svg?react";

function VideoPlayerControls() {
  const videoContext = useVideoPlayer();

  const { toggleFullScreen, isFullScreen } = useFullScreen();

  return (
    <div className={classes["controls-overlay"]}>
      <div
        className={classes["click-area"]}
        onClick={videoContext.handlePlayPause}
      >
        <div className={classes["center-toggle-btn"]}>
          <img
            src={videoContext.playing ? MoviePauseIcon : MoviePlayIcon}
            alt={videoContext.playing ? "Pause" : "Play"}
            className={
              videoContext.playing
                ? classes["icon-pause"]
                : classes["icon-play"]
            }
          />
        </div>
      </div>

      <div className={classes["controls-bar"]}>
        <button
          className={classes["btn-control"]}
          onClick={videoContext.handlePlayPause}
        >
          {videoContext.playing ? (
            <MoviePauseIconSmall width={25} height={25} />
          ) : (
            <MoviePlayIconSmall width={25} height={25} />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={videoContext.played}
          onMouseDown={videoContext.handleSeekMouseDown}
          onChange={videoContext.handleSeekChange}
          onMouseUp={videoContext.handleSeekMouseUp}
          className={classes["seek-slider"]}
        />

        <button
          className={classes["btn-control"]}
          onClick={videoContext.handleToggleMute}
        >
          {videoContext.muted ? (
            <VolumeMuteIcon width={25} height={25} />
          ) : (
            <VolumeUpIcon width={25} height={25} />
          )}
        </button>
        <button className={classes["btn-control"]} onClick={toggleFullScreen}>
          {!isFullScreen ? (
            <FullScreenIcon width={25} height={25} />
          ) : (
            <ExitFullScreenIcon width={25} height={25} />
          )}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayerControls;
