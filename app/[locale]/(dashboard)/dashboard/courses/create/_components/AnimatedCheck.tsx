"use client";

import { motion } from "framer-motion";

/**
 * An animated success checkmark:
 * - a soft expanding ripple ring
 * - a filled disc that springs in
 * - a checkmark path that draws itself
 */
export function AnimatedCheck() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Soft ripple rings */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full border border-success/40"
          initial={{ width: 72, height: 72, opacity: 0.5 }}
          animate={{ width: 168, height: 168, opacity: 0 }}
          transition={{
            duration: 1.6,
            delay: 0.25 + i * 0.35,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.2,
          }}
        />
      ))}

      {/* The disc */}
      <motion.div
        className="relative flex size-[72px] items-center justify-center rounded-full bg-success text-success-foreground shadow-sm"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.05,
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <motion.path
            d="M4.5 12.5l4.5 4.5 10.5-11"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.35, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
