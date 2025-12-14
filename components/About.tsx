'use client';

import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import Image from 'next/image';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title with dramatic entrance */}
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image - Simple Photo */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex justify-center mt-19"
          >
            <ParallaxSection speed={-0.2}>
              <div className="relative group max-w-lg w-full mx-auto">
                {/* Multiple Shadow Layers for Depth - Monochrome */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl transform translate-x-6 translate-y-6 opacity-20 blur-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl transform translate-x-3 translate-y-3 opacity-30 blur-md"></div>
                
                {/* Main Photo Container - Monochrome Border */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-transparent bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 p-1 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 shadow-2xl">
                  {/* Inner Photo Frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900">
                    {/* Profile Photo */}
                    <img 
                      src="/rizal.jpg" 
                      alt="M. Rizal Basri"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay - Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-700"></div>
                  </div>
                </div>
                
                {/* Decorative corner accents - Monochrome */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </div>
            </ParallaxSection>
          </motion.div>

          {/* About Text - Slide from right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg text-gray-300">
              Hi! I'm a passionate developer who loves creating beautiful and functional web experiences.
              With expertise in modern web technologies, I bring ideas to life through clean code and stunning design.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-gray-300">
              I specialize in building responsive, user-friendly applications that not only look great but also
              provide exceptional user experiences.
            </motion.p>

            {/* Timeline with sequential animation */}
            <motion.div variants={itemVariants} className="space-y-4 pt-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Education</h3>
              
              <motion.div
                custom={0}
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-purple-500"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                <div className="mb-6">
                  <p className="text-sm text-gray-400">Oct 2024 - Present</p>
                  <h4 className="text-xl font-semibold text-white">President University</h4>
                  <p className="text-gray-300">Pekanbaru - Bachelor's Degree in Informatics</p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-cyan-500"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full" />
                <div className="mb-6">
                  <p className="text-sm text-gray-400">Sep 2021 - Jul 2024</p>
                  <h4 className="text-xl font-semibold text-white">SMK Negeri 2 Tembilahan</h4>
                  <p className="text-gray-300">Vocational High School - Computer and Network Engineering</p>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-sm text-gray-400">Continuous Learning</p>
                  <h4 className="text-xl font-semibold text-white">Self-Taught Developer</h4>
                  <p className="text-gray-300">Online courses, bootcamps, and personal projects</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

