/**
 * Site Configuration Constants
 * Centralized configuration for the entire application
 */

/**
 * Base URL for the site
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mrizalbasri.me";

/**
 * Site metadata and personal info
 */
export const SITE_CONFIG = {
  name: "M. Rizal Basri",
  title: "M. Rizal Basri | Full Stack Developer",
  shortTitle: "M. Rizal Basri",
  description:
    "Portfolio of M. Rizal Basri - Full Stack Developer from Pekanbaru, Indonesia. Expert in React, Next.js, Laravel, and modern web solutions.",
  baseUrl: BASE_URL,
  author: "M. Rizal Basri",
  email: "contact@mrizalbasri.me",
  phone: "+62-your-number", // Update with your phone
  location: "Pekanbaru, Indonesia",
  role: "Full Stack Developer",
} as const;

/**
 * Social links
 */
export const SOCIAL_LINKS = {
  github: "https://github.com/mrizalbasri",
  linkedin: "https://linkedin.com/in/mrizalbasri",
  twitter: "https://twitter.com/mrizalbasri",
  email: "mailto:contact@mrizalbasri.me",
  instagram: "https://instagram.com/mrizalbasri",
} as const;

/**
 * SEO Keywords
 */
export const SEO_KEYWORDS = [
  "Full Stack Developer",
  "Web Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "Node.js",
  "Frontend Developer",
  "Backend Developer",
  "Pekanbaru",
  "Indonesia",
  "Portfolio",
  "JavaScript Developer",
  "Mobile Developer",
  "UI/UX Developer",
] as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  // GitHub API
  GITHUB_API_BASE: "https://api.github.com",
  GITHUB_API_CACHE_TIME: 3600, // 1 hour in seconds
  
  // Contact Form
  CONTACT_TIMEOUT: 10000, // 10 seconds
  CONTACT_ENDPOINT: "/api/contact",
  
  // Email validation regex
  EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
} as const;

/**
 * Feature Flags (from env)
 */
export const FEATURE_FLAGS = {
  ENABLE_3D_HERO: process.env.NEXT_PUBLIC_ENABLE_3D_HERO !== "false",
  ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG !== "false",
  ENABLE_PARTICLES: process.env.NEXT_PUBLIC_ENABLE_PARTICLES !== "false",
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_GA_ID ? true : false,
} as const;

/**
 * Timing constants
 */
export const TIMING = {
  LOADING_SCREEN_MIN_DURATION: 800, // milliseconds
  PAGE_TRANSITION_DURATION: 300, // milliseconds
  TOAST_DURATION: 3000, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds
  THROTTLE_DELAY: 1000, // milliseconds
} as const;
