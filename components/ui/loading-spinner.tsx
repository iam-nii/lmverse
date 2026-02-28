"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    className?: string;
    size?: number;
}

export function LoadingSpinner({ className, size = 48 }: LoadingSpinnerProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="text-primary"
            >
                <Loader2 size={size} />
            </motion.div>
        </div>
    );
}
