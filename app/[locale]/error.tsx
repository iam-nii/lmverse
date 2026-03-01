"use client";

import { useEffect } from "react";
import { useIntlayer } from "next-intlayer";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const { errorTitle, errorDesc, tryAgain, goHome } = useIntlayer("common");

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <AlertCircle className="w-12 h-12 text-destructive" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                    {errorTitle as unknown as string}
                </h1>

                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    {errorDesc as unknown as string}
                </p>

                {process.env.NODE_ENV === "development" && (
                    <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left overflow-auto max-h-40">
                        <p className="text-xs font-mono text-slate-700 dark:text-slate-300">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-[10px] font-mono text-slate-500 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => reset()}
                        className="w-full sm:w-auto px-8 py-6 rounded-full font-semibold gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        {tryAgain as unknown as string}
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto px-8 py-6 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors gap-2"
                    >
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            {goHome as unknown as string}
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
