"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookConsultationModal from "@/components/BookConsultationModal";
import { Starter, Beginners, Intermediate, Advanced } from "@/constants/images";
import { Presentation } from "lucide-react";
import { motion } from "framer-motion";
import { useIntlayer } from "next-intlayer";

export default function FeaturedLevels() {
  const { featuredLevels } = useIntlayer("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

  const levels = [
    {
      id: 1,
      tag: featuredLevels.levels.starter.tag,
      title: null,
      description: featuredLevels.levels.starter.description,
      image: Starter,
    },
    {
      id: 2,
      tag: featuredLevels.levels.beginner.tag,
      title: featuredLevels.levels.beginner.title,
      description: featuredLevels.levels.beginner.description,
      image: Beginners,
    },
    {
      id: 3,
      tag: featuredLevels.levels.intermediate.tag,
      title: featuredLevels.levels.intermediate.title,
      description: featuredLevels.levels.intermediate.description,
      image: Intermediate,
    },
    {
      id: 4,
      tag: featuredLevels.levels.advanced.tag,
      title: featuredLevels.levels.advanced.title,
      description: featuredLevels.levels.advanced.description,
      image: Advanced,
    },
  ];

  const openModal = (tag: string) => {
    setSelectedLevel(tag);
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-16 md:py-24 px-5 bg-[#F4F9F6] dark:bg-slate-900/40 transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <div>
              <p className="text-secondary uppercase font-bold text-xs tracking-wider mb-2">
                {featuredLevels.whatsNew}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">{featuredLevels.title}</h2>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-colors"
            >
              {featuredLevels.viewAll}
            </Button>
          </motion.div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {levels.map((level, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={level.id}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 md:p-5 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image Area */}
                <div className="relative h-60 md:h-[280px] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                  {level.image && (
                    <Image
                      src={level.image}
                      alt={(level.title ?? level.tag) as unknown as string}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                      onClick={() => openModal(level.tag as unknown as string)}
                      className="bg-[#1D4760] hover:bg-[#15364A] text-white rounded-full text-sm px-6 h-11 flex items-center gap-2 w-full md:w-auto transition-colors"
                    >
                      <Presentation className="w-4 h-4" />
                      Book a consultation
                    </Button>
                  </div>

                </div>
              </motion.div>
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
