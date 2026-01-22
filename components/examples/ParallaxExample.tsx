"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Example: Parallax Scroll Effect
 * Gunakan component ini sebagai template untuk membuat parallax effect
 */
export default function ParallaxExample() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: bgRef.current,
          scrub: 1, // Link animation to scrollbar
          markers: false,
        },
        y: 100,
        ease: "none",
      });
    }

    // Content animation
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-b from-purple-600 to-blue-600"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <h2 className="text-5xl font-bold text-white">
          Parallax Effect Example
        </h2>
      </div>
    </div>
  );
}
