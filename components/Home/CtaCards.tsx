"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIntlayer } from "next-intlayer";

export default function CtaCards() {
    const { ctaCards } = useIntlayer("home");
    return (
        <section className="py-12 md:px-40 px-5 bg-gradient-to-b from-white to-amber-50/40 dark:from-[#1a1f2e] dark:to-[#1a1f2e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Become a Tutor */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl bg-[#3b3494] overflow-hidden p-8 flex flex-col gap-4 min-h-48 shadow-lg cursor-pointer"
                >
                    <div
                        className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-teal-600/50 translate-x-8 translate-y-8"
                        aria-hidden
                    />
                    <div
                        className="absolute right-12 bottom-4 w-20 h-20 rounded-full bg-teal-700/40"
                        aria-hidden
                    />
                    <h3 className="text-white text-2xl font-bold">{ctaCards.tutor.title}</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                        {ctaCards.tutor.description}
                    </p>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold w-fit text-sm px-6 mt-auto">
                        {ctaCards.tutor.button}
                    </Button>
                </motion.div>

                {/* Transform Access */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl bg-[#1a1f2e] overflow-hidden p-8 flex flex-col gap-4 min-h-48 shadow-lg cursor-pointer"
                >
                    <div
                        className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-slate-600/50 translate-x-8 translate-y-8"
                        aria-hidden
                    />
                    <div
                        className="absolute right-12 bottom-4 w-20 h-20 rounded-full bg-slate-700/40"
                        aria-hidden
                    />
                    <h3 className="text-white text-2xl font-bold">{ctaCards.newsletter.title}</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                        {ctaCards.newsletter.description}
                    </p>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold w-fit text-sm px-6 mt-auto">
                        {ctaCards.newsletter.button}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
