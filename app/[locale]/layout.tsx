import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";
export { generateStaticParams } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { ltSuperior } from "@/constants/fonts";
import type { Metadata } from "next";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LmVerse",
  description:
    "LmVerse is a platform for learning and turoring international languages",
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <div
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${locale === "ru" ? ltSuperior.className : inter.className}`}
      suppressHydrationWarning
    >
      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </div>
  );
};

export default LocaleLayout;
