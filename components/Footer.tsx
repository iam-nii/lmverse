"use client";

import Link from "next/link";
import Image from "next/image";
import { logo } from "@/constants/images";
import { soure_gummy } from "@/constants/fonts";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#1f3654] dark:bg-[#0f1a2e] text-white pt-16 pb-6">
            <div className="md:px-40 px-5">
                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Image src={logo} alt="logo" width={36} height={36} className="w-9 h-9" />
                            <span className={`text-xl font-bold text-white ${soure_gummy.className}`}>
                                {t("brand.name")}
                            </span>
                        </div>
                        {/* App store badges */}
                        <div className="flex flex-col gap-3">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors w-fit"
                            >
                                <span className="text-sm">🍎</span>
                                <div className="leading-tight">
                                    <p className="text-[9px] text-white/60">{t("download.appStore.text")}</p>
                                    <p className="text-xs font-semibold">{t("download.appStore.store")}</p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors w-fit"
                            >
                                <span className="text-sm">▶</span>
                                <div className="leading-tight">
                                    <p className="text-[9px] text-white/60">{t("download.googlePlay.text")}</p>
                                    <p className="text-xs font-semibold">{t("download.googlePlay.store")}</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Nav columns */}
                    <div>
                        <h4 className="font-semibold text-base mb-3">{t("sections.support.title")}</h4>
                        <div className="w-8 h-0.5 bg-secondary mb-4" aria-hidden />
                        <ul className="space-y-2">
                            {['0', '1', '2', '3', '4'].map((index) => (
                                <li key={index}>
                                    <Link
                                        href={`/${locale}`}
                                        className="text-white/70 text-sm hover:text-white transition-colors"
                                    >
                                        {t(`sections.support.links.${index}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base mb-3">{t("sections.about.title")}</h4>
                        <div className="w-8 h-0.5 bg-secondary mb-4" aria-hidden />
                        <ul className="space-y-2">
                            {['0', '1', '2', '3', '4'].map((index) => (
                                <li key={index}>
                                    <Link
                                        href={`/${locale}`}
                                        className="text-white/70 text-sm hover:text-white transition-colors"
                                    >
                                        {t(`sections.about.links.${index}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base mb-3">{t("sections.usefulLinks.title")}</h4>
                        <div className="w-8 h-0.5 bg-secondary mb-4" aria-hidden />
                        <ul className="space-y-2">
                            {['0', '1', '2', '3', '4'].map((index) => (
                                <li key={index}>
                                    <Link
                                        href={`/${locale}`}
                                        className="text-white/70 text-sm hover:text-white transition-colors"
                                    >
                                        {t(`sections.usefulLinks.links.${index}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-base mb-3">{t("sections.contactInfo.title")}</h4>
                        <div className="w-8 h-0.5 bg-secondary mb-4" aria-hidden />
                        <div className="space-y-4 text-sm text-white/70">
                            <div>
                                <p className="text-white font-semibold">{t("sections.contactInfo.phone.label")}</p>
                                <p>{t("sections.contactInfo.phone.value")}</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold">{t("sections.contactInfo.mail.label")}</p>
                                <p>{t("sections.contactInfo.mail.value")}</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold">{t("sections.contactInfo.address.label")}</p>
                                <p>{t("sections.contactInfo.address.value")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-sm">
                        {t("bottom.copyright")} {year} ©{" "}
                        <Link href={`/${locale}`} className="text-secondary hover:underline">
                            Lmverse
                        </Link>
                        {t("bottom.rights")}
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {["Facebook", "Instagram", "Behance", "LinkedIn", "X"].map(
                            (name) => (
                                <a
                                    key={name}
                                    href="#"
                                    aria-label={name}
                                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors text-xs font-bold"
                                >
                                    {name[0]}
                                </a>
                            )
                        )}
                    </div>

                    <div className="flex gap-4 text-sm text-white/50">
                        <Link href="#" className="hover:text-white transition-colors">
                            {t("bottom.terms")}
                        </Link>
                        <span>•</span>
                        <Link href="#" className="hover:text-white transition-colors">
                            {t("bottom.privacy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
