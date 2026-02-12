"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasChecked, setHasChecked] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [glitchText, setGlitchText] = useState("RIZAL BASRI");

  // Glitch effect characters
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/AZ";

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

    // Glitch animation interval
    let glitchInterval: NodeJS.Timeout;
    if (!prefersReducedMotion) {
      glitchInterval = setInterval(() => {
        const originalText = "RIZAL BASRI";
        const splitText = originalText.split("").map((char, index) => {
          if (Math.random() < 0.1) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        });
        setGlitchText(splitText.join(""));
      }, 100);
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Slower progress for more drama
      });
    }, 40);

    // Hide loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasChecked(true);
    }, 2500); // Slightly longer duration

    return () => {
      clearInterval(progressInterval);
      if (glitchInterval) clearInterval(glitchInterval);
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
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden font-mono"
        >
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: "linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
                height: "200%"
              }} 
            />
             <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "0% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4">
            {/* Cyber Glitch Title */}
             <div className="relative mb-8 group">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest relative z-10 mix-blend-difference">
                   {glitchText}
                </h1>
                {/* Red/Blue Split Effect */}
                <span className="absolute top-0 left-0 -ml-[2px] text-cyan-500 opacity-70 animate-pulse mix-blend-screen">
                   {glitchText}
                </span>
                <span className="absolute top-0 left-0 ml-[2px] text-red-500 opacity-70 animate-pulse mix-blend-screen" style={{ animationDelay: "0.05s" }}>
                   {glitchText}
                </span>
             </div>

             {/* Status Text */}
             <div className="w-full flex justify-between text-xs text-cyan-500/70 mb-2 uppercase tracking-widest">
                <span>System Initialization</span>
                <span>{progress}%</span>
             </div>

             {/* Cyber Progress Bar */}
             <div className="w-full h-2 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                {/* Scanning line */}
                <motion.div 
                   className="absolute top-0 bottom-0 w-[20px] bg-white/20 blur-sm z-20"
                   animate={{ left: ["-20%", "120%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Main Fill */}
                <motion.div 
                   className="h-full bg-cyan-500 relative z-10"
                   initial={{ width: "0%" }}
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "linear" }}
                >
                   {/* Striped pattern on fill */}
                    <div className="absolute inset-0 opacity-30" 
                      style={{
                         backgroundImage: "linear-gradient(45deg, rgba(0,0,0,1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 75%, transparent 75%, transparent)",
                         backgroundSize: "4px 4px"
                      }}
                   />
                </motion.div>
             </div>
             
             {/* Decorative Bottom Details */}
             <div className="mt-4 flex gap-4 text-[10px] text-zinc-600 font-mono">
                <span>MEM: 64TB OK</span>
                <span>NET: CONNECTED</span>
                <span>SEC: ENCRYPTED</span>
             </div>

          </div>
          
          {/* Vignette & Scanlines Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
          <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
