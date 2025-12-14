'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementsProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function FloatingElements({
  children,
  delay = 0,
  duration = 3,
  distance = 20,
  className = '',
}: FloatingElementsProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
