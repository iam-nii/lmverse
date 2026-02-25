import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { background } from "@/constants/images";
import HomePage from "./Home";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <div className="relative h-screen">
          <Navbar />
          <HomePage />
          <Image
            src={background}
            alt="background"
            className="opacity-50 object-cover absolute top-0 left-0 w-full h-full z-[-1]"
          />
        </div>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
