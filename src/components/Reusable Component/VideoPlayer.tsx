// src/components/CustomVideoPlayer.tsx

import React, { useCallback, useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoId: string; // YouTube Video ID
  showMuteButton?: boolean;
  disablePointerEvents?: boolean;
  className?: string;
  fillMode?: "contain" | "cover";
  /**
   * Called the first time the video actually starts playing.
   */
  onFirstPlay?: () => void;
  /**
   * Called whenever the underlying YouTube player state changes.
   * Useful for reacting to buffering vs playing, etc.
   */
  onPlaybackStateChange?: (
    state: "unstarted" | "buffering" | "playing" | "paused" | "ended" | "cued"
  ) => void;
}

// Cache the loading promise so the script loads only once
let youTubeApiPromise: Promise<void> | null = null;

const loadYouTubeIframeAPI = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (youTubeApiPromise) {
    return youTubeApiPromise;
  }

  youTubeApiPromise = new Promise<void>((resolve) => {
    const existingYT = (window as any).YT;
    if (existingYT && typeof existingYT.Player === "function") {
      resolve();
      return;
    }

    const previousCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === "function") {
        previousCallback();
      }
      resolve();
    };

    const scriptId = "youtube-iframe-api";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return youTubeApiPromise;
};

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  showMuteButton = true,
  disablePointerEvents = false,
  className,
  fillMode = "contain",
  onFirstPlay,
  onPlaybackStateChange,
}) => {
  const playerRef = useRef<any | null>(null); // YouTube player reference
  const playerContainerRef = useRef<HTMLDivElement | null>(null); // Ref to hold the iframe
  const [isMuted, setIsMuted] = useState<boolean>(true); // Mute state
  const hasFiredFirstPlayRef = useRef(false);

  const enforcePlaybackQuality = useCallback(() => {
    const preferredLevels = ["hd1080", "hd720", "large"];
    const player = playerRef.current;
    if (!player || typeof player.setPlaybackQuality !== "function") {
      return;
    }

    for (const level of preferredLevels) {
      player.setPlaybackQuality(level);
    }
  }, []);

  const applyPlayerStyling = useCallback(() => {
    if (!playerRef.current || !playerContainerRef.current) {
      return;
    }
    const iframe = playerRef.current.getIframe?.();
    if (!iframe) {
      return;
    }

    iframe.style.pointerEvents = disablePointerEvents ? "none" : "auto";

    if (fillMode === "cover") {
      const rect = playerContainerRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const containerRatio = rect.width / rect.height;
      const targetRatio = 16 / 9;
      let scale = 1;
      if (containerRatio > targetRatio) {
        scale = containerRatio / targetRatio;
      } else {
        scale = targetRatio / containerRatio;
      }

      Object.assign(iframe.style, {
        position: "absolute",
        top: "50%", // Change from "0"
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`, // Change from translate(-50%, -120%)
        transformOrigin: "center center", // Change from "top center"
        width: "100%",
        height: "100%",
      });
    } else {
      Object.assign(iframe.style, {
        position: "absolute",
        top: "0",
        left: "0",
        transform: "none",
        transformOrigin: "",
        width: "100%",
        height: "100%",
      });
    }
  }, [disablePointerEvents, fillMode]);

  useEffect(() => {
    let isCancelled = false;

    const setupPlayer = () => {
      const YT = (window as any).YT;
      if (!YT || !playerContainerRef.current || isCancelled) {
        return;
      }

      if (playerRef.current) {
        playerRef.current.loadVideoById({ videoId, startSeconds: 0 });
        playerRef.current.mute();
        setIsMuted(true);
        applyPlayerStyling();
        return;
      }

      playerRef.current = new YT.Player(playerContainerRef.current, {
        videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            mute: 1,
            origin: window.location.origin,
            enablejsapi: 1, // Explicitly enable JS API
          },        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
            setIsMuted(true);
            enforcePlaybackQuality();
            setTimeout(enforcePlaybackQuality, 2000);
            applyPlayerStyling();
          },
          onStateChange: (event: any) => {
            const YTState = (window as any).YT?.PlayerState;
            if (YTState) {
              // Map numeric YouTube states to friendly string labels
              let mappedState:
                | "unstarted"
                | "buffering"
                | "playing"
                | "paused"
                | "ended"
                | "cued"
                | null = null;

              switch (event.data) {
                case YTState.UNSTARTED:
                  mappedState = "unstarted";
                  break;
                case YTState.BUFFERING:
                  mappedState = "buffering";
                  break;
                case YTState.PLAYING:
                  mappedState = "playing";
                  break;
                case YTState.PAUSED:
                  mappedState = "paused";
                  break;
                case YTState.ENDED:
                  mappedState = "ended";
                  break;
                case YTState.CUED:
                  mappedState = "cued";
                  break;
                default:
                  mappedState = null;
              }

              if (mappedState && typeof onPlaybackStateChange === "function") {
                onPlaybackStateChange(mappedState);
              }

              if (event.data === YTState.ENDED) {
                event.target.playVideo();
                enforcePlaybackQuality();
              }

              if (event.data === YTState.PLAYING) {
                enforcePlaybackQuality();
                if (
                  !hasFiredFirstPlayRef.current &&
                  typeof onFirstPlay === "function"
                ) {
                  hasFiredFirstPlayRef.current = true;
                  onFirstPlay();
                }
              }
            }
          },
        },
      });
    };

    loadYouTubeIframeAPI().then(() => {
      if (!isCancelled) {
        setupPlayer();
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [applyPlayerStyling, enforcePlaybackQuality, videoId]);

  useEffect(() => {
    applyPlayerStyling();
  }, [applyPlayerStyling, disablePointerEvents, fillMode]);

  useEffect(() => {
    if (fillMode !== "cover") {
      return;
    }

    const handleResize = () => applyPlayerStyling();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyPlayerStyling, fillMode]);

  useEffect(() => {
    if (fillMode !== "cover" || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => applyPlayerStyling());
    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => observer.disconnect();
  }, [applyPlayerStyling, fillMode]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!playerRef.current) {
      return;
    }

    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const rootClassParts = ["relative w-full h-full"];
  if (disablePointerEvents) {
    rootClassParts.push("pointer-events-none");
  }
  if (className) {
    rootClassParts.push(className);
  }
  const rootClassName = rootClassParts.join(" ");

  const playerContainerClassName = [
    "absolute top-0 left-0 w-full h-full",
    disablePointerEvents ? "pointer-events-none" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div
        ref={playerContainerRef}
        className={playerContainerClassName}
        style={{ zIndex: 0 }}
      />
      {/* Custom Mute Button */}
      {showMuteButton && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "10px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
