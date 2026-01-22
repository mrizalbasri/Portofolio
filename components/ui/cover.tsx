"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "./sparkles";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = React.useState(0);
  const [beamData, setBeamData] = React.useState<{ y: number; delay: number; duration: number }[]>([]);

  React.useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.clientWidth ?? 0);

      const height = ref.current.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const data = Array.from(
        { length: numberOfBeams },
        (_, i) => ({
          y: (i + 1) * (height / (numberOfBeams + 1)),
          delay: Math.random() * 2 + 1,
          duration: Math.random() * 2 + 1
        })
      );
      setBeamData(data);
    }
  }, []); // Removed ref.current dependency to avoid warning, it's standard pattern

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className={cn(
        "relative hover:bg-neutral-900/80 group/cover inline-block bg-neutral-900/20 border border-white/10 px-2 py-1 transition-all duration-200 rounded-md",
        className
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
            }}
            className="h-full w-full overflow-hidden absolute inset-0"
          >
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              transition={{
                translateX: {
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="w-[200%] h-full flex"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {beamData.map((data, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={data.duration}
          delay={data.delay}
          width={containerWidth}
          style={{
            top: `${data.y}px`,
          }}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          x: hovered ? [0, -2, 2, -2, 2, 0] : 0,
          y: hovered ? [0, -2, 2, -2, 2, 0] : 0,
        }}
        transition={{
          duration: 0.2,
          repeat: hovered ? Infinity : 0,
          repeatDelay: 0.1,
        }}
        className={cn(
          "text-white inline-block relative z-20 group-hover/cover:text-white transition-colors duration-200",
          className
        )}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px]" />
      <CircleIcon className="absolute -left-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" />
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...otherProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      initial={{
        width: 0,
      }}
      animate={{
        width: hovered ? width : 0,
      }}
      transition={{
        duration: hovered ? 0.3 : 0,
        delay: hovered ? delay : 0,
      }}
      className={cn(
        "absolute left-0 bg-gradient-to-r dark:from-neutral-500 from-neutral-200 to-transparent h-[1px] w-full",
        className
      )}
      {...otherProps}
    />
  );
};

export const CircleIcon = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white",
        className
      )}
    ></div>
  );
};
