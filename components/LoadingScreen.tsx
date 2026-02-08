"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasChecked, setHasChecked] = useState(false);
  const [glitchText, setGlitchText] = useState("ACCESSING");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const glitchVariants = ["ACCESSING", "4CC3SS1NG", "ACC3SS1NG", "ACCESSING", "@CC3$$1NG"];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisitedPortfolio");

    if (hasVisited) {
      setIsLoading(false);
      setHasChecked(true);
      return;
    }

    // First visit - show loading screen
    setIsLoading(true);
    sessionStorage.setItem("hasVisitedPortfolio", "true");

    // If user prefers reduced motion, skip to end
    if (prefersReducedMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasChecked(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Glitch text animation
    const glitchInterval = setInterval(() => {
      setGlitchText(glitchVariants[Math.floor(Math.random() * glitchVariants.length)]);
    }, 150);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    // Hide loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasChecked(true);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  if (!hasChecked && !isLoading) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Cyber Grid */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(6, 182, 212, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 2px, transparent 2px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100 }}
                animate={{ y: "100vh" }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
                className="absolute text-cyan-400 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {Math.random().toString(36).substring(2, 15)}
              </motion.div>
            ))}
          </div>

          {/* Glowing Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Glitch Logo/Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Main Text with Glitch Effect */}
              <motion.h1
                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 relative"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                    "0 0 40px rgba(6, 182, 212, 0.8)",
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {glitchText}
                
                {/* RGB Split Effect */}
                <motion.span
                  className="absolute inset-0 text-red-500 mix-blend-screen"
                  animate={{
                    x: [-2, 2, -2],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  {glitchText}
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-blue-500 mix-blend-screen"
                  animate={{
                    x: [2, -2, 2],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                >
                  {glitchText}
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center text-cyan-400 text-sm md:text-base mt-4 font-mono tracking-widest"
              >
                PORTFOLIO SYSTEM
              </motion.p>
            </motion.div>

            {/* Hexagon Progress */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative w-32 h-32"
            >
              {/* Rotating Hexagon */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 100 100"
                className="absolute inset-0"
              >
                <polygon
                  points="50 1 95 25 95 75 50 99 5 75 5 25"
                  fill="none"
                  stroke="url(#hexGradient)"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Progress Circle */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
                  className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-2xl font-bold text-cyan-400 font-mono"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 1)",
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]"
                />
                <span className="text-cyan-400 text-sm font-mono">
                  {progress < 30 && "INITIALIZING SYSTEMS..."}
                  {progress >= 30 && progress < 60 && "LOADING MODULES..."}
                  {progress >= 60 && progress < 90 && "ESTABLISHING CONNECTION..."}
                  {progress >= 90 && "ACCESS GRANTED"}
                </span>
              </div>
            </motion.div>

            {/* Binary Code Stream */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="text-cyan-400/30 text-xs font-mono mt-4"
            >
              <motion.span
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                01001000 01000001 01000011 01001011
              </motion.span>
            </motion.div>
          </div>

          {/* Corner Scanlines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
