"use client";
import { motion } from "framer-motion";

import { useIntlayer } from "next-intlayer";

export default function Programs() {
    const { programs } = useIntlayer("home");

    const programItems = [
        {
            icon: "📋",
            label: programs.individual,
            bg: "bg-amber-50 dark:bg-amber-900/20",
            iconBg: "bg-amber-100",
        },
        {
            icon: "💼",
            label: programs.corporate,
            bg: "bg-rose-50 dark:bg-rose-900/20",
            iconBg: "bg-rose-100",
        },
        {
            icon: "🖥️",
            label: programs.exams,
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
            iconBg: "bg-indigo-100",
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-black border-t">
            <div className="md:px-40 px-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-xl md:text-2xl font-bold mb-10"
                >
                    {programs.title}
                </motion.h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {programItems.map((p, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            key={i}
                            className={`flex items-center gap-4 rounded-2xl px-6 py-5 w-full sm:w-64 border border-border shadow-sm hover:shadow-md cursor-pointer transition-shadow ${p.bg}`}
                        >
                            <span
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${p.iconBg}`}
                            >
                                {p.icon}
                            </span>
                            <p className="font-semibold text-sm">{p.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
