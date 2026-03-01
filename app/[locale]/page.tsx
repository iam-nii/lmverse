import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { background } from "@/constants/images";
import HomePage from "./Home";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
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
    </IntlayerServerProvider>
  );
};

export default Page;
