"use client";

import { Particles } from "@/components/ui/particles";
import { useScroll, useTransform, motion } from "framer-motion";

export default function GlobalParticles() {
  const { scrollY } = useScroll();
  
  // Opacity logic:
  // 0-vh to 100vh (approx 800px): Opacity 0 (Hidden in Hero)
  // 800px+: Opacity 1 (Visible in other sections)
  const opacity = useTransform(scrollY, [500, 800], [0, 1]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 z-0 pointer-events-none"
    >
       <Particles
        className="absolute inset-0"
        quantity={500}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </motion.div>
  );
}
