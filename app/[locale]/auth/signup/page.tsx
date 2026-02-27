'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, EyeOff, Eye, Check, User } from 'lucide-react';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex bg-white text-slate-800">

      {/* Left Side - Illustration Panel (Hidden on smaller screens) */}
      <div className="hidden lg:flex w-1/2 bg-rose-50 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Placeholder for the vector illustration */}
        <div className="relative w-full max-w-sm aspect-square mb-12">
          {/* Main Circle shape from design */}
          <div className="absolute inset-0 bg-white rounded-full shadow-sm flex items-center justify-center">
            {/* Phone outline placeholder */}
            <div className="w-2/3 h-5/6 border-[6px] border-slate-700 rounded-[2rem] bg-white relative flex flex-col items-center p-4">
              <div className="w-1/3 h-2 bg-slate-200 rounded-full mb-6"></div>
              {/* Form lines inside phone */}
              <div className="w-full space-y-4">
                <div className="h-6 w-full border border-slate-200 rounded bg-slate-50 relative flex items-center px-2">
                  <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                </div>
                <div className="h-6 w-full border border-slate-200 rounded bg-slate-50 relative flex items-center px-2">
                  <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                </div>
                <div className="h-6 w-full border border-slate-200 rounded bg-slate-50 relative flex items-center px-2">
                  <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                </div>
              </div>
              <div className="mt-8 w-2/3 h-8 bg-rose-400 rounded"></div>
            </div>

            {/* Orange floating leaf elements placeholders */}
            <div className="absolute -right-6 bottom-10 w-16 h-24 bg-orange-400 rounded-tl-full rounded-br-full transform -rotate-12 opacity-80"></div>
            <div className="absolute -left-4 top-1/4 w-12 h-12 bg-white border border-rose-200 rounded-lg shadow flex items-center justify-center">
              <div className="w-5 h-5 bg-rose-400 rounded-sm transform rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-md z-10">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            Welcome to <br /> <span className="text-slate-900">DreamsLMS Courses.</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.
          </p>

          {/* Slider dots */}
          <div className="flex justify-center items-center space-x-2 pt-4">
            <div className="w-8 h-2.5 bg-emerald-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-indigo-900" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-indigo-900 tracking-tight">Dreams<span className="text-rose-500 text-sm align-top">LMS</span></span>
            </div>
            <Link href="/" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 underline underline-offset-4 decoration-emerald-600/30">
              Back to Home
            </Link>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Sign Up</h2>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm bg-white"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm bg-white"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength placeholder blocks */}
              <div className="flex space-x-1 mt-2">
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-full"></div>
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-full"></div>
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-full"></div>
                <div className="h-1.5 w-1/4 bg-slate-200 rounded-full"></div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5 mt-4">
              <label className="text-sm font-semibold text-slate-800">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300 group-hover:border-emerald-500'}`}
                  onClick={() => setAgreed(!agreed)}
                >
                  {agreed && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  I agree with <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span>Sign Up</span>
              <span className="ml-1 text-lg">›</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">Or</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center h-11 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-slate-700 font-medium text-sm">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.31-1.04 2.41-2.12 3.13v2.6h3.42c2.01-1.85 3.17-4.58 3.17-7.74Z" />
                <path fill="#34A853" d="M12 24c2.97 0 5.46-.98 7.28-2.66l-3.42-2.6c-.98.66-2.23 1.05-3.86 1.05-2.97 0-5.49-2-6.39-4.71H2.03v2.69C3.85 21.4 7.6 24 12 24Z" />
                <path fill="#FBBC05" d="M5.61 15.08c-.23-.69-.36-1.43-.36-2.19s.13-1.5.36-2.19V8.01H2.03A12.01 12.01 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.85-2.69Z" />
                <path fill="#EA4335" d="M12 4.79c1.61 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.48 14.97 0 12 0 7.6 0 3.85 2.6 2.03 6.61l3.58 2.69c.9-2.7 3.42-4.71 6.39-4.71Z" />
              </svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center h-11 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-slate-700 font-medium text-sm">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-slate-500">Already you have an account? </span>
            <Link href="/auth/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
