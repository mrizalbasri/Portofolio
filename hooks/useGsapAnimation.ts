import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onComplete?: () => void;
}

export const useGsapAnimation = () => {
  const gsapRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    return () => {
      if (gsapRef.current) {
        gsapRef.current.kill();
      }
    };
  }, []);

  return { gsapRef, gsap, ScrollTrigger };
};
