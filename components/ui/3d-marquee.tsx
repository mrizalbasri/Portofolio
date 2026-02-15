"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  // Ensure we have enough images for 8 rows x 8 columns
  const filledImages = [...images];
  while (filledImages.length < 64) {
    filledImages.push(...images);
  }
  const finalImages = filledImages.slice(0, 64);

  // Split into 8 rows
  const rows = Array.from({ length: 8 }, (_, i) =>
    finalImages.slice(i * 8, (i + 1) * 8)
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Transformed Container */}
      <div
        className="flex flex-col gap-4 transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${
            isHovered ? mousePosition.y * 10 : 25
          }deg) rotateY(${isHovered ? mousePosition.x * 10 : -15}deg) rotateZ(${
            isHovered ? 0 : 10
          }deg) scale(${isHovered ? 1.02 : 1.05}) translateZ(0)`,
          transformStyle: "preserve-3d",
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4"
            style={{
              animation: `marquee-${rowIndex % 2 === 0 ? "left" : "right"} ${
                20 + rowIndex * 2
              }s linear infinite`,
              animationPlayState: isHovered ? "paused" : "running",
            }}
          >
            {/* Triple the images for seamless infinite scroll */}
            {[...row, ...row, ...row].map((image, index) => (
              <div
                key={`${rowIndex}-${index}`}
                className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:z-10 md:h-24 md:w-44"
              >
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 176px"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlays for fade effect - Responsive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      {/* Narrower gradient on mobile, wider on desktop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ThreeDMarquee;
