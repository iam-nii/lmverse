"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";
import { useTranslations, useLocale } from "next-intl";

export default function TutorSignup() {
  const locale = useLocale();
  const tTutor = useTranslations("auth.tutorSignup");
  const tSignup = useTranslations("auth.signup");

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const ROLE = "tutor";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const fullName = [form.firstName, form.middleName, form.lastName]
      .filter(Boolean)
      .join(" ");

    const PAYLOAD = {
      email: form.email,
      password: form.password,
      fullName,
      phone: form.phone,
      role: ROLE,
    };
    console.log(PAYLOAD);

    setIsLoading(false);

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="w-full animate-in fade-in duration-500 flex flex-col items-center text-center gap-6 py-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {tTutor("pendingTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            {tTutor("pendingMessage")}
          </p>
        </div>
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {tTutor("pendingAction")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {tTutor("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {tTutor("subtitle")}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Signup Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name Fields Row */}
        <div className="flex gap-3">
          <div className="space-y-1.5 flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="text"
              name="firstName"
              placeholder={tSignup("firstName")}
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
          <div className="space-y-1.5 flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="text"
              name="middleName"
              placeholder={tSignup("middleName")}
              value={form.middleName}
              onChange={handleChange}
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
          <div className="space-y-1.5 flex-1 p-2 border border-blue-400 bg-blue-50/20 dark:bg-blue-900/10 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <input
              type="text"
              name="lastName"
              placeholder={tSignup("lastName")}
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="relative p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type="email"
              name="email"
              placeholder={tSignup("emailPlaceholder")}
              required
              value={form.email}
              onChange={handleChange}
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
              name="phone"
              placeholder="+7 (XXX) XXX-XX-XX"
              maxLength={18}
              value={form.phone}
              onChange={handleChange}
              className="w-full h-8 px-2 outline-none text-sm bg-transparent dark:text-white"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^\d+()\s-]/g,
                  ""
                );
              }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="relative p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-900">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={tSignup("passwordPlaceholder")}
              required
              value={form.password}
              onChange={handleChange}
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

        {/* Terms Agreement */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 border border-slate-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-blue-600 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="text-slate-600 dark:text-slate-400"
            >
              {tSignup("agreement1")}{" "}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {tSignup("terms")}
              </a>{" "}
              {tSignup("and")}{" "}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {tSignup("privacy")}
              </a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !agreed}
          className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {tSignup("createAccountButton")}
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {tSignup("haveAccount")}{" "}
          <Link
            href={`/${locale}/tutor/login`}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all"
          >
            {tSignup("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
