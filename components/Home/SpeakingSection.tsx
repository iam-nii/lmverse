"use client";

import Image from "next/image";
import { AtLmverse } from "@/constants/images";
import { motion } from "framer-motion";

import { useIntlayer } from "next-intlayer";

export default function SpeakingSection() {
  const { speakingSection } = useIntlayer("home");

  const bullets = [
    {
      icon: "🏆",
      title: speakingSection.bullets[0],
      color: "bg-rose-100",
    },
    {
      icon: "📚",
      title: speakingSection.bullets[1],
      color: "bg-green-100",
    },
    {
      icon: "🎯",
      title: speakingSection.bullets[2],
      color: "bg-rose-100",
    },
    {
      icon: "👑",
      title: speakingSection.bullets[3],
      color: "bg-purple-100",
    },
  ];
  return (
    <section className="py-16 md:py-24 md:px-40 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary font-semibold text-sm mb-2">
            {speakingSection.subtitle}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
            {speakingSection.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            {speakingSection.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bullets.map((b, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05 }}
                key={i}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4 shadow-sm cursor-default"
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${b.color}`}
                >
                  {b.icon}
                </span>
                <p className="text-sm font-medium leading-snug">{b.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Right — placeholder for UI mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center h-full md:relative"
        >
          <Image src={AtLmverse} alt="At Lmverse" className="md:relative md:top-15 max-w-[1500px] h-full hover:scale-105 transition-transform duration-700" />
        </motion.div>
      </div>
    </section>
  );
}
