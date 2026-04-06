"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
        >
          {/* Subtle Motion Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-[10%] bg-gradient-to-tr from-blue-900/20 via-transparent to-slate-900/20 blur-3xl"
            />
          </div>

          {/* Logo Reveal */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-[2px]">
                <div className="w-full h-full rounded-[10px] bg-[#020617] flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 shimmer opacity-20" />
                   <div className="w-8 h-8 rounded-full border-2 border-white/90 border-t-transparent" />
                </div>
              </div>
              
              {/* Soft Gradient Light Sweep */}
              <motion.div 
                animate={{
                  left: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="text-xl font-medium tracking-tight text-white/90">
                Nexus Portal
              </h1>
              <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
                Initializing Secure Session
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
