import GetImage from "@/components/course/GetImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ICourse } from "@/types/types";

type CourseCardType = {
  course: ICourse;
};

function CourseCard(course: CourseCardType) {
  console.log(course);

  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <GetImage
          course_title={course.course.title!}
          course_file_key={course.course.file_key!}
        />
        <CardHeader className="pt-0">
          <CardAction>
            <Badge variant="secondary">{course.course.status}</Badge>
          </CardAction>
          <CardTitle>{course.course.title}</CardTitle>
          <CardDescription>{course.course.small_description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">View Course</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CourseCard;
