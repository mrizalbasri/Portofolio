"use client";

import { motion } from "framer-motion";

interface NavItemProps {
  item: {
    name: string;
    href: string;
    id: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export default function NavItem({ item, index, isActive, onClick }: NavItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
    >
      <button
        onClick={onClick}
        className="group relative block w-full text-left"
      >
        {/* Main Text */}
        <div className="relative overflow-hidden">
          <motion.span
            className={`block text-4xl md:text-6xl lg:text-7xl font-bold transition-all duration-500 ${
              isActive
                ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"
                : "text-white"
            }`}
            whileHover={{
              scale: 1.05,
              x: 10,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {item.name}
          </motion.span>

          {/* Glitch effect on hover */}
          <motion.span
            className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold text-cyan-400 opacity-0 group-hover:opacity-30 pointer-events-none"
            animate={{
              x: [-2, 2, -2],
              y: [1, -1, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {item.name}
          </motion.span>
        </div>

        {/* Animated Underline */}
        <div className="relative h-1 mt-2 overflow-hidden">
          {/* Base line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 origin-left"
            initial={{ scaleX: isActive ? 1 : 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ scaleX: isActive ? 1 : 0 }}
          />

          {/* Animated glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Hover particles effect */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [0, 20, 0],
                y: [0, -10 * (i + 1), 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Number indicator */}
        <motion.div
          className="absolute -left-12 top-1/2 -translate-y-1/2 text-zinc-700 font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          0{index + 1}
        </motion.div>

        {/* Glow effect on active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 -z-10 blur-2xl opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)",
            }}
          />
        )}
      </button>
    </motion.div>
  );
}
