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
import Image from "next/image";

type CourseCardType = {
  course: ICourse;
};

function CourseCard(course: CourseCardType) {
  console.log(course);
  // Fetch the image from the s3 bucket and display it.
  //TODO
  //1. Create a get route to fetch image links by providing the file key
  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <Image
          src={course!.course!.file_key!}
          alt={course!.course!.title!}
          width={10}
          height={10}
        />
        <CardHeader>
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
