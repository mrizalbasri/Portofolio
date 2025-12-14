'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CurvedTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Wave starts hidden below viewport, moves up to cover when scrolling
  const y = useTransform(scrollYProgress, [0, 0.5], ["150%", "0%"]);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className="relative w-full overflow-visible pointer-events-none"
    >
      {/* Simple Curved Arc - Smooth semicircle */}
      <svg
        className="w-full h-24 md:h-32 lg:h-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,160 Q720,0 1440,160 L1440,320 L0,320 Z"
          className="text-black"
        />
      </svg>
    </motion.div>
  );
}
