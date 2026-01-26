"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignTopLeft,
  IconSignature,
} from "@tabler/icons-react";
import { SiReact, SiNextdotjs, SiTypescript, SiLaravel, SiNodedotjs } from "react-icons/si";
import { FaGraduationCap, FaCode, FaLaptopCode, FaMapMarkerAlt } from "react-icons/fa";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, 100]);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Section Header */}
        <div className="mb-16">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-3 mb-6"
           >
             <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
             <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium font-mono">
               About Me
             </span>
           </motion.div>
           
           <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
             Peeling back the <span className="text-cyan-500">layers</span>.
           </h2>
        </div>

        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[25rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
}

const Skeleton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 ${className}`}>
    {children}
  </div>
);

const items = [
  {
    title: "Full Stack Expertise",
    description: "Versatile developer capable of handling both frontend polish and backend logic.",
    header: (
      <Skeleton className="flex flex-col items-center justify-center gap-4 p-4">
         <div className="flex gap-4 animate-pulse">
            <SiReact className="text-4xl text-cyan-400" />
            <SiNextdotjs className="text-4xl text-white" />
            <SiTypescript className="text-4xl text-blue-500" />
         </div>
         <div className="flex gap-4 animate-pulse delay-75">
            <SiLaravel className="text-4xl text-red-500" />
            <SiNodedotjs className="text-4xl text-green-500" />
         </div>
      </Skeleton>
    ),
    icon: <FaCode className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Education",
    description: "Pursuing Bachelor of Informatics at President University (2024 - Present).",
    header: (
        <Skeleton className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute bottom-4 left-4 z-20">
                <p className="text-white font-bold">President University</p>
                <p className="text-xs text-zinc-400">Informatics</p>
            </div>
        </Skeleton>
    ),
    icon: <FaGraduationCap className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "My Playground",
    description: "I love experimenting with 3D WebGL, Animations, and Interactive UI.",
    header: (
        <Skeleton className="items-center justify-center p-4 bg-grid-white/[0.05]">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse" />
                <FaLaptopCode className="text-6xl text-white relative z-10" />
            </div>
        </Skeleton>
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Logic & The Creative",
    description: (
        <span className="text-sm">
          I bridge the gap between engineering and design. My code is clean, my designs are intuitive.
          I started my journey with a deep curiosity for how things work, leading me to master the entire web stack.
        </span>
    ),
    header: (
        <Skeleton className="p-8 flex items-center justify-center bg-zinc-900">
           <p className="text-zinc-500 font-mono text-sm leading-8">
              &lt;<span className="text-purple-400">Developer</span>&gt;<br/>
              &nbsp;&nbsp;<span className="text-blue-400">const</span> <span className="text-yellow-400">passion</span> = <span className="text-green-400">&quot;Building Amazing Things&quot;</span>;<br/>
              &nbsp;&nbsp;<span className="text-blue-400">while</span>(<span className="text-yellow-400">alive</span>) &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">code</span>();<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">design</span>();<br/>
              &nbsp;&nbsp;&#125;<br/>
              &lt;/<span className="text-purple-400">Developer</span>&gt;
           </p>
        </Skeleton>
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Based in Indonesia",
    description: "Operating from Pekanbaru, Riau. Available for remote work worldwide.",
    header: (
        <Skeleton className="relative overflow-hidden group">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555852095-64e7428df0fa?q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" />
             <div className="absolute inset-0 flex items-center justify-center">
                 <FaMapMarkerAlt className="text-4xl text-red-500 drop-shadow-xl animate-bounce" />
             </div>
        </Skeleton>
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
];
