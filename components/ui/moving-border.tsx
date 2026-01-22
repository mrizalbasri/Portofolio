"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx} * 0.96) calc(${ry} * 0.96)` }}
      >
        <MovingBorderGradient duration={duration} rx={rx} ry={ry}>
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(var(--primary)_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorderGradient>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${rx} * 0.96) calc(${ry} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

const MovingBorderGradient = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = React.useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  const x = useTransform(progress, (val: number) => {
    const path = pathRef.current;
    if (!path) return 0;
    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength((val * pathLength) % pathLength);
    return point.x;
  });

  const y = useTransform(progress, (val: number) => {
    const path = pathRef.current;
    if (!path) return 0;
    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength((val * pathLength) % pathLength);
    return point.y;
  });

  React.useEffect(() => {
    const controls = animate(progress, 1, {
      duration: duration / 1000,
      repeat: Infinity,
      ease: "linear",
    });
    return controls.stop;
  }, [duration, progress]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          x,
          y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

import { useMotionValue, useTransform, animate } from "framer-motion";

export default MovingBorder;
