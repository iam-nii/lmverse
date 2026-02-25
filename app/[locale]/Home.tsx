import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";
import Image from "next/image";
import { Hero } from "@/constants/images";

import Features from "@/components/Home/Features";
import Courses from "@/components/Home/Courses";
import { Button } from "@/components/ui/button";

const Home: FC = () => {
  const content = useIntlayer("page");

  return (
    <section className="py-4">
      <div className=" md:px-40 px-5 grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className=" my-[4px] text-secondary max-sm:uppercase font-semibold">
            Speak English confidently in 3 months
          </h2>
          <h1 className="text-[32px] font-bold text-black leading-9 mb-[8px]">
            Engaging & Accessible
            <br />
            <span className="text-secondary"> Online Courses </span>
            For All
          </h1>
          <p className="text-gray-500 font-semibold">
            Our specialized online courses are designed to bring
            <br />
            the classroom experience to you, no matter
            <br />
            where you are.
          </p>
        </div>
        {/* right */}
        <div>
          <Image src={Hero} alt="hero" className="my-[32px]" />

          <Button className="bg-secondary text-white rounded-lg font-semibold w-full">
            Sign up for a free online trial session
          </Button>
        </div>
      </div>
      <Features />
      <div className="md:px-40 px-5 mt-[16px]">
        <h2 className="text-secondary uppercase font-bold text-sm">
          favourite courses
        </h2>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Top courses</h1>
          <Button
            variant="ghost"
            className="text-secondary bg-secondary/10 rounded-full font-semibold"
          >
            View all
          </Button>
        </div>
        <Courses />
      </div>
    </section>
  );
};

export default Home;
