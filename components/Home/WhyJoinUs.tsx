"use client";

import { Button } from "@/components/ui/button";

const checkpoints = [
    "Courses are for all ages and levels — from complete beginners to fluent speakers",
    "Learn through real dialogues, movies, songs, and life scenarios.",
    "Your progress and mistakes are not ignored.",
    "The Most World Class Instructors",
];

export default function WhyJoinUs() {
    return (
        <section className="py-16 md:py-20 md:px-40 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left — illustration placeholder */}
                <div className="flex items-center justify-center order-2 md:order-1">
                    <div className="relative w-full max-w-sm h-72 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center overflow-hidden">
                        <p className="text-muted-foreground text-sm">
                            [ Study / tutor illustration ]
                        </p>
                    </div>
                </div>
                {/* Right */}
                <div className="order-1 md:order-2">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Why join us?</h2>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        We are a team of native speakers and experienced teachers who have
                        joined forces to create a unique educational platform. Each of our
                        teachers has international certificates and experience working with
                        students of various levels. We believe that everyone can learn
                        English, and we are ready to help you with this.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {checkpoints.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0 text-xs">
                                    ✓
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Button className="bg-secondary text-white rounded-full px-8 font-semibold text-sm">
                        Register for a free trial lesson
                    </Button>
                </div>
            </div>
        </section>
    );
}
