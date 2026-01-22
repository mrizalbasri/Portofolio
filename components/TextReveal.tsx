"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  containerClassName?: string;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  containerClassName = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(" ");
    containerRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
      )
      .join(" ");

    const spans = containerRef.current.querySelectorAll("span span");

    gsap.from(spans, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.6,
      delay,
      stagger,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, delay, stagger]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {text}
    </div>
  );
}
