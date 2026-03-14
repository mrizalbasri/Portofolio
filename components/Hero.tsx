"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { SiReact, SiDocker, SiKalilinux } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { GridBeam } from "./ui/grid-beam";
import { Spotlight } from "./ui/spotlight";
import MagneticButton from "./MagneticButton";
import {
  FLOATING_VARIANTS,
  SCALE_IN,
  FADE_IN_UP,
} from "@/constants/animations";

/**
 * Hero Section Component.
 * Renders the landing section with spotlight/grid background,
 * floating tech icons, and a 3D parallax character image.
 */
export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 pt-24 pb-10 sm:pt-28 sm:pb-12 md:min-h-screen md:pt-8 md:pb-8"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <GridBeam className="opacity-20 translate-y-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>

      {/* Floating Tech Icons - Cyber/Tech Theme - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
        {/* Left Side Icons */}
        <motion.div
          variants={FLOATING_VARIANTS}
          custom={1}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.3 }}
          className="absolute top-1/3 left-[10%] md:left-[20%] pointer-events-auto cursor-pointer"
        >
          <SiKalilinux className="text-4xl md:text-6xl text-cyan-400 transition-all duration-300 hover:text-cyan-300" />
        </motion.div>
        <motion.div
          variants={FLOATING_VARIANTS}
          custom={2}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.3 }}
          className="absolute bottom-1/4 left-[15%] md:left-[25%] pointer-events-auto cursor-pointer"
        >
          <SiDocker className="text-3xl md:text-5xl text-blue-400 transition-all duration-300 hover:text-blue-300" />
        </motion.div>

        {/* Right Side Icons */}
        <motion.div
          variants={FLOATING_VARIANTS}
          custom={3}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.3 }}
          className="absolute top-1/4 right-[10%] md:right-[20%] pointer-events-auto cursor-pointer"
        >
          <VscVscode className="text-4xl md:text-6xl text-blue-400 transition-all duration-300 hover:text-blue-300" />
        </motion.div>
        <motion.div
          variants={FLOATING_VARIANTS}
          custom={4}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.3 }}
          className="absolute bottom-1/3 right-[15%] md:right-[25%] pointer-events-auto cursor-pointer"
        >
          <SiReact className="text-3xl md:text-5xl text-cyan-400 transition-all duration-300 hover:text-cyan-300" />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-0 w-full flex flex-col items-center justify-center text-center h-full max-w-6xl px-4">
        {/* Text Section - Positioned Higher */}
        <motion.div
          {...SCALE_IN}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center relative w-full mb-4 md:mb-6 lg:mb-8"
        >
          {/* Massive Background Text - Responsive */}
          <h1 className="text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-black text-white/5 leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none blur-sm">
            CYBER DEV
          </h1>

          {/* Foreground Text - Sharp & Clean - Responsive */}
          <div className="relative z-10 space-y-2 md:space-y-4 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight">
              FULL STACK & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                SECURE SYSTEMS
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Character Image - 3D Parallax - Safe Positioning */}
        <motion.div
          {...SCALE_IN}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-2 h-72 w-56 sm:h-96 sm:w-80 md:-mt-6 md:h-[450px] md:w-96 lg:-mt-8 lg:h-[500px] lg:w-[420px] xl:h-[560px] xl:w-[480px]"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/carakter.png"
            alt="Character"
            fill
            className="object-contain object-top"
            priority
          />
        </motion.div>

        {/* Bottom Section: Bio Text Only - Final Perfect */}
        <motion.div
          {...FADE_IN_UP}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 mt-4 flex max-w-2xl flex-col items-center px-4 sm:mt-2 md:-mt-12 lg:-mt-20 xl:-mt-24"
        >
          <p className="text-sm leading-relaxed font-light text-zinc-300 sm:text-lg md:text-xl">
            I build <span className="text-white font-semibold">Resilient</span>{" "}
            and <span className="text-white font-semibold">Scalable</span>{" "}
            digital infrastructures. Focusing on{" "}
            <span className="text-cyan-400">Security</span>,{" "}
            <span className="text-cyan-400">Performance</span>, and{" "}
            <span className="text-cyan-400">Experience</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
