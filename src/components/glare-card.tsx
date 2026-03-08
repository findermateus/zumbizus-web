"use client";

import GlareHover from "@/components/glare-hover";
import { Card } from "@/components/ui/card";
import React from "react";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlareCard({ children, className }: GlareCardProps) {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background="hsl(var(--card))"
      borderRadius="12px"
      glareColor="#1f8e00"
      glareOpacity={0.3}
      className={`border ${className ?? ""}`}
    >
      <Card className="relative border-0 shadow-none bg-transparent w-full">{children}</Card>
    </GlareHover>
  );
}
