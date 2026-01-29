"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MovingBorder } from "@/components/ui/moving-border";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  IconBoxAlignTopLeft,
  IconSignature,
  IconTerminal2,
} from "@tabler/icons-react";
import { SiReact, SiNextdotjs, SiTypescript, SiLaravel, SiNodedotjs, SiTailwindcss, SiPostgresql, SiDocker } from "react-icons/si";
import { FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, 100]);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-black/50 backdrop-blur-sm">
       {/* Background Effects */}
       <div className="absolute inset-0 z-0 opacity-40">
           <StarsBackground starDensity={0.0002} allStarsTwinkle={true} />
           <ShootingStars minDelay={2000} maxDelay={4000} starColor="#06b6d4" trailColor="#3b82f6" />
       </div>

      <motion.div 
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <div className="mb-20">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-3 mb-6"
           >
             <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
             <span className="text-sm uppercase tracking-wider text-cyan-400 font-bold font-mono">
               {"// About Me"}
             </span>
           </motion.div>
           
           <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
             Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Code</span>.
           </h2>
           <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
             A closer look at who I am, where I&apos;m from, and what drives my passion for building digital experiences.
           </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[25rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
}

const TechStackCard = () => {
  const techs = [
    { icon: SiReact, color: "text-cyan-400", name: "React" },
    { icon: SiNextdotjs, color: "text-white", name: "Next.js" },
    { icon: SiTypescript, color: "text-blue-500", name: "TypeScript" },
    { icon: SiLaravel, color: "text-red-500", name: "Laravel" },
    { icon: SiNodedotjs, color: "text-green-500", name: "Node.js" },
    { icon: SiTailwindcss, color: "text-cyan-300", name: "Tailwind" },
    { icon: SiPostgresql, color: "text-blue-300", name: "PostgreSQL" },
    { icon: SiDocker, color: "text-blue-600", name: "Docker" },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-white/10 p-6 flex-col justify-between group overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      <div className="grid grid-cols-4 gap-4 relative z-10 h-full content-center">
        {techs.map((tech, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors"
          >
            <tech.icon className={`text-3xl ${tech.color}`} />
          </motion.div>
        ))}
      </div>
      <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-500" />
    </div>
  );
};

const EducationCard = () => {
  return (
     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000')] bg-cover bg-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        
        <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex items-center gap-3 mb-2">
                 <MovingBorder duration={3000} rx="30%" ry="30%" containerClassName="w-12 h-12" className="bg-black">
                     <FaGraduationCap className="text-xl text-white" />
                 </MovingBorder>
                 <div>
                   <p className="text-white font-bold text-lg leading-none">President University</p>
                   <p className="text-cyan-400 text-sm font-medium">Informatics Engineering</p>
                 </div>
             </div>
             <p className="text-zinc-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
               Focusing on Software Engineering, Data Structures, and Algorithm Analysis.
             </p>
        </div>
     </div>
  );
};

const LocationCard = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 relative overflow-hidden border border-white/10 group">
       {/* Stylized Map Background (Abstract) */}
       <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full text-neutral-700" width="100%" height="100%">
              <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                 <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
       </div>
       
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
           <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
              <FaMapMarkerAlt className="text-5xl text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] transform group-hover:scale-110 transition-transform duration-300" />
           </div>
           
           <div className="mt-6 space-y-1">
             <p className="text-2xl font-bold text-white tracking-tight">Pekanbaru</p>
             <p className="text-sm text-zinc-400 font-mono">RIAU, INDONESIA</p>
             <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500 font-medium">Available for work</span>
             </div>
           </div>
       </div>
    </div>
  );
};

const PhilosophyCard = () => {
    const words = [
        { text: "const", className: "text-blue-500" },
        { text: "passion", className: "text-yellow-500" },
        { text: "=", className: "text-white" },
        { text: "new", className: "text-purple-500" },
        { text: "Future();", className: "text-green-500" },
    ];
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-zinc-950 border border-white/10 p-4 flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
            <IconTerminal2 className="text-6xl text-zinc-800 absolute top-4 right-4 rotate-12" />
            
            <TypewriterEffectSmooth 
               words={words} 
               className="scale-75 sm:scale-100"
               cursorClassName="bg-blue-500"
            />
            
            <p className="text-zinc-500 text-center text-sm font-mono mt-4 max-w-[80%]">
               &quot;Software is a great combination between artistry and engineering.&quot;
            </p>
        </div>
    );
}

const items = [
  {
    title: "Full Stack Mastery",
    description: "Bridging the gap between robust backends and elegant frontends.",
    header: <TechStackCard />,
    icon: <IconTerminal2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Education",
    description: "Pursuing Bachelor of Informatics at President University.",
    header: <EducationCard />,
    icon: <FaGraduationCap className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Global Mindset",
    description: "Based in Pekanbaru, but delivering solutions worldwide.",
    header: <LocationCard />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "My Philosophy",
    description: <span className="text-sm text-zinc-400">Coding isn&apos;t just about syntax; it&apos;s about solving real-world problems with creative solutions.</span>,
    header: <PhilosophyCard />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];
