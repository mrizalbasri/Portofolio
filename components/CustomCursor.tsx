'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  
  // Instant mouse positions for pointer
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth delayed positions for ring (follows with less lag)
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      // Direct 1:1 movement for snappy feel
      cursorX.set(e.clientX); 
      cursorY.set(e.clientY);
      
      // Add particle - Square Pixels for Cyber feel
      particleId.current += 1;
      const newParticle = {
        id: particleId.current,
        x: e.clientX,
        y: e.clientY,
      };
      if (particleId.current % 2 === 0) { // Optimize: add particle every 2nd frame
           setParticles(prev => [...prev.slice(-12), newParticle]);
      }
      
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      
      // Check for clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer';

      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        body, a, button, [role="button"] { cursor: none !important; }
      `}</style>
      
      {/* Digital Trail - Square Pixels */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-[9999] w-1.5 h-1.5 bg-cyan-500/50"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
            onAnimationComplete={() => {
              setParticles(prev => prev.filter(p => p.id !== particle.id));
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer Ring - Cyber Target */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9998]"
            style={{ x: ringX, y: ringY }}
          >
            <motion.div
              className={cn(
                  "absolute border border-cyan-400/30 rounded-full", // Circle container
                  isHovering ? "border-dashed animate-spin-slow" : "border-solid"
              )}
              style={{
                width: 48, 
                height: 48, 
                x: -24, 
                y: -24, 
              }}
              animate={{
                scale: isHovering ? 1.2 : 1,
                opacity: isHovering ? 1 : 0.3,
                borderColor: isClicking ? "rgb(236 72 153)" : "rgba(34, 211, 238, 0.4)" // Pink on click
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
             {/* Crosshair Lines */}
             <motion.div 
                className="absolute bg-cyan-400/50"
                style={{ width: 1, height: 12, x: 0, y: -6 }} 
                animate={{ height: isHovering ? 16 : 12 }}
             />
             <motion.div 
                className="absolute bg-cyan-400/50"
                style={{ width: 12, height: 1, x: -6, y: 0 }}
                animate={{ width: isHovering ? 16 : 12 }}
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Dot - The Precision Point */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[10000]"
            style={{ x: cursorX, y: cursorY }}
          >
            <motion.div
              className={cn(
                  "w-2 h-2 bg-cyan-400 rounded-none shadow-[0_0_10px_rgba(34,211,238,0.8)]", // Square dot
                  isClicking && "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
              )}
              animate={{
                scale: isClicking ? 0.8 : 1,
              }}
              style={{
                x: -4, // Center it (w/2)
                y: -4,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
