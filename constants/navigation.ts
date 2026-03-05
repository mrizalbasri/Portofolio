/**
 * Navigation Constants
 * Centralized navigation configuration
 */

export const NAV_ITEMS = [
  { name: "HOME", href: "/", id: "home" },
  { name: "PROJECTS", href: "/projects", id: "projects" },
  { name: "BLOG", href: "/blog", id: "blog" },
] as const;

/**
 * Menu transition delay in milliseconds
 * Matches with animation duration time
 */
export const MOBILE_MENU_TRANSITION_DELAY = 220;

/**
 * Mobile menu animation config
 */
export const MENU_ANIMATION = {
  OPEN_DURATION: 0.3,
  CLOSE_DURATION: 0.2,
} as const;

/**
 * Z-index layers for consistent layering
 */
export const Z_INDEX = {
  BACKGROUND: {
    PARTICLES: 1,
    GRID: 2,
  },
  CONTENT: {
    DEFAULT: 10,
    MODAL: 100,
  },
  NAVIGATION: {
    BACKGROUND: 5000,
    MENU_BUTTON: 5200,
  },
  CURSOR: 9999,
} as const;
