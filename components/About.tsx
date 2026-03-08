"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MovingBorder } from "@/components/ui/moving-border";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FADE_IN_LEFT } from "@/constants/animations";
import {
  IconBoxAlignTopLeft,
  IconSignature,
  IconTerminal2,
} from "@tabler/icons-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiMysql,
  SiPhp,
  SiLinux,
  SiAndroid,
  SiSqlite,
  SiBootstrap,
  SiJavascript,
} from "react-icons/si";
import { FaGraduationCap, FaMapMarkerAlt, FaJava } from "react-icons/fa";

interface AboutProps {
  isFullPage?: boolean;
}

export default function About({ isFullPage = false }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.9, 1, 1, 0.9],
  );

  const contentStyle = isFullPage ? {} : { opacity };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-32 relative overflow-hidden bg-black`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <StarsBackground starDensity={0.0002} allStarsTwinkle={true} />
        <ShootingStars
          minDelay={2000}
          maxDelay={4000}
          starColor="#06b6d4"
          trailColor="#3b82f6"
        />
      </div>

      <motion.div
        style={contentStyle}
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Bio & Identity */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div>
              <motion.div
                {...FADE_IN_LEFT}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
                  {isFullPage ? "Profile Detail" : "About Me"}
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 md:mb-8">
                Beyond the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Code
                </span>
                .
              </h2>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-4 md:mb-6">
                  Halo! Saya seorang{" "}
                  <span className="text-white font-semibold">
                    Full Stack Developer
                  </span>{" "}
                  yang berbasis di Pekanbaru, Indonesia. Saya mendedikasikan
                  waktu saya untuk mempelajari arsitektur sistem dan bagaimana
                  cara membuat aplikasi yang aman serta skalabel.
                </p>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4 md:mb-6">
                  Perjalanan saya di dunia teknologi didorong oleh rasa ingin
                  tahu yang besar tentang bagaimana sebuah sistem bekerja di
                  balik layar. Saya percaya bahwa kode bukan hanya sekadar
                  instruksi bagi mesin, tetapi merupakan solusi kreatif untuk
                  masalah dunia nyata.
                </p>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 gap-6">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-cyan-500/50 transition-colors flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
                <div className="p-3 md:p-4 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors shrink-0">
                  <FaGraduationCap size={28} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg md:text-xl mb-1">
                    Education
                  </h3>
                  <p className="text-zinc-300 font-semibold text-base md:text-lg">
                    President University
                  </p>
                  <p className="text-cyan-400 font-medium text-sm md:text-base">
                    Informatics Engineering
                  </p>
                  <p className="text-zinc-500 text-xs md:text-sm mt-2 leading-relaxed">
                    Focusing on Software Engineering, Data Structures, and
                    building scalable digital systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Summary & Philosophy */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                <IconSignature size={120} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-6 md:w-8 h-px bg-cyan-500"></span>
                Key Focus
              </h3>

              <ul className="space-y-4 md:space-y-6">
                <li className="flex gap-3 md:gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base">
                      System Security
                    </h4>
                    <p className="text-zinc-300 text-xs md:text-sm">
                      Mengimplementasikan proteksi level tinggi pada aplikasi
                      desktop dan web.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base">
                      Eco-Tech Solutions
                    </h4>
                    <p className="text-zinc-300 text-xs md:text-sm">
                      Membangun aplikasi yang memberikan dampak positif bagi
                      lingkungan.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base">
                      Full Stack Logic
                    </h4>
                    <p className="text-zinc-300 text-xs md:text-sm">
                      Menghubungkan frontend yang responsif dengan backend yang
                      efisien.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
                <h3 className="text-base md:text-lg font-bold text-white mb-4">
                  Philosophy
                </h3>
                <PhilosophyCard />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const PhilosophyCard = () => {
  const words = [
    { text: "const", className: "text-blue-500" },
    { text: "passion", className: "text-yellow-500" },
    { text: "=", className: "text-white" },
    { text: "new", className: "text-cyan-500" },
    { text: "Future();", className: "text-green-500" },
  ];
  return (
    <div className="relative">
      <TypewriterEffectSmooth
        words={words}
        className="scale-90 origin-left"
        cursorClassName="bg-blue-500"
      />
      <p className="text-zinc-500 text-sm italic font-mono mt-2">
        "Software is a great combination between artistry and engineering."
      </p>
    </div>
  );
};
