import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
// import { useAppSelector } from "../../../hooks/redux.hook";
// import { getActiveSubSection } from "../../../redux/slices/courseDetailSlice";

type PlayerOptions = typeof videojs.options;

interface VideoJSProps {
  options: PlayerOptions;
  onReady?: (player: Player) => void;
  onComplete?: () => void;
}

export const VideoJS: React.FC<VideoJSProps> = ({
  options,
  onReady,
  onComplete,
}) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  // const activeSubSection = useAppSelector((state) =>
  //   getActiveSubSection(state)
  // );
  
  // const activeSubSectionRef = useRef(activeSubSection);

  // Keep the ref updated with the latest activeSubSection
  // useEffect(() => {
  //   activeSubSectionRef.current = activeSubSection;
  // }, [activeSubSection]);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("Video.js player is ready");
        onReady?.(player);
      }));

      // Variable to track whether onComplete has been invoked
      let onCompleteInvoked = false;

      // Add event listener for video progress
      player.on("timeupdate", () => {
        const currentTime: number = player.currentTime() || 0; // Current playback time
        const duration: number = player.duration() || 0; // Total duration of the video
        const progress = (currentTime / duration) * 100;

        if (progress >= 90 && !onCompleteInvoked) {
          // console.log(
          //   "active subSection at 90% completion -> ",
          //   activeSubSectionRef.current._id,
          //   Date.now().toString()
          // );
          // console.log("Video reached 90% completion in video.tsx!");
          onComplete?.(); // Notify parent component
          onCompleteInvoked = true; // Ensure this is triggered only once
        }
      });

      // Dispose of player on component unmount
      return () => {
        player.off("timeupdate");
        player.dispose();
        playerRef.current = null;
      };
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(options.autoplay || false);
      player.src(options.sources || []);
    }
  }, [options, onReady, onComplete]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
