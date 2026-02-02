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
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-24 pb-12">
       {/* Backgrounds */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <GridBeam className="opacity-20 translate-y-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
       </div>

       {/* Floating Tech Icons - Cyber/Tech Theme */}
       <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
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
       {/* Text is placed BEHIND the Robot (z-0 to z-10 relation) */}
       {/* We will make the text HUGE and filling the screen */}
       <div className="container mx-auto px-4 relative z-0 w-full flex flex-col items-center justify-center text-center gap-8 h-full">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center relative"
          >
              {/* Massive Background Text */}
              <h1 className="text-[12vw] md:text-[14vw] font-black text-white/5 leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none blur-sm">
                CYBER DEV
              </h1>

              {/* Foreground Text - Sharp & Clean */}
              <div className="relative z-10 space-y-4">

                  <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                    FULL STACK & <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">SECURE SYSTEMS</span>
                  </h2>
              </div>
          </motion.div>
 
          {/* Character Image - 3D Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-64 h-64 md:w-80 md:h-80 my-8"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <Image
              src="/carakter.png"
              alt="Character"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Bottom Section: Bio & Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center max-w-2xl relative z-30"
          >
              <p className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed font-light">
                 I build <span className="text-white font-semibold">Resilient</span> and <span className="text-white font-semibold">Scalable</span> digital infrastructures.
                 Focusing on <span className="text-cyan-400">Security</span>, <span className="text-cyan-400">Performance</span>, and <span className="text-cyan-400">Experience</span>.
              </p>


          </motion.div>
       </div>
    </section>
  );
}
