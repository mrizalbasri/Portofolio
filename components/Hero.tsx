"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { FaDownload } from "react-icons/fa";
import { GridBeam } from "./ui/grid-beam";
export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll Hooks
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]); // Text moves down slower (0.4x speed)
  const yGraphic = useTransform(scrollY, [0, 500], [0, -100]); // Graphic moves up (reverse parallax)
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]); // Fade out text on scroll

  useEffect(() => {
    // Subtle GSAP animation on title
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full overflow-hidden bg-background flex items-center pt-20 md:pt-0">
      {/* Background Texture - Parallax Fixed */}
      <div className="absolute inset-0 z-0">
         <GridBeam className="opacity-30" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content - Parallax Text */}
            <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-20">
                {/* Top Tagline */}
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6 flex items-center gap-3"
                >
                <div className="w-12 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <span className="text-cyan-400 font-mono tracking-widest text-sm uppercase font-bold text-shadow-sm">Full Stack Developer</span>
                </motion.div>

                {/* Main Title */}
                <div className="mb-8 relative">
                    <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]">
                        DIGITAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500">CRAFTSMAN</span>
                    </h1>
                </div>

                {/* Name & Bio */}
                <div className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="max-w-lg"
                    >
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                        I am <strong className="text-white font-semibold">M. Rizal Basri</strong>. 
                        <br />
                        Building <span className="text-cyan-400">accessible</span>, <span className="text-cyan-400">pixel-perfect</span>, and <span className="text-cyan-400">performant</span> web experiences.
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="flex items-center gap-8"
                    >
                        <a 
                            href="/CV_M.RizalBasri_IT.pdf"
                            download="M_Rizal_Basri_CV.pdf"
                            className="group flex items-center gap-3 text-white hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                            <span className="font-mono text-sm uppercase tracking-widest border-b border-transparent group-hover:border-cyan-400 pb-1">Download CV</span>
                            <FaDownload className="text-sm group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Content - Visual / Media Area */}
            <motion.div 
                style={{ y: yGraphic }}
                className="hidden lg:flex justify-center items-center relative h-[600px]"
            >
                 {/* 
                    REPLACE THIS DIV WITH YOUR 3D IMAGE or PROFILE PHOTO
                    Example: <Image src="/my-3d-photo.png" alt="Hero" width={500} height={600} />
                 */}
                 <div className="relative w-full h-full flex items-center justify-center">
                      {/* Geometric Decorative Circle 1 */}
                      <div className="absolute w-[400px] h-[400px] rounded-full border border-zinc-800 animate-[spin_20s_linear_infinite]" />
                      
                      {/* Geometric Decorative Circle 2 - Reverse */}
                      <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-zinc-700 animate-[spin_15s_linear_infinite_reverse]" />

                      {/* Main Visual Placeholder - Glowing Orb/Gradient for now */}
                      <div className="w-[250px] h-[250px] relative">
                          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full opacity-20 animate-[bounce_5s_infinite]" />
                          
                          {/* Placeholder Text for User */}
                          <div className="absolute inset-0 flex items-center justify-center text-center">
                              <p className="text-xs text-zinc-500 font-mono">
                                  [ INSERT YOUR <br/> 3D / PROFILE IMAGE <br/> HERE ]
                              </p>
                          </div>
                      </div>
                 </div>
            </motion.div>

        </div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-4 z-30"
      >
         <span className="writing-mode-vertical text-zinc-600 font-mono text-xs tracking-widest uppercase rotate-180">Scroll</span>
         <div className="w-[1px] h-12 bg-zinc-800 overflow-hidden relative">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-1/2 bg-cyan-500" 
            />
         </div>
      </motion.div>

    </section>
  );
}
