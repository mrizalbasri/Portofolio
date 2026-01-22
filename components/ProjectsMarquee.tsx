"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ProjectsMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]),
    springConfig
  );

  // Project showcase images - mix of your projects and tech images
  const projectImages = [
    // Your projects
    "/projects/weather-app.png",
    "/MobileAppGrennFetch.png",
    // Aceternity showcase images
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
    // Repeat some for filling grid
    "/projects/weather-app.png",
    "/MobileAppGrennFetch.png",
  ];

  return (
    <div
      ref={ref}
      className="relative py-20 overflow-hidden [perspective:1000px]"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      {/* Ambient Light Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* 3D Marquee with Enhanced Styling */}
      <motion.div
        className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-gray-900/20 via-gray-800/10 to-gray-900/20 p-2 ring-1 ring-white/10 backdrop-blur-sm"
        style={{
          rotateX,
          rotateZ,
          translateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <ThreeDMarquee images={projectImages} />
      </motion.div>
    </div>
  );
}

export default ProjectsMarquee;
