"use client";
import { useId } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const generateParticles = () => {
      const density = particleDensity || 50;
      const newParticles = Array.from({ length: density }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size:
          Math.random() * ((maxSize || 2) - (minSize || 0.5)) +
          (minSize || 0.5),
        duration: Math.random() * 3 + 2,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, [particleDensity, minSize, maxSize]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
      style={{ background: background || "transparent" }}
    >
      {particles.map((particle) => (
        <motion.span
          key={`${id}-${particle.id}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particleColor || "#ffffff",
          }}
        />
      ))}
    </div>
  );
};

import { useState } from "react";

export default SparklesCore;
