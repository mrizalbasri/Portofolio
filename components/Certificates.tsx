"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// Ensure ThreeDMarquee is generic enough or update it if it's strictly for projects.
// Assuming ThreeDMarquee accepts a list of image URLs.
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { FADE_IN_LEFT } from "@/constants/animations";

export function Certificates() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };

  // Simple opacity fade only
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]),
    springConfig,
  );

  // Certificate images - Using placeholder images for demo
  const certificateImages = [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
  ];

  return (
    <div
      ref={ref}
      className="relative py-12 overflow-hidden [perspective:1000px] w-full"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />

      {/* Ambient Light Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.div {...FADE_IN_LEFT} className="flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
            Certificates
          </span>
        </motion.div>
      </div>

      {/* 3D Marquee with Full Width Styling */}
      <motion.div
        className="w-full bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent backdrop-blur-sm"
        style={{ opacity }}
      >
        {/* Pass certificate images to the marquee */}
        <ThreeDMarquee
          images={certificateImages}
          className="max-w-none w-full"
        />
      </motion.div>
    </div>
  );
}

export default Certificates;
