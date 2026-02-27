'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";
import { useRouter } from 'next/navigation';
import { useIntlayer } from "next-intlayer";

export default function PasswordReset() {
  const { resetPassword } = useIntlayer("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/auth/login');
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">

      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{resetPassword.title}</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {resetPassword.subtitle}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6 mt-8" onSubmit={handleSubmit}>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {resetPassword.newPasswordLabel} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white dark:bg-slate-900 dark:text-white"
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

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {resetPassword.confirmPasswordLabel} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white dark:bg-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <EyeToggleIcon isHidden={!showConfirmPassword} size={20} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Lock className="w-4 h-4 mr-2" />
          <span>{resetPassword.resetButton}</span>
        </button>
      </form>
    </div>
  );
}
