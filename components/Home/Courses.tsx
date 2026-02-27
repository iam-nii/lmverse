"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GeneralEnglish,
  BusinessEnglish,
  TechnicalEnglish,
  InternationalExams,
  RussianExams,
} from "@/constants/images";
import Image from "next/image";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const courses = [
  { id: 1, title: "General English", description: "40 Instructors", image: GeneralEnglish },
  { id: 2, title: "Business English", description: "10 Instructors", image: BusinessEnglish },
  { id: 3, title: "Technical English", description: "20 Instructors", image: TechnicalEnglish },
  { id: 4, title: "International Exams", description: "IELTS, TOEFL, FCE", image: InternationalExams },
  { id: 5, title: "Russian Exams", description: "2 Instructors", image: RussianExams },
];

function CourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col items-center py-5 px-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden group">
        <Image
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <p className="font-semibold text-sm text-center">{course.title}</p>
      <p className="text-xs text-muted-foreground text-center mt-1">
        {course.description}
      </p>
    </motion.div>
  );
}

function Courses() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <CourseCard course={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.div>
  );
}

export default Courses;
