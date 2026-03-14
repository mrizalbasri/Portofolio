"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FADE_IN_LEFT, FADE_IN } from "@/constants/animations";
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

  const springConfig = { stiffness: 100, damping: 30 };

  // Simple fade effect only
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]),
    springConfig,
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
        },
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
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];
  const reversedSkills = [...duplicatedSkills].reverse();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-16 md:py-24"
    >
      <motion.div style={{ opacity }} className="mx-auto max-w-7xl">
        {/* Clean Modern Header - Minimal */}
        <div className="mb-8 md:mb-12">
          <motion.div
            {...FADE_IN_LEFT}
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
          <motion.div {...FADE_IN} className="relative">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden group">
              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8 px-2 md:px-4"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    duration: 28,
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
                      className="relative shrink-0 group/card"
                    >
                      <div
                        className="flex h-24 w-20 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm transition-all duration-500 group-hover/card:border-[var(--skill-color)] group-hover/card:bg-zinc-800/50 group-hover/card:shadow-[0_0_50px_-15px_var(--skill-color)] sm:h-36 sm:w-32 sm:gap-3 md:h-44 md:w-40 md:rounded-3xl"
                        style={
                          {
                            "--skill-color": skill.color,
                          } as React.CSSProperties
                        }
                      >
                        <div className="rounded-full bg-white/5 p-2 transition-colors duration-500 group-hover/card:bg-[var(--skill-color)]/10 md:p-3">
                          <Icon className="text-2xl text-zinc-400 transition-colors duration-300 transform group-hover/card:scale-110 group-hover/card:text-[var(--skill-color)] sm:text-4xl md:text-5xl" />
                        </div>
                        <span className="px-1 text-[10px] font-semibold text-center text-zinc-500 transition-colors duration-300 group-hover/card:text-white sm:px-2 sm:text-sm">
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
          <motion.div {...FADE_IN} className="relative">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8 px-2 md:px-4"
                animate={{
                  x: ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {reversedSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`row2-${skill.name}-${index}`}
                      className="relative shrink-0 group/card"
                    >
                      <div
                        className="flex h-24 w-20 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm transition-all duration-500 group-hover/card:border-[var(--skill-color)] group-hover/card:bg-zinc-800/50 group-hover/card:shadow-[0_0_50px_-15px_var(--skill-color)] sm:h-36 sm:w-32 sm:gap-3 md:h-44 md:w-40 md:rounded-3xl"
                        style={
                          {
                            "--skill-color": skill.color,
                          } as React.CSSProperties
                        }
                      >
                        <div className="rounded-full bg-white/5 p-2 transition-colors duration-500 group-hover/card:bg-[var(--skill-color)]/10 md:p-3">
                          <Icon className="text-2xl text-zinc-400 transition-colors duration-300 transform group-hover/card:scale-110 group-hover/card:text-[var(--skill-color)] sm:text-4xl md:text-5xl" />
                        </div>
                        <span className="px-1 text-[10px] font-semibold text-center text-zinc-500 transition-colors duration-300 group-hover/card:text-white sm:px-2 sm:text-sm">
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
