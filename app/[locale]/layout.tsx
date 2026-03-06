import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { ltSuperior } from "@/constants/fonts";
import { AuthProvider } from "@/components/AuthProvider";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale, getMessages } from 'next-intl/server';




const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LmVerse",
  description:
    "LmVerse is a platform for learning and turoring international languages",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Basic RTL support based on locale
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <div
      lang={locale}
      dir={dir}
      className={`${locale === "ru" ? ltSuperior.className : inter.className}`}
      suppressHydrationWarning
    >
      <NextIntlClientProvider messages={messages}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NextIntlClientProvider>
    </div>
  );
}