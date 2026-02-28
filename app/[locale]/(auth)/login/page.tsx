'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";
import { useIntlayer } from "next-intlayer";

export default function Login() {
  const { login } = useIntlayer("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{login.title}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {login.subtitle}
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {login.emailLabel} <span className="text-red-500">*</span>
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
            {login.passwordLabel} <span className="text-red-500">*</span>
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
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{login.rememberMe}</span>
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
            {login.forgotPassword}
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {login.loginButton}
        </button>
      </form>

      {/* Divider */}
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#f0f4f8] sm:bg-white dark:bg-black sm:dark:bg-slate-900 text-slate-500 dark:text-slate-400">
            {login.joinedBefore}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        <button className="flex items-center justify-center h-12 px-4 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-slate-200 focus:ring-offset-1">
          <svg className="h-5 w-5 mr-3" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
            <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.31040 24.0001 12.0004 24.0001Z" fill="#34A853" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{login.googleButton}</span>
        </button>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
        {login.noAccount}{' '}
        <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all">
          {login.signUpLink}
        </Link>
      </p>

    </div>
  );
}
