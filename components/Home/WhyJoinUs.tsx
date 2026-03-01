"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIntlayer } from "next-intlayer";
import Image from "next/image";
import { WhyJoinUs as WhyJoinUsImage } from "@/constants/images";

type Props = {
  onBookConsultation?: () => void;
};

export default function WhyJoinUs({ onBookConsultation }: Props) {
  const { whyJoinUs } = useIntlayer("home");
  return (
    <section className="py-16 md:py-20 md:px-40 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Left — illustration placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center order-2 md:order-1"
        >
          <div className="relative w-full max-w-2xl h-72 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border border-border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500 shadow-sm cursor-default">
            <Image
              src={WhyJoinUsImage}
              alt="Why Join Us"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {whyJoinUs.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {whyJoinUs.description}
          </p>
          <ul className="space-y-3 mb-8">
            {whyJoinUs.points.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0 text-xs">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={onBookConsultation}
            className="bg-secondary text-white rounded-full px-8 font-semibold text-sm hover:scale-105 transition-transform"
          >
            {whyJoinUs.register}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
