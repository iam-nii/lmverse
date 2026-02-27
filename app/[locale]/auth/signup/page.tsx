'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, User, Phone } from 'lucide-react';
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Hello there! Let's create your account.
        </p>
      </div>

      {/* Signup Form */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* Name Fields Row */}
        <div className="flex gap-3">
          <div className="space-y-1.5 flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="text"
              placeholder="First name"
              required
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
          <div className="space-y-1.5 flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="text"
              placeholder="Middle name"
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
          <div className="space-y-1.5 flex-1 p-2 border border-blue-400 bg-blue-50/20 dark:bg-blue-900/10 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <input
              type="text"
              placeholder="Last name"
              required
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="relative p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full h-8 pl-2 pr-10 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5 flex gap-2">
          <div className="flex items-center gap-2 p-2 px-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
            <span className="text-lg">🇷🇺</span>
            <span className="text-xs text-slate-400">▼</span>
          </div>
          <div className="relative flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="tel"
              placeholder="+7 (XXX) XXX-XX-XX"
              maxLength={18}
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^\d+()\s-]/g, '');
              }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="relative p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full h-8 pl-2 pr-10 outline-none text-sm bg-transparent dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <EyeToggleIcon isHidden={!showPassword} size={20} />
            </button>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start pt-1">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-blue-500`}></div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-snug">
              I agree to Platform <Link href="#" className="font-semibold text-blue-600 hover:text-blue-500">Terms of Service</Link> and <Link href="#" className="font-semibold text-blue-600 hover:text-blue-500">Privacy Policy</Link>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
        >
          <span>Create my account</span>
        </button>
      </form>

      {/* Footer Link */}
      <div className="text-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center items-center gap-2">
        <span className="text-sm text-slate-500">Joined us before?</span>
        <Link href="/auth/login" className="text-sm font-bold text-blue-500 hover:text-blue-600">
          Login
        </Link>
      </div>

    </div>
  );
}
