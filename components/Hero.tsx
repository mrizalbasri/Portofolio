'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import MagneticButton from './MagneticButton';
import CurvedTransition from './CurvedTransition';
import { FaDownload, FaCode } from 'react-icons/fa';

// Dynamically import Three.js component to avoid SSR issues
const RobotModelScene = dynamic(() => import('./RobotModelScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 gradient-animation opacity-20" />
});

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 gradient-animation opacity-20" />
      
      {/* Container for split layout */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 hero-gradient-text leading-tight hero-text-reveal">
                M. Rizal Basri
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 font-light tracking-wide"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed"
            >
              Crafting beautiful and functional web experiences with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              {/* Download CV Button */}
              <a
                href="/cv.pdf" // Letakkan file CV Anda di public/cv.pdf
                download="M_Rizal_Basri_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton
                  as="div"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300 flex items-center gap-2 cursor-pointer"
                  strength={0.4}
                >
                  <FaDownload />
                  Download CV
                </MagneticButton>
              </a>
              
              {/* View Projects Button */}
              <div onClick={scrollToProjects}>
                <MagneticButton
                  as="div"
                  className="px-8 py-4 border-2 border-purple-600 rounded-full text-purple-400 font-semibold text-lg hover:bg-purple-600/10 transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                  strength={0.3}
                >
                  <FaCode />
                  View Projects
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Robot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]"
          >
            <RobotModelScene />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Curved Wave Transition - Covers from bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CurvedTransition />
      </div>
    </section>
  );
}

