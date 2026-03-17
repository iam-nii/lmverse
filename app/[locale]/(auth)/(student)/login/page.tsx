"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";
import { EyeToggleIcon } from "@/components/ui/animated-state-icons";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { userSignInType } from "@/types/userTypes";
import { signInWithEmail } from "@/store/api/authApi";
import {useAuthStore} from '@/store/AuthStore';

export default function Login() {
  const locale = useLocale();
  const t = useTranslations("auth.login");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useAuthStore();

  useEffect(()=>{
    if(user){
      
    }
  },[user])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const PAYLOAD: userSignInType = {
      email,
      password,
    };

    // console.log(PAYLOAD);

    const result = await signInWithEmail(PAYLOAD.email, PAYLOAD.password);
    if (result.error) {
      console.log(result.error);
      setError(result.error);
      setIsLoading(false);

      return;
    }
    // } else if (result.data) {
    //   const data = result.data.user.user_metadata;
    //   setIsLoading(false);

    //   // Redirect based on role
    //   switch (data.role) {
    //     case "admin":
    //       router.push(`/${locale}/dashboard/admin`);
    //       break;
    //     case "tutor":
    //       router.push(`/${locale}/dashboard/tutor`);
    //       break;
    //     default:
    //       router.push(`/${locale}/dashboard/student`);
    //   }
    // }
    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("subtitle")}
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
            {t("emailLabel")} <span className="text-red-500">*</span>
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
            {t("passwordLabel")} <span className="text-red-500">*</span>
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                rememberMe
                  ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                  : "border-slate-300 dark:border-slate-700 group-hover:border-blue-500"
              }`}
              onClick={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Check className="h-3.5 w-3.5 text-white" />}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("rememberMe")}
            </span>
          </label>
          <Link
            href={`/${locale}/forgot-password`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {t("loginButton")}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
        {t("noAccount")}{" "}
        <Link
          href={`/${locale}/signup`}
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all"
        >
          {t("signUpLink")}
        </Link>
      </p>
    </div>
  );
}
