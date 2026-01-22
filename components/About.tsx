"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Smooth 3D Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]),
    springConfig
  );

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
          rotateX,
        }}
        className="max-w-6xl mx-auto"
      >
        {/* Clean Modern Header - Minimal */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
            <span className="text-sm uppercase tracking-wider text-gray-500 font-medium">
              About
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Profile Image */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl group"
            >
              <Image
                src="/rizal.jpg"
                alt="M. Rizal Basri"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                <h3 className="text-white font-bold text-lg">M. Rizal Basri</h3>
                <p className="text-gray-300 text-xs">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Quick Stats or Socials could go here */}
          </div>

          {/* Right Column: Content */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 space-y-8">
            {/* Bio Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            >
               <motion.h2 variants={itemVariants} className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
                Crafting Digital Experiences
              </motion.h2>
              <motion.div variants={itemVariants} className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                   Hi! I&apos;m a passionate developer who loves creating beautiful and
                  functional web experiences. With expertise in modern web
                  technologies, I bring ideas to life through clean code and
                  stunning design.
                </p>
                <p>
                  I specialize in building responsive, user-friendly applications
                  that not only look great but also provide exceptional user
                  experiences.
                </p>
              </motion.div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full inline-block"></span>
                Education & Growth
              </h3>

              <div className="space-y-8">
                <motion.div variants={timelineVariants} custom={0} className="group flex gap-4">
                  <div className="flex-none pt-1">
                     <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                     </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1 block">Oct 2024 - Present</span>
                    <h4 className="text-xl font-bold text-white mb-1">President University</h4>
                    <p className="text-gray-400">Pekanbaru - Bachelor&apos;s Degree in Informatics</p>
                  </div>
                </motion.div>

                <motion.div variants={timelineVariants} custom={1} className="group flex gap-4">
                   <div className="flex-none pt-1">
                     <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-cyan-500" />
                     </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1 block">Sep 2021 - Jul 2024</span>
                    <h4 className="text-xl font-bold text-white mb-1">SMK Negeri 2 Tembilahan</h4>
                    <p className="text-gray-400">Vocational High School - Computer and Network Engineering</p>
                  </div>
                </motion.div>

                 <motion.div variants={timelineVariants} custom={2} className="group flex gap-4">
                   <div className="flex-none pt-1">
                     <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                     </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-1 block">Continuous Learning</span>
                    <h4 className="text-xl font-bold text-white mb-1">Self-Taught Developer</h4>
                    <p className="text-gray-400">Online courses, bootcamps, and personal projects</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
