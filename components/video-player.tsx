"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayIcon, PauseIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  title?: string;
  description?: string;
  className?: string;
}

export const VideoPlayer = ({ 
  src, 
  title = "Lolona Story", 
  description = "Discover our mission to empower women and transform communities across India.",
  className 
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className={cn("py-20 px-sides", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-galada text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-background/20 backdrop-blur-sm border border-border/20 shadow-2xl">
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-cover"
              muted={isMuted}
              playsInline
              preload="metadata"
            />

            {/* Loading State */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              </div>
            )}

            {/* Play Button Overlay */}
            {!isPlaying && isLoaded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-300 hover:bg-black/30"
              >
                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200">
                  <PlayIcon className="w-8 h-8 text-background ml-1" />
                </div>
              </motion.button>
            )}

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: showControls || !isPlaying ? 1 : 0,
                y: showControls || !isPlaying ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 text-background" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-background ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                >
                  {isMuted ? (
                    <SpeakerOffIcon className="w-4 h-4 text-background" />
                  ) : (
                    <SpeakerLoudIcon className="w-4 h-4 text-background" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl -z-10 opacity-50" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-primary/10 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  );
};
