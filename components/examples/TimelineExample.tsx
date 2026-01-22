"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Example: Timeline Animation
 * Gunakan component ini untuk sequence multiple animations
 */
export default function TimelineExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    // Sequence animations
    tl.from(".timeline-item-1", {
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: "back.out",
    })
      .from(
        ".timeline-item-2",
        {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "back.out",
        },
        0.2 // Start 0.2s after previous animation
      )
      .from(
        ".timeline-item-3",
        {
          opacity: 0,
          x: 50,
          duration: 0.6,
          ease: "back.out",
        },
        0.4 // Start 0.4s after first animation
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-8 items-center justify-center py-12"
    >
      <div className="timeline-item-1 w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
        1
      </div>
      <div className="timeline-item-2 w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
        2
      </div>
      <div className="timeline-item-3 w-20 h-20 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
        3
      </div>
    </div>
  );
}
