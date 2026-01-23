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
import GsapScrollAnimation from "./GsapScrollAnimation";

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
      className="relative py-16 px-4 overflow-hidden"
      style={{ perspective: 1200 }}
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
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
              Technologies
            </span>
          </motion.div>
        </div>

        {/* Skills Container */}
        <div ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="relative"
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Scrolling Skills */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -1920], // Adjust based on content width
                }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`${skill.name}-${index}`}
                      role="button"
                      data-skill-item
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 group relative z-20"
                    >
                      <div 
                        className="flex flex-col items-center justify-center gap-2 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[var(--skill-color)] transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_-10px_var(--skill-color)]"
                        style={{ "--skill-color": skill.color } as React.CSSProperties}
                      >
                        <Icon className="text-4xl sm:text-5xl text-gray-400 group-hover:text-[var(--skill-color)] transition-colors duration-500 drop-shadow-lg" />
                        <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-500 whitespace-nowrap group-hover:opacity-100">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Second Row - Slide from right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="relative mt-8 sm:mt-12"
          >
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [-1920, 0], // Reverse direction
                }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedSkills.reverse().map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`reverse-${skill.name}-${index}`}
                      role="button"
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 group relative z-20"
                    >
                      <div 
                        className="flex flex-col items-center justify-center gap-2 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[var(--skill-color)] transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_-10px_var(--skill-color)]"
                        style={{ "--skill-color": skill.color } as React.CSSProperties}
                      >
                        <Icon className="text-4xl sm:text-5xl text-gray-400 group-hover:text-[var(--skill-color)] transition-colors duration-500 drop-shadow-lg" />
                        <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-500 whitespace-nowrap group-hover:opacity-100">
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
