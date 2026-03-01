"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Wonderful teachers! The lessons are structured with an individual approach and take place in a comfortable environment. We've been doing this for several months now, and I see progress. I recommend Lmmverse   !",
    name: "Anna",
    role: "Founder of Awesomeux Technology",
    avatar: null,
  },
  {
    id: 2,
    quote:
      "John is an excellent teacher, my task is to improve my spoken English. The lessons are easy and interesting, we talk a lot, we learn new words. I am pleased with the individual approach, I will continue to study. I can safely recommend John if you want to start speaking English.",
    name: "Ekaterina Shchitova",
    role: "Marketing Manager",
    avatar: null,
  },
  {
    id: 3,
    quote:
      "The lesson took place at the stated time. The price per lesson corresponded to the agreed price. The teacher uses a lot of additional literature and videos, which enlivens the lesson. 1.5 hours passed unnoticed.",
    name: "Svetlana Smirnova",
    role: "Software Engineer",
    avatar: null,
  },
  {
    id: 4,
    quote:
      "I've been learning English for a long time, but I still have a lot of questions. I'm glad I found LmVerse. The teachers are very helpful and patient. I'm sure I'll improve my English with them.",
    name: "Dmitry Ivanov",
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
    <section className="py-16 bg-[#1a1f2e] dark:bg-[#0f1218] overflow-hidden">
      <div className="md:px-40 px-5 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl rounded-3xl bg-[#25293a] dark:bg-[#1a1f2e] p-8 md:p-12 relative shadow-xl"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
