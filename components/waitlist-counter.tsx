"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";

export const WaitlistCounter = () => {
  const [count] = useState(169);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for animation effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col items-center gap-2 mt-8"
      >
        <div className="w-16 h-8 bg-white/20 rounded-lg animate-pulse" />
        <p className="text-sm text-white/70">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="mb-1 cursor-default"
    >
      <div className="text-center">
        <div className="inline-flex items-baseline gap-1">
          <CountingNumber
            number={count}
            inView={true}
            transition={{ stiffness: 80, damping: 20 }}
            className="text-lg md:text-xl font-semibold text-white/90"
          />
          <span className="text-lg md:text-xl font-semibold text-white/90">+</span>
          <span className="text-sm md:text-base text-white/70 ml-1 font-medium">
            women joined
          </span>
        </div>
      </div>
    </motion.div>
  );
};
