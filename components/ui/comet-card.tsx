"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const CometCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative group", className)}>
      {/* Comet trail effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500 group-hover:duration-200 animate-gradient-xy" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Main card */}
      <div className="relative">{children}</div>

      {/* Comet particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-comet"
              style={{
                left: `${Math.random() * 40 - 20}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CometCard;
