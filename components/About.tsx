"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";



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
            <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium font-mono">
              About Me
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Profile Image */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
            >
               {/* 
                 Note: Replace with actual image later. 
                 For now, a placeholder div effectively communicates the layout.
               */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-xs text-center p-4">
                 [ YOUR PORTRAIT PHOTO HERE ]
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-white font-bold text-xl">M. Rizal Basri</h3>
                <p className="text-cyan-500 font-mono text-xs uppercase tracking-wider mt-1">Full Stack Developer</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 space-y-12">
            {/* Bio Card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
               <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Crafting digital experiences with <span className="text-cyan-500">precision</span> and content.
               </motion.h2>
              <motion.div variants={itemVariants} className="space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
                <p>
                   I am a developer who believes that code is not just about functionality, but about creating an experience. 
                   With a deep focus on <strong className="text-white font-normal">performance</strong>, <strong className="text-white font-normal">accessibility</strong>, and <strong className="text-white font-normal">design</strong>, I build applications that solve real-world problems.
                </p>
                <p>
                  My journey started with a curiosity for how things work on the internet, which quickly turned into a passion for building them. Today, I work with modern technologies like Next.js, React, and TypeScript to build scalable solutions.
                </p>
              </motion.div>
            </motion.div>

            {/* Timeline / Education */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t border-zinc-800 pt-12"
            >
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                 Education & Roadmap
              </h3>

              <div className="space-y-12 px-4 border-l border-zinc-800 ml-3">
                <motion.div variants={timelineVariants} custom={0} className="relative pl-8">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-black" />
                  <div>
                    <span className="text-xs font-mono text-cyan-500 tracking-wider uppercase mb-2 block">Jun 2024 - Present</span>
                    <h4 className="text-xl font-bold text-white mb-1">Bachelor of Informatics</h4>
                    <p className="text-zinc-500">President University</p>
                  </div>
                </motion.div>

                <motion.div variants={timelineVariants} custom={1} className="relative pl-8">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-600 ring-4 ring-black" />
                   <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase mb-2 block">2021 - 2024</span>
                    <h4 className="text-xl font-bold text-white mb-1">Vocational High School</h4>
                    <p className="text-zinc-500">SMK Negeri 2 Tembilahan — Computer Network Engineering</p>
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
