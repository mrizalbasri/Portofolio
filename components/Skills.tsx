'use client';

import { motion } from 'framer-motion';
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
  SiNginx
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const skills = [
  { name: 'Laravel', icon: SiLaravel },
  { name: 'PHP', icon: SiPhp },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Java', icon: FaJava },
  { name: 'Linux', icon: SiLinux },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Git', icon: SiGit },
  { name: 'Docker', icon: SiDocker },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Android', icon: SiAndroid },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Nginx', icon: SiNginx },
];

export default function Skills() {
  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title with dramatic entrance */}
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          My Skills
        </motion.h2>

        {/* First Row - Slide from left */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Skills */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -1920], // Adjust based on content width
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 group relative z-20"
                  >
                    <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm">
                      <Icon className="text-2xl text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
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
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative mt-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [-1920, 0], // Reverse direction
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedSkills.reverse().map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={`reverse-${skill.name}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 group relative z-20"
                  >
                    <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm">
                      <Icon className="text-2xl text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
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
    </section>
  );
}

