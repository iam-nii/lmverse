"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { logo } from "@/constants/images";
import { nunito } from "@/constants/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "next-intlayer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { quotes } = useIntlayer("auth");
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  return (
    <div className="flex min-h-screen w-full bg-[#f0f4f8] dark:bg-black p-0 sm:p-4 md:p-6 lg:p-8 font-sans items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white dark:bg-slate-900 sm:rounded-[2rem] overflow-hidden sm:shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-screen sm:min-h-[85vh]">

        {/* Left/Top Side (Image Panel) */}
        <div className="w-full lg:w-5/12 relative p-4 pb-0 lg:p-4 lg:pr-2 flex flex-col h-[40vh] sm:h-[45vh] lg:h-auto order-1">
          {/* Mobile Logo Only (Hidden on Desktop) */}
          <div className="flex lg:hidden items-center space-x-2 mb-4 px-2">
            <Image src={logo} alt="Lmverse Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className={`text-xl font-bold text-slate-800 dark:text-white ${nunito.className}`}>Lmverse</span>
          </div>

          {/* Inner rounded container for the image */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 flex-1 shadow-inner group">
            {/* Base Image */}
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students learning together"
              fill
              className="object-cover opacity-80"
              unoptimized
              priority
            />
            {/* Quote Overlay */}
            <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 bottom-4 sm:bottom-6 lg:bottom-8 p-6 lg:p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white overflow-hidden">

              <div className="relative min-h-[100px] flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuote}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-lg lg:text-xl font-medium leading-snug mb-4 text-center">
                      "{quotes[currentQuote].text}"
                    </h3>
                    <p className="text-xs lg:text-sm font-medium text-white/80 text-center">- {quotes[currentQuote].author}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-8 relative z-10">
                <div className="flex gap-2">
                  {quotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuote(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentQuote ? 'bg-white shadow-sm' : 'bg-white/30 hover:bg-white/50 cursor-pointer'}`}
                      aria-label={`Go to quote ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevQuote}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                    aria-label="Previous quote"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={nextQuote}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                    aria-label="Next quote"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right/Bottom Side (Form Panel) */}
        <div className="w-full lg:w-7/12 flex flex-col p-6 sm:p-10 lg:p-16 order-2 bg-white dark:bg-slate-900">
          {/* Desktop Logo Only (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center justify-between w-full max-w-md mx-auto mb-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={logo} alt="Lmverse Logo" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className={`text-xl font-bold text-slate-800 dark:text-white ${nunito.className}`}>Lmverse</span>
            </Link>
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-blue-500 transition-colors">
              Return Home
            </Link>
          </div>

          <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
