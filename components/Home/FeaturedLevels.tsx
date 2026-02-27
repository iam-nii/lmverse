"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookConsultationModal from "@/components/BookConsultationModal";
import { Starter, Beginners, Intermediate, Advanced } from "@/constants/images";
import { Presentation } from "lucide-react";

const levels = [
  {
    id: 1,
    tag: "STARTER",
    title: null,
    description:
      "The foundation of the English language is the basic grammatical structures, keywords and correct pronunciation, without which it is impossible to build complex sentences and understand speech.",
    image: Starter,
  },
  {
    id: 2,
    tag: "A1 - A2",
    title: "Beginner | Elementary | Pre-level",
    description:
      "Ideal for those who are just starting to learn a language and want to gradually speak confidently.",
    image: Beginners,
  },
  {
    id: 3,
    tag: "B1 - B2",
    title: "Intermediate | Upper intermediate",
    description:
      "This is an advanced stage when you communicate confidently in English, understand complex texts, and express your thoughts freely.",
    image: Intermediate,
  },
  {
    id: 4,
    tag: "C1 - C2",
    title: "Advanced | Proficiency",
    description:
      "The advanced level makes it easy to understand everything you hear and read, to express thoughts freely and accurately, even in difficult situations.",
    image: Advanced,
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
      <section className="py-16 md:py-24 px-5 bg-[#F4F9F6] dark:bg-slate-900/40 transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <p className="text-[#3A9E49] font-bold text-sm mb-2">
                What&apos;s New
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Featured Levels
              </h2>
            </div>
            <Button
              className="bg-[#3A9E49] hover:bg-[#2C8038] text-white rounded-full font-medium px-6 py-2.5 shadow-sm transition-colors cursor-pointer"
            >
              View all Courses
            </Button>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {levels.map((level) => (
              <div
                key={level.id}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 md:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Area */}
                <div className="relative h-60 md:h-[280px] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                  {level.image && (
                    <Image
                      src={level.image}
                      alt={level.title ?? level.tag}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Badge */}
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-lg text-sm font-extrabold text-[#3A9E49] shadow-md tracking-tight">
                    {level.tag}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 px-1">

                  {/* Instructor row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-700 bg-slate-200">
                      <Image
                        src="https://i.pravatar.cc/150?u=nicole"
                        alt="Nicole Brown"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">Nicole Brown</p>
                      <p className="text-xs text-slate-500 font-medium tracking-wide">Instructor</p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  {level.title && (
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-2 leading-tight">
                      {level.title}
                    </h3>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {level.description}
                  </p>

                  {/* Divider & Action Button */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-center md:justify-end">
                    <Button
                      onClick={() => openModal(level.tag)}
                      className="bg-[#1D4760] hover:bg-[#15364A] text-white rounded-full text-sm px-6 h-11 flex items-center gap-2 w-full md:w-auto transition-colors"
                    >
                      <Presentation className="w-4 h-4" />
                      Book a consultation
                    </Button>
                  </div>

                </div>
              </div>
            ))}
          </div>
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
