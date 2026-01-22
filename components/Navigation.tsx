"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "HOME", href: "#", id: "home" },
    { name: "ABOUT ME", href: "#about", id: "about" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      {/* Minimal Top Bar - Only Logo and Menu Button */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[5000] px-6 py-6 md:px-10 md:py-8"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="relative z-[5200]"
            aria-label="Home"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12 md:w-14 md:h-14"
              priority
            />
          </motion.a>

          {/* Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[5200] flex items-center gap-3 group p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {/* Hamburger Icon */}
            <div className="relative w-8 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={
                  isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }
                }
                transition={{ duration: 0.3 }}
                className={`absolute w-6 h-0.5 transition-colors duration-300 ${
                  isMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`absolute w-6 h-0.5 transition-colors duration-300 ${
                  isMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
              <motion.span
                animate={
                  isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }
                }
                transition={{ duration: 0.3 }}
                className={`absolute w-6 h-0.5 transition-colors duration-300 ${
                  isMenuOpen ? "bg-black" : "bg-white"
                }`}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 60px) 60px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 60px) 60px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 60px) 60px)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[150] bg-[#f5f5f0]"
          >
            {/* Menu Content */}
            <div className="h-full flex flex-col md:flex-row">
              {/* Left Side - Large Text */}
              <div className="hidden md:flex md:w-1/3 items-end p-10">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-[8rem] lg:text-[10rem] font-black text-black/10 leading-none"
                >
                  RIZAL
                </motion.h1>
              </div>

              {/* Right Side - Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-20">
                <nav className="space-y-2 md:space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group relative block w-full text-left"
                      >
                        <span
                          className={`text-4xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300 ${
                            activeSection === item.id
                              ? "text-purple-600"
                              : "text-black hover:text-purple-600"
                          }`}
                        >
                          {item.name}
                        </span>

                        {/* Underline Animation */}
                        <motion.div
                          className="h-1 bg-purple-600 origin-left mt-2"
                          initial={{
                            scaleX: activeSection === item.id ? 1 : 0,
                          }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{ scaleX: activeSection === item.id ? 1 : 0 }}
                        />
                      </button>
                    </motion.div>
                  ))}
                </nav>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-16 space-y-2"
                >
                  <p className="text-gray-600 text-sm md:text-base">
                    mrizalbasri@email.com
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Full Stack Developer
                  </p>
                </motion.div>

                {/* Ask AI Button */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  onClick={() => {
                    window.dispatchEvent(new Event("toggle-chat-widget"));
                    setIsMenuOpen(false);
                  }}
                  className="mt-8 px-6 py-3 bg-black text-white rounded-full inline-flex items-center gap-2 hover:bg-purple-600 transition-colors w-fit"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Ask AI Assistant</span>
                </motion.button>
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
