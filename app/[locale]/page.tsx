import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { background } from "@/constants/images";
import HomePage from "./Home";

export default function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`


  return (

    <>
      {/* Background SVG only covers the hero viewport */}
      <div className="absolute top-0 left-0 w-full h-screen -z-10 pointer-events-none">
        <Image
          src={background}
          alt=""
          aria-hidden
          className="opacity-50 object-cover w-full h-full"
        />
      </div>
      <Navbar />
      <HomePage />
      {/* <p>{locale}</p> */}
    </>
  );
};

