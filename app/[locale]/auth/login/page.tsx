'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Sign in to your account to continue.
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white dark:bg-slate-900 dark:text-white"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Password <span className="text-red-500">*</span>
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-500'}`}
              onClick={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Check className="h-3.5 w-3.5 text-white" />}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remember Me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span>Login</span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 font-medium">Joined us before?</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="w-full">
        <button type="button" className="w-full flex items-center justify-center h-11 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors rounded-full text-slate-700 dark:text-slate-200 font-semibold text-sm">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.31-1.04 2.41-2.12 3.13v2.6h3.42c2.01-1.85 3.17-4.58 3.17-7.74Z" />
            <path fill="#34A853" d="M12 24c2.97 0 5.46-.98 7.28-2.66l-3.42-2.6c-.98.66-2.23 1.05-3.86 1.05-2.97 0-5.49-2-6.39-4.71H2.03v2.69C3.85 21.4 7.6 24 12 24Z" />
            <path fill="#FBBC05" d="M5.61 15.08c-.23-.69-.36-1.43-.36-2.19s.13-1.5.36-2.19V8.01H2.03A12.01 12.01 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.85-2.69Z" />
            <path fill="#EA4335" d="M12 4.79c1.61 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.48 14.97 0 12 0 7.6 0 3.85 2.6 2.03 6.61l3.58 2.69c.9-2.7 3.42-4.71 6.39-4.71Z" />
          </svg>
          Google
        </button>
      </div>

      {/* Footer Link */}
      <div className="text-center mt-6">
        <span className="text-sm text-slate-500">Don't have an account? </span>
        <Link href="/auth/signup" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>

    </div>
  );
}
