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
import Card from "../Card";

const courses = [
  {
    id: 1,
    title: "General English",
    description: "5 Instrcutors",
    image: GeneralEnglish,
  },
  {
    id: 2,
    title: "Business English",
    description: "5 Instrcutors",
    image: BusinessEnglish,
  },
  {
    id: 3,
    title: "Technical English",
    description: "5 Instrcutors",
    image: TechnicalEnglish,
  },
  {
    id: 4,
    title: "International Exams",
    description: "2 Instrcutors",
    image: InternationalExams,
  },
  {
    id: 5,
    title: "Russian Exams",
    description: "2 Instrcutors",
    image: RussianExams,
  },
];

function Courses() {
  return (
    <div className="md:hidden mt-[16px]">
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            description={course.description}
            title={course.title}
            icon={course.image}
            titleStyle="text-md font-semibold text-center"
            descriptionStyle="text-sm text-gray-500"
            containerStyle={course?.id === 5 ? "col-span-2" : ""}
            // imageStyle="w-10 h-10"
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;
