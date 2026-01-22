"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
        "relative mx-auto flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Transformed Container */}
      <div
        className="flex flex-col gap-4 transition-transform duration-500"
        style={{
          transform: `perspective(1000px) rotateX(25deg) rotateY(-15deg) rotateZ(10deg) scale(${
            isHovered ? 1.1 : 1.05
          }) translateZ(0)`,
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
                <img
                  src={image}
                  alt={`Project ${index}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlays for fade effect - reduced opacity */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

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
