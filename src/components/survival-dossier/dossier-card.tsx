"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LucideProps } from "lucide-react";

export interface DossierCardData {
  value: string;
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
  details: string;
  video: string;
}

interface DossierCardProps {
  data: DossierCardData;
  isActive: boolean;
}

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function DossierCard({ data, isActive }: DossierCardProps) {
  return (
    <div className="relative w-full h-full text-white overflow-hidden">
      <div
        className="absolute z-0"
        style={{
          top: "5%",
          right: "5%",
          width: "70%",
          height: "80%",
        }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none shadow-2xs"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <video
          key={data.video}
          className="w-full h-full rounded-xl"
          style={{ objectFit: "cover" }}
          src={`/videos/${data.video}`}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div
        className="relative z-20 flex flex-col justify-center items-start h-full p-8 md:p-16 lg:p-24"
        style={{ maxWidth: "50%" }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.h2
                variants={textVariant}
                className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 drop-shadow-lg"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                {data.title}
              </motion.h2>
              <motion.p
                variants={textVariant}
                className="text-lg md:text-xl text-primary mb-6 drop-shadow-md font-medium"
              >
                {data.description}
              </motion.p>
              <motion.div
                variants={textVariant}
                className="border-l-2 border-primary pl-6 bg-black/30 p-4 rounded-r-lg backdrop-blur-sm"
              >
                <p className="text-base md:text-lg text-white whitespace-pre-line font-medium leading-relaxed">
                  {data.details}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
