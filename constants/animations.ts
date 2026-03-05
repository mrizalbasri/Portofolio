/**
 * Animation Constants
 * Reusable animation configurations
 */

/**
 * Floating animation variants for icons and elements
 * Usage: variants={FLOATING_VARIANTS} custom={index}
 */
export const FLOATING_VARIANTS = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: custom * 0.5,
    },
  }),
} as const;

/**
 * Scroll reveal animation
 */
export const SCROLL_REVEAL = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "power2.out" },
} as const;

/**
 * Fade in animation
 */
export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
} as const;

/**
 * Scroll trigger config
 */
export const SCROLL_TRIGGER_CONFIG = {
  offset: ["start end", "end start"],
} as const;

/**
 * Scale on hover animation
 */
export const HOVER_SCALE = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
} as const;

/**
 * Magnetic button spring config
 */
export const MAGNETIC_SPRING = {
  stiffness: 150,
  damping: 15,
  mass: 0.5,
} as const;

/**
 * Parallax scroll config
 */
export const PARALLAX_CONFIG = {
  spring: { stiffness: 50, damping: 20 },
  offset: ["start end", "end start"],
} as const;
