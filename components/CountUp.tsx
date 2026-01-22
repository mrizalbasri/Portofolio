"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  format?: (value: number) => string;
}

export default function CountUp({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  format = (val) => Math.floor(val).toString(),
}: CountUpProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(countRef.current, {
      value: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (elementRef.current) {
          elementRef.current.textContent = `${prefix}${format(
            countRef.current.value
          )}${suffix}`;
        }
      },
    });
  }, [target, duration, suffix, prefix, format]);

  return <div ref={elementRef} className={className} />;
}
