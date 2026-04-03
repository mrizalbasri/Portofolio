"use client";

import { motion } from "framer-motion";
import { FADE_IN_UP } from "@/constants/animations";

/**
 * GitHub Game Section Component.
 * Displays an animated space shooter GIF generated from GitHub contribution graph.
 */
export default function GitHubGame() {
  return (
    <section
      id="github-game"
      className="relative overflow-hidden bg-black py-8 md:py-12"
    >
      <motion.div
        {...FADE_IN_UP}
        className="mx-auto max-w-5xl px-4 sm:px-6"
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            src="/gh-space-shooter.gif"
            alt="GitHub Space Shooter Game"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
