"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  OnlineCourses,
  ExpertTutors,
  CertifiedCourses,
  DailyLiveSessions,
} from "@/constants/images";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Card from "../Card";

const features = [
  {
    title: "Online Courses",
    number: "10",
    icon: OnlineCourses,
  },
  {
    title: "Expert Tutors",
    number: "5+",
    icon: ExpertTutors,
  },
  {
    title: "Certified Courses",
    number: "5+",
    icon: CertifiedCourses,
  },
  {
    title: "Daily live Sessions",
    number: "5+",
    icon: DailyLiveSessions,
  },
];

export default function Features() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <div className="p-5 w-full md:hidden">
        <Carousel
          plugins={[plugin.current]}
          className="sm:max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/4 p-2">
                <Card
                  icon={feature.icon}
                  title={feature.number}
                  description={feature.title}
                  descriptionStyle="uppercase"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="hidden md:grid grid-cols-4 gap-4 ">
        {features.map((feature, index) => (
          <div key={index} className="basis-1/2 md:basis-1/4 ">
            <div
              className="bg-white p-1 flex flex-col 
              rounded-lg border-[1px] border-gray-200 py-4 px-5 shadow-md
              items-center justify-center"
            >
              <Image src={feature.icon} alt={feature.title} />
              <p className="text-lg font-bold">{feature.number}</p>
              <h3 className="text-sm text-gray-500 uppercase">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
