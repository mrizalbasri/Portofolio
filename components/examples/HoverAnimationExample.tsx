"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Example: Hover Animation dengan GSAP
 * Gunakan component ini sebagai template untuk hover effects
 */
export default function HoverAnimationExample() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        duration: 0.3,
        y: -10,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-64 h-40 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 cursor-pointer transition-shadow"
    >
      <h3 className="text-xl font-bold text-white mb-2">Hover Me!</h3>
      <p className="text-gray-100">
        This card has a hover animation powered by GSAP
      </p>
    </div>
  );
}
