'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Loading placeholder
function RobotLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
       <div className="w-4 h-4 bg-purple-500 rounded-full animate-ping" />
    </div>
  );
}

const RobotModelScene = dynamic(() => import('./RobotModelScene'), {
  ssr: false,
  loading: () => <RobotLoader />
});



export default function FloatingRobot() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform logic
  // 0 - Start (Hero)
  // 500-1000 - Transition to AboutMe
  
  // Desktop Position
  // Hero: Aligned right (approx 25% from right edge which is 75% left)
  // About: Center (50% left)
  // We use `left` or `x` transform. Using `x` is more performant.
  // Assuming container is full width centered.
  
  // Using percentage values for X to support responsiveness
  // Hero X: 20% (moves to right, but slightly less extreme)
  // About X: 0% (center)
  const xDesktop = useTransform(scrollY, [0, 800], ["20%", "0%"]);
  
  // Mobile Position
  // Hero: Center top (usually just 0)
  // About: Center (0)
  const xMobile = useTransform(scrollY, [0, 800], ["0%", "0%"]);
  
  const x = isMobile ? xMobile : xDesktop;

  // Scale can also change
  // Hero: 1
  // About: Slight zoom for impact
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  
  // Opacity - Fade out more significantly to be a subtle background
  const opacityScroll = useTransform(scrollY, [0, 800], [1, 0.15]);
  
  // Combine opacity with route visibility
  // If not home page, opacity is 0. But we keep it mounted.
  const opacity = isHomePage ? opacityScroll : 0;
  const pointerEvents = isHomePage ? "auto" : "none";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ pointerEvents }}>
        <motion.div 
            style={{ x, scale, opacity }}
            className={`w-full h-full flex items-center justify-center transition-opacity duration-500`}
        >
            <div className="w-[800px] h-[800px] relative">
                <RobotModelScene />
            </div>
        </motion.div>
    </div>
  );
}
