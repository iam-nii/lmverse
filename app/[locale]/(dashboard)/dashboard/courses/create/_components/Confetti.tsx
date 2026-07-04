"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Piece = {
  id: number;
  x: number;
  rotate: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  drift: number;
};

const COLORS = [
  "var(--success)",
  "var(--foreground)",
  "var(--muted-foreground)",
  "var(--success)",
];

/**
 * Minimal, tasteful confetti. A small number of pieces gently fall and fade,
 * emitted once from just above the checkmark.
 */
export function Confetti() {
  const [pieces] = useState<Piece[]>(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 260,
      rotate: (Math.random() - 0.5) * 260,
      delay: Math.random() * 0.18,
      duration: 1.6 + Math.random() * 0.9,
      size: 5 + Math.random() * 4,
      color: COLORS[i % COLORS.length],
      drift: (Math.random() - 0.5) * 40,
    }));
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden"
    >
      <div className="relative mt-2 h-0 w-0">
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            className="absolute block rounded-[2px]"
            style={{
              width: p.size,
              height: p.size * 1.6,
              backgroundColor: p.color,
            }}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: [0, p.x * 0.6, p.x],
              y: [0, 60, 150],
              opacity: [0, 1, 1, 0],
              rotate: p.rotate,
            }}
            transition={{
              duration: p.duration,
              delay: 0.3 + p.delay,
              ease: [0.22, 0.61, 0.36, 1],
              times: [0, 0.2, 0.75, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
