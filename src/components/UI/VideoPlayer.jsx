import ReactPlayer from "react-player";

import { useVideoPlayer } from "../../context/VideoPlayerContainer";
import VideoPlayerControls from "./VideoPlayerControls";
import classes from "./VideoPlayer.module.css";

const VideoPlayer = ({ videoId, cover }) => {
  const videoContext = useVideoPlayer();

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className={classes["player-wrapper"]}>
      <ReactPlayer
        ref={videoContext.playerRef}
        src={videoUrl}
        className={classes["react-player"]}
        width="100%"
        height="100%"
        playing={videoContext.playing}
        volume={videoContext.volume}
        muted={videoContext.muted}
        onTimeUpdate={videoContext.handleTimeUpdate}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,
            },
          },
        }}
      />

      {!videoContext.hasStarted && cover && (
        <div
          className={classes["cover-image"]}
          style={{
            backgroundImage: `url(${cover})`,
          }}
        />
      )}

      <VideoPlayerControls />
    </div>
  );
};

export default VideoPlayer;
