"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * GridBeam Background Component
 * 
 * A background component featuring a grid pattern with a central glowing beam.
 * Matches the aesthetic of clean, modern, and "Magic UI" style interfaces.
 */
export const GridBeam = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-screen overflow-hidden bg-neutral-950 flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: "8rem 8rem",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
            opacity: 0.2,
          }}
        />
        
        {/* Intersection Dots */}
        <div 
            className="absolute inset-0" 
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
                backgroundSize: "8rem 8rem",
                maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
                opacity: 0.3
            }}
        />
      </div>

      {/* Moving Grid Beams - Horizontal */}
      {[1, 3, 5, 8, 12].map((row, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 animate-grid-beam-h"
          style={{
            top: `${row * 8}rem`, // Aligns with grid lines (8rem spacing)
            animationDelay: `${i * 2.3}s`,
            animationDuration: '6s'
          }}
        />
      ))}

      {/* Moving Grid Beams - Vertical */}
      {[1, 4, 7, 11, 15, 20].map((col, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 animate-grid-beam-v"
          style={{
            left: `${col * 8}rem`, // Aligns with grid lines (8rem spacing)
            animationDelay: `${i * 1.8}s`,
            animationDuration: '5s'
          }}
        />
      ))}

      {/* Central Beam / Spotlight with Animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] max-w-5xl pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent blur-3xl animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">{children}</div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-0 pointer-events-none" />
    </div>
  );
};
