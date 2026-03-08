"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN } from "@/constants/animations";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * Optimized Image Component
 * - Automatic WebP/AVIF format conversion
 * - Lazy loading with blur placeholder
 * - Responsive sizing
 * - Loading animation
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  containerClassName = "",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Determine aspect ratio for placeholder
  const getAspectRatio = () => {
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return "56.25%"; // 16:9 default
  };

  return (
    <motion.div
      {...FADE_IN}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 ${containerClassName}`}
    >
      {/* Aspect ratio container */}
      {!width || !height ? (
        <div style={{ paddingBottom: getAspectRatio() }} className="w-full" />
      ) : null}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
      )}

      {/* Actual image */}
      <div className="relative w-full h-full">
        {width && height ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={90}
            onLoadingComplete={() => setIsLoading(false)}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoading ? "blur-sm" : "blur-0"
            } ${className}`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            onLoadingComplete={() => setIsLoading(false)}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoading ? "blur-sm" : "blur-0"
            } ${className}`}
          />
        )}
      </div>
    </motion.div>
  );
}
