"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { FADE_IN, FADE_IN_UP, STAGGER_ITEM } from "@/constants/animations";
import {
  NAV_ITEMS,
  MOBILE_MENU_TRANSITION_DELAY,
} from "@/constants/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeSection = (() => {
    const path = pathname || "";
    if (path === "/" || path === "") return "home";
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/skills")) return "skills";
    if (path.startsWith("/projects")) return "projects";
    if (path.startsWith("/blog")) return "blog";
    return "home";
  })();

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

  const navItems = NAV_ITEMS;

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, MOBILE_MENU_TRANSITION_DELAY);
  };

  return (
    <>
      {/* Minimal Top Bar - Only Logo and Menu Button */}
      <motion.nav
        {...FADE_IN}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[9999] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="relative z-[5200] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Home"
          >
            <Image
              src="/logo.webp"
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12 md:w-14 md:h-14"
              priority
            />
          </motion.a>

          {/* Menu Button - 2 Lines with Flying Arrow Animation */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[5200] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* SVG Hamburger with Flying Arrow Animation */}
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              className="relative z-10"
            >
              {/* Top line - flies from top-right, forms X */}
              <motion.line
                x1="2"
                x2="30"
                y1="22"
                y2="2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isMenuOpen ? 1 : 0,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              />

              {/* Bottom line - flies from bottom-left, forms X */}
              <motion.line
                x1="30"
                x2="2"
                y1="22"
                y2="2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isMenuOpen ? 1 : 0,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.05,
                }}
              />

              {/* Hamburger lines when closed */}
              <motion.line
                x1="4"
                x2="28"
                y1="4"
                y2="4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  pathLength: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
              <motion.line
                x1="4"
                x2="28"
                y1="20"
                y2="20"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  pathLength: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              clipPath: "circle(0% at calc(100% - 44px) 44px)",
              opacity: 0,
            }}
            animate={{
              clipPath: "circle(160% at calc(100% - 44px) 44px)",
              opacity: 1,
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 44px) 44px)",
              opacity: 0,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] overflow-y-auto overscroll-contain bg-[#0a0a0a]/95 backdrop-blur-sm"
          >
            {/* Menu Content */}
            <div className="flex min-h-full flex-col md:h-full md:flex-row">
              {/* Left Side - Large Text */}
              <div className="hidden md:flex md:w-1/3 items-end p-10">
                <motion.h1
                  {...FADE_IN_UP}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-[8rem] lg:text-[10rem] font-black text-white/5 leading-none"
                >
                  RIZAL
                </motion.h1>
              </div>

              {/* Right Side - Navigation Links */}
              <div className="flex flex-1 flex-col justify-center px-6 py-24 sm:px-8 sm:py-28 md:px-14 md:py-16 lg:px-20">
                <nav className="space-y-3 md:space-y-4">
                  {navItems.map((item, index) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      index={index}
                      isActive={activeSection === item.id}
                      onClick={() => handleNavClick(item.href)}
                    />
                  ))}
                </nav>

                {/* Contact Info */}
                <motion.div
                  {...STAGGER_ITEM}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-16 space-y-2"
                >
                  <p className="text-gray-300 text-sm md:text-base">
                    mrizalbasri@email.com
                  </p>
                  <p className="text-gray-300 text-sm md:text-base">
                    Full Stack Developer
                  </p>
                </motion.div>

                {/* Ask AI Button */}
                <motion.button
                  {...STAGGER_ITEM}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.dispatchEvent(new Event("toggle-chat-widget"));
                    setIsMenuOpen(false);
                  }}
                  className="relative mt-8 px-6 py-3 min-h-[44px] bg-white text-black rounded-full inline-flex items-center gap-2 w-fit overflow-hidden group"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shine effect */}
                  <motion.div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <motion.svg
                    className="w-5 h-5 relative z-10 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </motion.svg>
                  <span className="font-medium relative z-10 group-hover:text-white transition-colors">
                    Ask AI Assistant
                  </span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-cyan-500/50 -z-10" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
