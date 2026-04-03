import type { Variants } from "framer-motion";

/**
 * Animation Constants
 * Reusable animation configurations for consistent motion design
 */

// ========================================
// ENTRANCE ANIMATIONS
// ========================================

/**
 * Fade in from bottom - Primary entrance animation
 * Usage: <motion.div {...FADE_IN_UP} />
 */
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Fade in from left - For side elements
 * Usage: <motion.div {...FADE_IN_LEFT} />
 */
export const FADE_IN_LEFT = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Fade in from right - For side elements
 * Usage: <motion.div {...FADE_IN_RIGHT} />
 */
export const FADE_IN_RIGHT = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Scale up entrance - For cards and boxes
 * Usage: <motion.div {...SCALE_IN} />
 */
export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Simple fade in - Minimal entrance
 * Usage: <motion.div {...FADE_IN} />
 */
export const FADE_IN = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
} as const;

/**
 * Staggered children animation
 * Usage: <motion.div variants={STAGGER_CONTAINER}><motion.div variants={STAGGER_ITEM} /></motion.div>
 */
export const STAGGER_CONTAINER = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  viewport: { once: true, margin: "-50px" },
} as const;

export const STAGGER_ITEM = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
} as const;

// ========================================
// CONTINUOUS ANIMATIONS
// ========================================

/**
 * Floating animation variants for icons and elements
 * Usage: variants={FLOATING_VARIANTS} custom={index}
 */
export const FLOATING_VARIANTS: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: custom * 0.5,
      ease: "easeInOut" as const,
    },
  }),
};

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Scroll reveal animation (deprecated - use FADE_IN_UP instead)
 * @deprecated Use FADE_IN_UP for better consistency
 */
export const SCROLL_REVEAL = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "power2.out" },
} as const;

// ========================================
// HOVER & INTERACTION ANIMATIONS
// ========================================

/**
 * Scale on hover animation - Subtle lift effect
 * Usage: <motion.div {...HOVER_SCALE} />
 */
export const HOVER_SCALE = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

/**
 * Scale on hover animation - Pronounced effect
 * Usage: <motion.div {...HOVER_SCALE_LARGE} />
 */
export const HOVER_SCALE_LARGE = {
  whileHover: { scale: 1.1 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Lift on hover - For cards
 * Usage: <motion.div {...HOVER_LIFT} />
 */
export const HOVER_LIFT = {
  whileHover: { y: -8, scale: 1.02 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
} as const;

// ========================================
// SPRING CONFIGURATIONS
// ========================================

/**
 * Magnetic button spring config
 */
export const MAGNETIC_SPRING = {
  stiffness: 150,
  damping: 15,
  mass: 0.5,
} as const;

/**
 * Smooth spring config for scroll effects
 */
export const SMOOTH_SPRING = {
  stiffness: 100,
  damping: 30,
  mass: 1,
} as const;

/**
 * Bouncy spring config for playful effects
 */
export const BOUNCY_SPRING = {
  stiffness: 200,
  damping: 10,
  mass: 0.5,
} as const;

// ========================================
// SCROLL CONFIGURATIONS
// ========================================

/**
 * Scroll trigger config
 */
export const SCROLL_TRIGGER_CONFIG = {
  offset: ["start end", "end start"],
} as const;

/**
 * Parallax scroll config
 */
export const PARALLAX_CONFIG = {
  spring: { stiffness: 50, damping: 20 },
  offset: ["start end", "end start"],
} as const;

// ========================================
// EASING CURVES
// ========================================

/**
 * Custom easing curves for consistent motion design
 */
export const EASING = {
  smooth: [0.22, 1, 0.36, 1], // Smooth ease out
  snappy: [0.4, 0, 0.2, 1], // Material Design standard
  elastic: [0.68, -0.55, 0.265, 1.55], // Bouncy effect
} as const;

// ========================================
// DURATION PRESETS
// ========================================

/**
 * Animation duration presets in seconds
 */
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const;
