"use client";

import { useState } from "react";
import Image from "next/image";
import { Hero } from "@/constants/images";

import Features from "@/components/Home/Features";
import Courses from "@/components/Home/Courses";
import SpeakingSection from "@/components/Home/SpeakingSection";
import Programs from "@/components/Home/Programs";
import FeaturedLevels from "@/components/Home/FeaturedLevels";
import WhyJoinUs from "@/components/Home/WhyJoinUs";
import Testimonials from "@/components/Home/Testimonials";
import CtaCards from "@/components/Home/CtaCards";
import LessonOptions from "@/components/Home/LessonOptions";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";
import { Button } from "@/components/ui/button";
import { useIntlayer } from "next-intlayer";

export default function Home() {
  const { hero, featuredLevels } = useIntlayer("home");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="relative z-10 md:px-40 px-5 pt-10 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                {hero.subtitle}
              </p>
              <h1 className="text-[32px] md:text-5xl font-bold leading-tight mb-4 whitespace-pre-line">
                {hero.title}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-sm">
                Our specialized online courses are designed to bring the
                classroom experience to you, no matter where you are.
              </p>
              <p className="text-sm font-semibold mb-3">
                Trusted by over 15K Users worldwide since 2022
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <span className="text-3xl font-bold">1000+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">4.8</span>
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
              </div>
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 font-semibold"
              >
                {hero.cta1}
              </Button>
            </div>

            {/* Right — hero image */}
            <div className="flex justify-center">
              <Image
                src={Hero}
                alt="hero"
                className="w-full max-w-sm md:max-w-full object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Features strip ──────────────────────────── */}
        <section className="md:px-40 px-5 pb-10">
          <Features />
        </section>

        {/* ── Top Courses ─────────────────────────────── */}
        <section className="md:px-40 px-5 pb-16">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-secondary uppercase font-bold text-xs tracking-wider">
                available courses
              </p>
              <h2 className="text-2xl font-bold mt-1">Top Courses</h2>
            </div>
            <Button
              variant="ghost"
              className="text-secondary bg-secondary/10 rounded-full font-semibold"
            >
              {featuredLevels.viewAll}
            </Button>
          </div>
          <Courses />
        </section>

        {/* ── Speaking Section ────────────────────────── */}
        <SpeakingSection />

        {/* ── Programs ────────────────────────────────── */}
        <Programs />

        {/* ── Featured Levels ─────────────────────────── */}
        <FeaturedLevels />

        {/* ── Why Join Us ─────────────────────────────── */}
        <WhyJoinUs onBookConsultation={() => setModalOpen(true)} />

        {/* ── Testimonials ────────────────────────────── */}
        <Testimonials />

        {/* ── CTA Cards ───────────────────────────────── */}
        <CtaCards />

        {/* ── Lesson Options ──────────────────────────── */}
        <LessonOptions />

        {/* ── Footer ──────────────────────────────────── */}
        <Footer />
      </main>

      {/* Global modal */}
      <BookConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
