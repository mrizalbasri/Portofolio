"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text" | "circle";
  animate?: boolean;
}

export function Skeleton({ 
  className, 
  variant = "default",
  animate = true,
  ...props 
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-md";
  
  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full rounded-xl",
    text: "h-4 w-3/4",
    circle: "h-12 w-12 rounded-full",
  };

  const skeletonClasses = cn(
    baseClasses,
    variants[variant],
    className
  );

  if (animate) {
    return (
      <motion.div
        className={skeletonClasses}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
        {...props}
      />
    );
  }

  return <div className={skeletonClasses} {...props} />;
}

// Specific loading components
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-4">
      <Skeleton variant="card" className="h-48" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HeroProjectSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-12 h-12" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
        <Skeleton className="h-12 w-36 rounded-xl" />
      </div>
      <div className="relative">
        <Skeleton variant="card" className="h-80" />
      </div>
    </div>
  );
}

export function SkillItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-gray-800 bg-gray-900/50">
      <Skeleton variant="circle" className="w-6 h-6" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}