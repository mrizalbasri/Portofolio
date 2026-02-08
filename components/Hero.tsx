"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { SiReact, SiDocker, SiKalilinux } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { GridBeam } from "./ui/grid-beam";
import { Spotlight } from "./ui/spotlight";
import MagneticButton from "./MagneticButton";


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

  // Floating animation for icons
  const floatingVariants = {
    initial: { y: 0 },
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: custom * 0.5,
      },
    }),
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-4 md:pt-8 pb-4 md:pb-8 px-4">
       {/* Backgrounds */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <GridBeam className="opacity-20 translate-y-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
       </div>

       {/* Floating Tech Icons - Cyber/Tech Theme - Hidden on mobile */}
       <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
          {/* Left Side Icons */}
          <motion.div 
            variants={floatingVariants} 
            custom={1} 
            initial="initial" 
            animate="animate" 
            whileHover={{ scale: 1.3 }}
            className="absolute top-1/3 left-[10%] md:left-[20%] pointer-events-auto cursor-pointer"
          >
             <SiKalilinux className="text-4xl md:text-6xl text-cyan-400 transition-all duration-300 hover:text-cyan-300" />
          </motion.div>
          <motion.div 
            variants={floatingVariants} 
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
            variants={floatingVariants} 
            custom={3} 
            initial="initial" 
            animate="animate" 
            whileHover={{ scale: 1.3 }}
            className="absolute top-1/4 right-[10%] md:right-[20%] pointer-events-auto cursor-pointer"
          >
             <VscVscode className="text-4xl md:text-6xl text-blue-400 transition-all duration-300 hover:text-blue-300" />
          </motion.div>
          <motion.div 
            variants={floatingVariants} 
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center relative w-full mb-4 md:mb-6 lg:mb-8"
          >
              {/* Massive Background Text - Responsive */}
              <h1 className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-black text-white/5 leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none blur-sm">
                CYBER DEV
              </h1>

              {/* Foreground Text - Sharp & Clean - Responsive */}
              <div className="relative z-10 space-y-2 md:space-y-4 px-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight">
                    FULL STACK & <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">SECURE SYSTEMS</span>
                  </h2>
              </div>
          </motion.div>
 
          {/* Character Image - 3D Parallax - Safe Positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[450px] lg:w-[420px] lg:h-[500px] xl:w-[480px] xl:h-[560px] -mt-4 md:-mt-6 lg:-mt-8"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center max-w-2xl relative z-30 px-4 -mt-8.5 md:-mt-16.5 lg:-mt-24.5 xl:-mt-28.5"
          >
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                 I build <span className="text-white font-semibold">Resilient</span> and <span className="text-white font-semibold">Scalable</span> digital infrastructures.
                 Focusing on <span className="text-cyan-400">Security</span>, <span className="text-cyan-400">Performance</span>, and <span className="text-cyan-400">Experience</span>.
              </p>
          </motion.div>
       </div>
    </section>
  );
}
