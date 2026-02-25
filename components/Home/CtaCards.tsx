"use client";

import { Button } from "@/components/ui/button";

export default function CtaCards() {
    return (
        <section className="py-12 md:px-40 px-5 bg-gradient-to-b from-white to-amber-50/40 dark:from-[#1a1f2e] dark:to-[#1a1f2e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Become a Tutor */}
                <div className="relative rounded-2xl bg-[#3b3494] overflow-hidden p-8 flex flex-col gap-4 min-h-48">
                    <div
                        className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-teal-600/50 translate-x-8 translate-y-8"
                        aria-hidden
                    />
                    <div
                        className="absolute right-12 bottom-4 w-20 h-20 rounded-full bg-teal-700/40"
                        aria-hidden
                    />
                    <h3 className="text-white text-2xl font-bold">Become A Tutor</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                        Top tutors from around the world teach hundreds of students different
                        international languages.
                    </p>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold w-fit text-sm px-6 mt-auto">
                        Register as a tutor
                    </Button>
                </div>

                {/* Transform Access */}
                <div className="relative rounded-2xl bg-[#1a1f2e] overflow-hidden p-8 flex flex-col gap-4 min-h-48">
                    <div
                        className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-slate-600/50 translate-x-8 translate-y-8"
                        aria-hidden
                    />
                    <div
                        className="absolute right-12 bottom-4 w-20 h-20 rounded-full bg-slate-700/40"
                        aria-hidden
                    />
                    <h3 className="text-white text-2xl font-bold">Transform Access</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                        Create an account to receive our newsletter course promotions.
                    </p>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold w-fit text-sm px-6 mt-auto">
                        Register as instructor
                    </Button>
                </div>
            </div>
        </section>
    );
}
