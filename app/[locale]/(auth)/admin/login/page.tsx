"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";
import { useTranslations, useLocale } from "next-intl";
// import { signInWithEmail } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/auth/authApi";
import { userSignInType } from "@/types/userTypes";

export default function AdminLogin() {
  const locale = useLocale();
  const tAdmin = useTranslations("auth.adminLogin");
  const tLogin = useTranslations("auth.login");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const PAYLOAD:userSignInType = {
      email,
      password
    }

    const result = await signInWithEmail(PAYLOAD);

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    // // Redirect based on role - only allow admins
    // if (result.role === "admin") {
    //   router.push(`/${locale}/users/admin`);
    // } else {
    //   // If a student or tutor logs in here, redirect them or show error?
    //   // For now, let's just redirect to their respective dashboard
    //   if (result.role === "tutor") {
    //     router.push(`/${locale}/users/tutor`);
    //   } else {
    //     router.push(`/${locale}/users/student`);
    //   }
    // }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {tAdmin("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {tAdmin("subtitle")}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {tLogin("emailLabel")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white dark:bg-slate-900 dark:text-white"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {tLogin("passwordLabel")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {tLogin("loginButton")}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold text-slate-500 hover:text-blue-500 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
