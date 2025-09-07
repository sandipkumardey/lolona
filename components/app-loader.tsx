"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderOne } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  onLoadingComplete: () => void;
}

export const AppLoader = ({ onLoadingComplete }: AppLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading...");

  const loadingSteps = [
    { text: "Initializing...", duration: 800 },
    { text: "Loading assets...", duration: 1200 },
    { text: "Preparing experience...", duration: 1000 },
    { text: "Almost ready...", duration: 600 },
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;
    const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);

    const updateLoader = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);

        const stepProgress = (step.duration / totalDuration) * 100;
        const targetProgress = currentProgress + stepProgress;

        // Animate progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 2;
            if (newProgress >= targetProgress) {
              clearInterval(progressInterval);
              currentProgress = targetProgress;
              currentStep++;
              
              if (currentStep < loadingSteps.length) {
                setTimeout(updateLoader, 100);
              } else {
                // Complete loading
                setTimeout(() => {
                  setProgress(100);
                  setTimeout(onLoadingComplete, 500);
                }, 200);
              }
              return targetProgress;
            }
            return newProgress;
          });
        }, 30);
      }
    };

    // Start loading sequence
    setTimeout(updateLoader, 500);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Loading Content */}
      <div className="relative flex flex-col items-center space-y-8 p-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-button">
            <span className="text-primary-foreground font-bold text-xl">L</span>
          </div>
          <span className="text-3xl font-semibold text-foreground">Lolona</span>
        </motion.div>

        {/* Loader Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center space-y-6"
        >
          <LoaderOne />
          
          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-muted-foreground"
          >
            {loadingText}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="w-64 h-1 bg-border rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="text-xs font-mono text-muted-foreground"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Subtle Animation Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};
