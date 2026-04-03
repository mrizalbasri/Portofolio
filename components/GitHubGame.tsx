"use client";

import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { FADE_IN_UP } from "@/constants/animations";
import { FaGamepad, FaGithub } from "react-icons/fa";

/**
 * GitHub Game Section Component.
 * Displays an animated space shooter GIF generated from GitHub contribution graph.
 */
export default function GitHubGame() {
  return (
    <section
      id="github-game"
      className="relative overflow-hidden bg-black py-16 md:py-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <StarsBackground starDensity={0.0003} allStarsTwinkle={true} />
        <ShootingStars
          minDelay={1500}
          maxDelay={3500}
          starColor="#8b5cf6"
          trailColor="#06b6d4"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          {...FADE_IN_UP}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGamepad className="text-2xl text-purple-400" />
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
              GitHub Contribution Game
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            My Coding Activity as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
              Space Shooter
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            Watch my GitHub contributions transform into an epic arcade battle!
            More commits = Stronger enemies 🚀
          </p>
        </motion.div>

        {/* Game GIF Container */}
        <motion.div
          {...FADE_IN_UP}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-sm p-3 md:p-4">
            {/* Game Display */}
            <div className="relative aspect-[53/7] w-full overflow-hidden rounded-lg bg-black">
              <img
                src="/gh-space-shooter.gif"
                alt="GitHub Space Shooter Game - My contribution graph as a space shooter game"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Footer Info */}
            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <FaGithub className="text-zinc-400" />
                <span>Powered by</span>
                <a
                  href="https://github.com/czl9707/gh-space-shooter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  gh-space-shooter
                </a>
              </div>
              <span className="text-zinc-600">Updated daily via GitHub Actions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
