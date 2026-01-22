'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Dynamic text state based on hover target
  const [cursorText, setCursorText] = useState<string>("");

  // Instant mouse positions without spring lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      // Direct 1:1 movement for snappy feel
      cursorX.set(e.clientX - 6); 
      cursorY.set(e.clientY - 6);
      
      if (!isVisible) setIsVisible(true);
      
      // Throttle interactive checks if needed, but for now simple check is okay
      const target = e.target as HTMLElement;
      // Simple tag check first for performance
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
         setIsHovering(true);
         setCursorText(target.tagName === 'A' && target.getAttribute('href')?.startsWith('mailto') ? "Email" : "Click");
         return;
      }
      
      // Deeper check only if necessary
      const closestLink = target.closest('a');
      const closestBtn = target.closest('button');
      
      if (closestLink || closestBtn || target.closest('[role="button"]') || target.style.cursor === 'pointer') {
        setIsHovering(true);
        setCursorText(closestLink?.getAttribute('href')?.startsWith('mailto') ? "Email" : "Click");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
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
  }, [cursorX, cursorY, isVisible]); // Added isVisible dependency

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        body, a, button, [role="button"] { cursor: none !important; }
      `}</style>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[10000]"
            style={{
              x: cursorX,
              y: cursorY,
            }}
          >
            {/* Aceternity SVG Pointer */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="1"
              viewBox="0 0 16 16"
              className={cn(
                "h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] transition-colors duration-200",
                isClicking ? "text-pink-500 stroke-pink-600 scale-90" : "text-sky-500 stroke-sky-600"
              )}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
            </svg>

            {/* Dynamic Badge (Name Tag) */}
            <motion.div
              className={cn(
                "px-2 py-1 bg-neutral-200 text-black whitespace-nowrap min-w-max text-xs rounded-full font-bold ml-3 mt-4 absolute top-0 left-0 shadow-sm border border-white",
                "bg-gradient-to-br from-sky-300 to-blue-400"
              )}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: isHovering && cursorText ? 1 : 0,
                opacity: isHovering && cursorText ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
