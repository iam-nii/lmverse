'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from "next-intl";
import { sendPasswordResetEmail } from '@/lib/auth/authApi';

export default function ForgotPassword() {
    const locale = useLocale();
    const t = useTranslations("auth.forgotPassword");

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const result = await sendPasswordResetEmail(email);

        setIsLoading(false);

        if (result?.error) {
            setError(result.error);
            return;
        }

        setSubmitted(true);
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500">
            {/* Title */}
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{t("title")}</h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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

            {/* Form */}
            {!submitted ? (
                <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {t("emailLabel")} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={t("emailPlaceholder")}
                                className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white dark:bg-slate-900 dark:text-white"
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {t("sendLinkButton")}
                    </button>
                </form>
            ) : (
                <div className="mt-8 p-6 bg-blue-50/50 dark:bg-slate-800 border border-blue-500/20 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t("checkInbox")}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {t("sentLinkText1")} <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>.
                        {" "}{t("sentLinkText2")}
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 mt-2"
                    >
                        {t("tryAnotherEmail")}
                    </button>
                </div>
            )}

            {/* Footer Link */}
            <div className="text-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center items-center gap-2">
                <span className="text-sm text-slate-500">{t("rememberedPassword")}</span>
                <Link href={`/${locale}/login`} className="text-sm font-bold text-blue-500 hover:text-blue-600">
                    {t("loginLink")}
                </Link>
            </div>

        </div>
    );
}
