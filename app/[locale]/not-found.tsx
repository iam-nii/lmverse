"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import { FileQuestion, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    const { locale } = useLocale();
    const { notFoundTitle, notFoundDesc, goHome } = useIntlayer("common");

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                        <FileQuestion className="w-16 h-16 text-primary" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                    {notFoundTitle as unknown as string}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 mb-10">
                    {notFoundDesc as unknown as string}
                </p>

                <Button
                    asChild
                    className="px-10 py-6 rounded-pill font-semibold gap-2 border border-primary text-white bg-primary hover:bg-[#15364A] transition-all"
                >
                    <Link href={`/${locale}`}>
                        <Home className="w-4 h-4" />
                        {goHome as unknown as string}
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
}
