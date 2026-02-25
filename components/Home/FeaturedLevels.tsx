"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookConsultationModal from "@/components/BookConsultationModal";

const levels = [
    {
        id: 1,
        tag: "STARTER",
        title: null,
        description:
            "The foundation of the English language is the basic grammatical structures, keywords and correct pronunciation, without which it is impossible to build complex sentences and understand speech.",
        image: null,
    },
    {
        id: 2,
        tag: "A1 - A2",
        title: "Beginner | Elementary | Pre-level",
        description:
            "Ideal for those who are just starting to learn a language and want to gradually speak confidently.",
        image: null,
    },
    {
        id: 3,
        tag: "B1 - B2",
        title: "Intermediate | Upper intermediate",
        description:
            "This is an advanced stage when you communicate confidently in English, understand complex texts, and express your thoughts freely.",
        image: null,
    },
    {
        id: 4,
        tag: "C1 - C2",
        title: "Advanced | Proficiency",
        description:
            "The advanced level makes it easy to understand everything you hear and read, to express thoughts freely and accurately, even in difficult situations.",
        image: null,
    },
];

export default function FeaturedLevels() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

    const openModal = (tag: string) => {
        setSelectedLevel(tag);
        setModalOpen(true);
    };

    return (
        <>
            <section className="py-16 md:py-20 md:px-40 px-5">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-secondary font-semibold text-sm mb-1">
                            What&apos;s New
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold">Featured Levels</h2>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-secondary bg-secondary/10 rounded-full font-semibold"
                    >
                        View all Courses
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {levels.map((level) => (
                        <div
                            key={level.id}
                            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
                        >
                            {/* Image area */}
                            <div className="relative h-44 bg-muted flex items-center justify-center">
                                {level.image ? (
                                    <Image
                                        src={level.image}
                                        alt={level.title ?? level.tag}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-green-50 to-teal-100 dark:from-slate-700 dark:to-slate-600" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <p className="text-secondary font-bold text-sm mb-1">
                                    {level.tag}
                                </p>
                                {/* Instructor row placeholder */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-muted border border-border flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">Nicole Brown</p>
                                        <p className="text-xs text-muted-foreground">Instructor</p>
                                    </div>
                                </div>
                                {level.title && (
                                    <h3 className="font-bold text-base mb-2">{level.title}</h3>
                                )}
                                <p className="text-sm text-muted-foreground flex-1">
                                    {level.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-border">
                                    <Button
                                        onClick={() => openModal(level.tag)}
                                        className="bg-primary text-white rounded-full text-sm px-6"
                                    >
                                        🛒 Book a consultation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <BookConsultationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                levelTitle={selectedLevel}
            />
        </>
    );
}
