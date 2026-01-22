"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapScrollAnimationProps {
  children: React.ReactNode;
  animationType?:
    | "fadeInUp"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn"
    | "slideUp";
  duration?: number;
  delay?: number;
  className?: string;
}

export default function GsapScrollAnimation({
  children,
  animationType = "fadeInUp",
  duration = 0.8,
  delay = 0,
  className = "",
}: GsapScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animationConfig: Record<string, any> = {
      fadeInUp: {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration,
        delay,
        ease: "power2.out",
      },
      fadeInLeft: {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration,
        delay,
        ease: "power2.out",
      },
      fadeInRight: {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration,
        delay,
        ease: "power2.out",
      },
      scaleIn: {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration,
        delay,
        ease: "back.out",
      },
      slideUp: {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
      },
    };

    const config = animationConfig[animationType];
    gsap.from(elementRef.current, config);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animationType, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
