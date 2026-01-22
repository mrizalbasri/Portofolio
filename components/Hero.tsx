"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaDownload, FaCode } from "react-icons/fa";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { EncryptedText } from "./ui/encrypted-text";
import { GridBeam } from "./ui/grid-beam";
import { Cover } from "./ui/cover";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // GSAP animation: glow effect on title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        textShadow:
          "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <GridBeam className="h-screen flex items-center justify-center">
        {/* Background Orbs Removed as requested */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" />

        {/* Text Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight relative z-20"
            >
              <span className="hero-gradient-text">M. </span>
              <Cover className="text-white">Rizal</Cover>
              <span className="hero-gradient-text"> Basri</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl font-light tracking-wide mb-4"
          >
            <EncryptedText
              text="Full Stack Developer"
              encryptedClassName="text-neutral-500"
              revealedClassName="text-gray-300"
              revealDelayMs={80}
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            <EncryptedText
              text="Crafting beautiful and functional web experiences with modern technologies."
              encryptedClassName="text-neutral-600"
              revealedClassName="text-gray-400"
              revealDelayMs={30}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {/* Download CV Button */}
            <a
              href="/CV_M.RizalBasri_IT.pdf"
              download="M_Rizal_Basri_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-black/80 backdrop-blur-sm text-white flex items-center space-x-2 px-6 py-3 md:py-4 font-semibold text-base md:text-lg cursor-pointer"
                duration={1.5}
              >
                <FaDownload className="text-purple-400" />
                <span>Download CV</span>
              </HoverBorderGradient>
            </a>

            {/* View Projects Button */}
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black/80 backdrop-blur-sm text-white flex items-center space-x-2 px-6 py-3 md:py-4 font-semibold text-base md:text-lg cursor-pointer"
              duration={1.5}
              clockwise={false}
              onClick={scrollToProjects}
            >
              <FaCode className="text-cyan-400" />
              <span>View Projects</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </GridBeam>
    </section>
  );
}
