import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import LandingPage from "@/app/features/landing-page/components/LandingPage";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`

  return (
    <>
      <LandingPage />
    </>
  );
}
