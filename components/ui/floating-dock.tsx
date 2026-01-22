"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingDock = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-black/50 px-4 pb-3 backdrop-blur-md border border-white/10",
        className
      )}
    >
      {items.map((item) => (
        <DockIcon mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function DockIcon({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: ReturnType<typeof useMotionValue>;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useMotionValue<HTMLAnchorElement | null>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={(el) => ref.set(el)}
      href={href}
      style={{ width, height }}
      className="relative flex aspect-square items-center justify-center rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
    >
      <div className="flex h-full w-full items-center justify-center text-white">
        {icon}
      </div>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </span>
    </motion.a>
  );
}

export default FloatingDock;
