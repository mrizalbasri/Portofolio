"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { SCALE_IN } from "@/constants/animations";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update percentage on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setDisplayPercentage(Math.round(latest * 100));
  });

  return (
    <>
      {/* Circular Progress Indicator - Bottom Right - Show on mobile too but smaller */}
      <motion.div
        {...SCALE_IN}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9998] flex"
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-[6px]" />
          {/* Background Circle */}
          <svg
            className="w-10 h-10 md:w-12 md:h-12 -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(6,182,212,0.22)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#scroll-progress-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="125.6"
              style={{
                strokeDashoffset: useTransform(scaleX, [0, 1], [125.6, 0]),
              }}
            />
            <defs>
              <linearGradient
                id="scroll-progress-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="55%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-cyan-100">
            <span>{displayPercentage}%</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
