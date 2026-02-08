"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

// Dynamically import Three.js component
const RobotModelScene = dynamic(() => import("./RobotModelScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 via-black to-blue-900/20" />
  ),
});

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Smooth Parallax transforms
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 1]),
    springConfig
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/mrizalbasri" },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/m-rizal-basri/",
    },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/6284668265398" },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/rizlbsri_",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative h-screen bg-black overflow-hidden flex flex-col pointer-events-auto"
      style={{ perspective: 1200, pointerEvents: 'auto' }}
    >
      {/* Stars Background - Outside motion.div */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <StarsBackground
          starDensity={0.0002}
          allStarsTwinkle={true}
          twinkleProbability={0.8}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={1}
          className="opacity-50"
        />
      </div>

      {/* Shooting Stars - Outside motion.div */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <ShootingStars
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
          starColor="#06b6d4"
          trailColor="#3b82f6"
          starWidth={15}
          starHeight={2}
        />
      </div>

      {/* Background Gradient - Outside motion.div */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-cyan-950/10 to-black z-[3] pointer-events-none" />

      {/* Grid Pattern - Outside motion.div */}
      <div className="absolute inset-0 opacity-5 z-[4] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{
          y,
          opacity,
          pointerEvents: 'auto',
        }}
        className="flex-1 flex flex-col relative z-50 pointer-events-auto h-full"
      >

        {/* Main Content - Takes most of the space */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-6 z-50">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              
              {/* Left Side - Text Content */}
              <div className="relative text-center lg:text-left pointer-events-auto" style={{ zIndex: 100 }}>
                {/* Big Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                    LET&apos;S
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      WORK
                    </span>
                    <br />
                    TOGETHER
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 md:mt-6 text-zinc-400 text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0"
                >
                  Have a project in mind? Let&apos;s create something amazing
                  together. I&apos;m always open to discussing new opportunities.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-6 md:mt-8 flex justify-center lg:justify-start"
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-bold text-sm sm:text-base rounded-full overflow-hidden transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                  >
                    <FaEnvelope className="relative z-10" />
                    <span className="relative z-10">Get in Touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6 md:mt-8 flex gap-3 justify-center lg:justify-start"
                >
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 md:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-110"
                        aria-label={social.name}
                      >
                        <IconComponent className="text-base md:text-lg" />
                      </a>
                    );
                  })}
                </motion.div>
              </div>

              {/* Right Side - 3D Robot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] pointer-events-none hidden sm:block"
                aria-hidden="true"
              >
                <RobotModelScene />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Stays at bottom */}
        <div className="relative border-t border-white/10 z-50 bg-black/80 backdrop-blur-sm pointer-events-auto shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Navigation Links */}
              <motion.nav
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 md:gap-5 relative z-10"
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-zinc-500 hover:text-cyan-400 transition-colors text-xs uppercase tracking-wider font-mono cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </motion.nav>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer relative z-10"
                aria-label="Back to top"
              >
                <FaArrowUp className="text-xs" />
              </motion.button>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5 text-center relative z-10"
            >
              <p className="text-zinc-600 text-xs">
                © {currentYear}{" "}
                <span className="text-cyan-500 font-medium">M. Rizal Basri</span> — All
                rights reserved.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Animated Gradient Line at Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 z-[25]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </footer>
  );
}
