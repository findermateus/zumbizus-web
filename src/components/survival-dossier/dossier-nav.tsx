"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface DossierNavItem {
  value: string;
  icon: React.ElementType<LucideProps>;
  title: string;
}

interface DossierNavProps {
  items: DossierNavItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function DossierNav({ items, activeIndex, onSelect }: DossierNavProps) {
  const [buttonWidths, setButtonWidths] = React.useState<number[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const widths = Array.from(containerRef.current.children)
        .filter((child) => child.tagName === "BUTTON")
        .map((button) => button.getBoundingClientRect().width);
      setButtonWidths(widths);
    }
  }, [items]);

  const xOffset = buttonWidths.slice(0, activeIndex).reduce((acc, width) => acc + width, 0) + activeIndex * 16; // 1rem gap

  return (
    <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div
        ref={containerRef}
        className="relative flex items-center gap-4 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg"
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            onClick={() => onSelect(index)}
            className={cn(
              "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-300 cursor-target cursor-none",
              activeIndex === index ? "text-black font-medium" : "text-white/70 hover:text-white"
            )}
            aria-label={`Go to ${item.title} section`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </button>
        ))}
        {buttonWidths.length > 0 && (
          <motion.div
            className="absolute top-2 bottom-2 left-2 z-0 rounded-full bg-primary"
            initial={false}
            animate={{
              x: xOffset,
              width: buttonWidths[activeIndex] || 0,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          />
        )}
      </div>
    </nav>
  );
}
