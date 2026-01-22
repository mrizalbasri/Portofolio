"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  // Animation intensity
  translateY?: number;
  rotateX?: number;
  scale?: number;
  // Whether to show opacity animation
  fadeIn?: boolean;
}

export default function ScrollAnimationWrapper({
  children,
  className = "",
  translateY = 50,
  rotateX = 5,
  scale = 0.95,
  fadeIn = true,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Smooth parallax transforms - works both directions
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [translateY, 0, -translateY]),
    springConfig
  );

  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [rotateX, 0, -rotateX]),
    springConfig
  );

  const scaleValue = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX: rotate,
        scale: scaleValue,
        opacity: fadeIn ? opacity : 1,
        transformPerspective: 1000,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
