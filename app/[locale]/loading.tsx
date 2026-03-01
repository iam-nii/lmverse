"use client";

import { useIntlayer } from "next-intlayer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";

export default function Loading() {
    const { loading } = useIntlayer("common");

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6"
            >
                <LoadingSpinner size={64} />
                <p className="text-xl font-medium text-slate-600 dark:text-slate-300 animate-pulse">
                    {loading as unknown as string}
                </p>
            </motion.div>
        </div>
    );
}
