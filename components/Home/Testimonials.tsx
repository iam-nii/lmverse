"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
    {
        id: 1,
        quote:
            "I really appreciated my mentor's insight, but sometimes I felt overwhelmed by the amount of information they provided. It would have been helpful to focus on one or two areas at a time rather than trying to cover everything.",
        name: "John Smith",
        role: "Founder of Awesomeux Technology",
        avatar: null,
    },
    {
        id: 2,
        quote:
            "LmVerse transformed the way I learn English. The tutors are patient, highly qualified, and truly care about your progress. I went from A2 to B2 in just six months.",
        name: "Maria Ivanova",
        role: "Marketing Manager",
        avatar: null,
    },
    {
        id: 3,
        quote:
            "Flexible scheduling, great instructors, and real measurable progress. I highly recommend LmVerse to anyone serious about learning a language.",
        name: "Ahmed Khalil",
        role: "Software Engineer",
        avatar: null,
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((c) => (c + 1) % testimonials.length);

    const t = testimonials[current];

    return (
        <section className="py-16 bg-[#1a1f2e] dark:bg-[#0f1218]">
            <div className="md:px-40 px-5 flex justify-center">
                <div className="w-full max-w-2xl rounded-3xl bg-[#25293a] dark:bg-[#1a1f2e] p-8 md:p-12 relative">
                    {/* Open quote */}
                    <span className="absolute top-6 left-8 text-6xl text-orange-400 leading-none font-serif select-none">
                        &ldquo;
                    </span>
                    {/* Close quote */}
                    <span className="absolute bottom-28 right-8 text-6xl text-orange-400 leading-none font-serif select-none">
                        &rdquo;
                    </span>

                    <p className="text-white text-base md:text-lg text-center italic my-8 leading-relaxed px-4">
                        {t.quote}
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <Button
                            onClick={prev}
                            size="icon"
                            variant="outline"
                            className="rounded-full w-10 h-10 border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                            ←
                        </Button>

                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl">
                            {t.avatar ? (
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span>👤</span>
                            )}
                        </div>

                        <Button
                            onClick={next}
                            size="icon"
                            variant="outline"
                            className="rounded-full w-10 h-10 border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                            →
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-white font-semibold">{t.name}</p>
                        <p className="text-white/60 text-sm">{t.role}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
