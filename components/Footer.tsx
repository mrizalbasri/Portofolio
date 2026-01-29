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

  // Smooth 3D Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, 0]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 1]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]),
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
      className="relative min-h-screen bg-black overflow-hidden flex flex-col pt-20"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
          rotateX,
        }}
        className="flex-1 flex flex-col"
      >
        {/* Stars Background */}
        <StarsBackground
          starDensity={0.0002}
          allStarsTwinkle={true}
          twinkleProbability={0.8}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={1}
          className="z-[1] opacity-50"
        />

        {/* Shooting Stars */}
        <ShootingStars
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
          starColor="#06b6d4" // Cyan
          trailColor="#3b82f6" // Blue
          starWidth={15}
          starHeight={2}
          className="z-[2]"
        />

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-cyan-950/10 to-black z-[3]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 z-[4]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-12 z-[10]">
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-2xl z-[20] relative">
            {/* Big Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
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
              className="mt-8 text-zinc-400 text-lg md:text-xl max-w-lg"
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
              className="mt-10"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaEnvelope />
                  Get in Touch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  <FaEnvelope className="mr-2" />
                  Get in Touch
                </span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex gap-4"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="text-xl" />
                  </motion.a>
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
            className="flex-1 w-full h-[400px] md:h-[500px] lg:h-[600px] mt-10 lg:mt-0 z-[15] relative"
          >
            <RobotModelScene />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="relative border-t border-white/10 z-[20] bg-black">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Navigation Links */}
              <motion.nav
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider font-mono"
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
                className="p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all"
                aria-label="Back to top"
              >
                <FaArrowUp />
              </motion.button>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-white/5 text-center"
            >
              <p className="text-zinc-600 text-sm">
                © {currentYear}{" "}
                <span className="text-cyan-500 font-medium">M. Rizal Basri</span> — All
                rights reserved.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Animated Gradient Line at Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 z-[25]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </footer>
  );
}
