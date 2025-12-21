'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { name: 'Home', href: '#', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-4 md:py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo - Hidden saat scroll */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 transition-opacity duration-300 ${!isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Home"
            >
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={60} 
                height={60}
                className="w-18 h-18"
                priority
              />
            </motion.a>

            {/* Desktop Navigation - Hidden saat scroll */}
            <div className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ml-auto ${!isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group overflow-hidden h-6 block"
                >
                  {/* Teks Normal */}
                  <span className={`group-hover:translate-y-full transition-transform duration-300 ease-out block ${activeSection === item.id ? 'opacity-0' : 'text-gray-300'}`}>
                    {item.name}
                  </span>
                  
                  {/* Teks yang datang dari atas */}
                  <span className={`absolute top-0 left-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold ${activeSection === item.id ? 'translate-y-0 text-white' : ''}`}>
                    {item.name}
                  </span>
                  
                  {/* Underline gradient */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </motion.a>
              ))}
            </div>

            {/* Orbital Rings Hamburger Button - Fixed Position */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hidden md:flex fixed top-6 right-6 w-16 h-16 items-center justify-center group transition-opacity duration-300 ${isScrolled ? 'opacity-100 z-[100]' : 'opacity-0 pointer-events-none'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {/* Outer Ring */}
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180, scale: 1.3 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
              />
              
              {/* Middle Ring */}
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -180, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-2 rounded-full border-2 border-purple-500/40"
              />
              
              {/* Inner Circle with Gradient */}
              <motion.div
                animate={isMobileMenuOpen ? { scale: 0.8, rotate: 90 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 shadow-lg shadow-purple-500/50"
              />
              
              {/* Orbiting Dots */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={isMobileMenuOpen ? {
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  } : {
                    rotate: 0,
                    scale: 1
                  }}
                  transition={{
                    rotate: { 
                      duration: 2, 
                      repeat: isMobileMenuOpen ? Infinity : 0, 
                      ease: "linear" 
                    },
                    scale: { duration: 0.5 }
                  }}
                  className="absolute w-10 h-10"
                  style={{ left: '50%', top: '50%', marginLeft: -20, marginTop: -20 }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50"
                    style={{ 
                      left: '50%',
                      top: 0,
                      marginLeft: -4,
                      transform: `rotate(${i * 120}deg) translateY(-20px)`
                    }}
                  />
                </motion.div>
              ))}

              {/* Center Icon - Menu/X */}
              <motion.div
                animate={isMobileMenuOpen ? {
                  rotate: 180,
                  scale: 1.2
                } : {
                  rotate: 0,
                  scale: 1
                }}
                transition={{ duration: 0.4 }}
                className="absolute z-10"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                animate={isMobileMenuOpen ? {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                } : {
                  opacity: 0.2,
                  scale: 1
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 blur-xl -z-10"
              />
            </motion.button>


            {/* Mobile Menu Button (selalu ada di mobile) */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-14 h-14 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {/* Outer Glow */}
              <motion.div
                animate={isMobileMenuOpen ? { 
                  opacity: 0.8, 
                  scale: 1.5,
                  rotate: 180 
                } : { 
                  opacity: 0.2, 
                  scale: 1,
                  rotate: 0 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 blur-lg"
              />
              
              {/* Main Circle Background */}
              <motion.div
                animate={isMobileMenuOpen ? { 
                  scale: 1.1,
                  rotate: 90 
                } : { 
                  scale: 1,
                  rotate: 0 
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-white/20 group-hover:border-white/40 transition-colors"
              />
              
              {/* Animated Dots/Ring */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 4 Corner Dots that expand to ring */}
                {[0, 1, 2, 3].map((index) => {
                  const angle = (index * 90) - 45;
                  const radius = isMobileMenuOpen ? 16 : 8;
                  
                  return (
                    <motion.div
                      key={index}
                      animate={isMobileMenuOpen ? {
                        x: Math.cos((angle * Math.PI) / 180) * radius,
                        y: Math.sin((angle * Math.PI) / 180) * radius,
                        scale: 1.5,
                        opacity: 0.8,
                        rotate: 360
                      } : {
                        x: Math.cos((angle * Math.PI) / 180) * 6,
                        y: Math.sin((angle * Math.PI) / 180) * 6,
                        scale: 1,
                        opacity: 1,
                        rotate: 0
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.4, 0, 0.2, 1],
                        delay: index * 0.05 
                      }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400"
                    />
                  );
                })}
                
                {/* Center Icon */}
                <motion.div
                  animate={isMobileMenuOpen ? {
                    rotate: 180,
                    scale: 1.2
                  } : {
                    rotate: 0,
                    scale: 1
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Side Menu Panel - Muncul dari kanan */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                duration: 0.3
              }}
              className="fixed top-0 right-0 h-full w-96 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 shadow-2xl z-[120] border-l border-purple-500/30 overflow-hidden"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
                />
              </div>

              <div className="relative h-full p-8 flex flex-col">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all group"
                  aria-label="Close Menu"
                >
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Decorative Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-10 mb-12"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Navigation
                  </h2>
                </motion.div>

                {/* Menu Items */}
                <div className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block relative group"
                    >
                      <div className="relative px-6 py-5 rounded-xl overflow-hidden transition-all duration-300">
                        {/* Hover Background */}
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: activeSection === item.id ? 0 : '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-l-2 border-purple-500 transition-opacity ${activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        />
                        
                        {/* Animated Border */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 origin-left"
                        />

                        {/* Content */}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Animated Dot Indicator */}
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.08 }}
                              className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 ${activeSection === item.id ? 'opacity-100 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'opacity-50'}`}
                            />
                            
                            <span className={`text-2xl font-semibold transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                              {item.name}
                            </span>
                          </div>

                          {/* Arrow Icon */}
                          <motion.svg
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="w-6 h-6 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>

                        {/* Number Badge */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          className="absolute top-2 right-5 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-all"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Footer Decoration */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-white/5"
                >
                  <div className="flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-purple-500"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}