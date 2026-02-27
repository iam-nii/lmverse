"use client";
import { motion } from "framer-motion";

import { useIntlayer } from "next-intlayer";

export default function LessonOptions() {
    const { lessonOptions } = useIntlayer("home");

    const options = [
        {
            title: lessonOptions.elementary.title,
            description: lessonOptions.elementary.description,
            accentColor: "border-l-secondary",
        },
        {
            title: lessonOptions.individual.title,
            description: lessonOptions.individual.description,
            accentColor: "border-l-secondary",
        },
        {
            title: lessonOptions.business.title,
            description: lessonOptions.business.description,
            accentColor: "border-l-secondary",
        },
        {
            title: lessonOptions.group.title,
            description: lessonOptions.group.description,
            accentColor: "border-l-secondary",
        },
    ];

    return (
        <section className="py-16 md:py-20 md:px-40 px-5 overflow-hidden">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center text-2xl font-bold mb-10"
            >
                {lessonOptions.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((opt, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        key={i}
                        className={`border-l-4 ${opt.accentColor} rounded-r-xl border border-border pl-5 pr-4 py-5 bg-card shadow-sm hover:shadow-md transition-shadow cursor-default`}
                    >
                        <p className="text-secondary font-semibold text-sm mb-2 underline underline-offset-2 cursor-pointer hover:text-secondary/80 transition-colors">
                            {opt.title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {opt.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
