"use client";

import Image from "next/image";

const bullets = [
    {
        icon: "🏆",
        title: "Stay motivated with highly qualified instructors",
        color: "bg-rose-100",
    },
    {
        icon: "📚",
        title: "Keep up with an effective approach to learning",
        color: "bg-green-100",
    },
    {
        icon: "🎯",
        title: "Build confidence through flexibility in learning",
        color: "bg-rose-100",
    },
    {
        icon: "👑",
        title: "Get certified with 100+ certification courses",
        color: "bg-purple-100",
    },
];

export default function SpeakingSection() {
    return (
        <section className="py-16 md:py-24 md:px-40 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <div>
                    <p className="text-secondary font-semibold text-sm mb-2">at LmVerse</p>
                    <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
                        Immediately start speaking effectively in English
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                        Native speakers and highly qualified, experienced teachers provide
                        high-quality instruction while helping students develop natural
                        language proficiency. Our approach to language learning is centered
                        on practical, real-life communication, making it the core component
                        of every lesson. Classes are flexible and adapt to your schedule,
                        allowing you to study whenever it is convenient — without stress or
                        unnecessary pressure.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {bullets.map((b, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4"
                            >
                                <span
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${b.color}`}
                                >
                                    {b.icon}
                                </span>
                                <p className="text-sm font-medium leading-snug">{b.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right — placeholder for UI mockup */}
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-sm h-80 rounded-2xl bg-gradient-to-br from-amber-50 to-green-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border border-border">
                        <p className="text-muted-foreground text-sm">[ App UI mockup ]</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
