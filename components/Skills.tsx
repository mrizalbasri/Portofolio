"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  SiLaravel,
  SiMysql,
  SiLinux,
  SiPhp,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiTailwindcss,
  SiBootstrap,
  SiAndroid,
  SiFirebase,
  SiNginx,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
];

export default function Skills() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Smooth 3D Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]),
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

      // Animate skill items with stagger
      if (containerRef.current) {
        const skillItems =
          containerRef.current.querySelectorAll("[data-skill-item]");
        gsap.fromTo(
          skillItems,
          { opacity: 0, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
          rotateX,
        }}
        className="max-w-7xl mx-auto"
      >
        {/* Clean Modern Header - Minimal */}
        <div className="mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
              Technologies
            </span>
          </motion.div>
        </div>

        {/* Skills Container */}
        <div ref={containerRef} className="space-y-8 md:space-y-12">
          
          {/* Row 1: Left to Right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden group">
              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8 px-2 md:px-4"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`row1-${skill.name}-${index}`}
                      className="relative group/card"
                    >
                      <div 
                        className="flex flex-col items-center justify-center gap-2 md:gap-3 w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm transition-all duration-500 group-hover/card:bg-zinc-800/50 group-hover/card:border-[var(--skill-color)] group-hover/card:shadow-[0_0_50px_-15px_var(--skill-color)]"
                        style={{ "--skill-color": skill.color } as React.CSSProperties}
                      >
                        <div className="p-2 md:p-3 rounded-full bg-white/5 group-hover/card:bg-[var(--skill-color)]/10 transition-colors duration-500">
                           <Icon className="text-3xl sm:text-4xl md:text-5xl text-zinc-400 group-hover/card:text-[var(--skill-color)] transition-colors duration-300 transform group-hover/card:scale-110" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-zinc-500 group-hover/card:text-white transition-colors duration-300 px-2 text-center">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Row 2: Right to Left */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             {/* Gradient Fade Edges */}
             <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
             <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8 px-2 md:px-4"
                animate={{
                  x: [-1920, 0], 
                }}
                transition={{
                  x: {
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedSkills.reverse().map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`row2-${skill.name}-${index}`}
                      className="relative group/card"
                    >
                      <div 
                        className="flex flex-col items-center justify-center gap-2 md:gap-3 w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44 rounded-2xl md:rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm transition-all duration-500 group-hover/card:bg-zinc-800/50 group-hover/card:border-[var(--skill-color)] group-hover/card:shadow-[0_0_50px_-15px_var(--skill-color)]"
                        style={{ "--skill-color": skill.color } as React.CSSProperties}
                      >
                         <div className="p-2 md:p-3 rounded-full bg-white/5 group-hover/card:bg-[var(--skill-color)]/10 transition-colors duration-500">
                           <Icon className="text-3xl sm:text-4xl md:text-5xl text-zinc-400 group-hover/card:text-[var(--skill-color)] transition-colors duration-300 transform group-hover/card:scale-110" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-zinc-500 group-hover/card:text-white transition-colors duration-300 px-2 text-center">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
