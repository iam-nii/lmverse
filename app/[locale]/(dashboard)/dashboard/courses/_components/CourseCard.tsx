"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { ICourse } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CourseCardType = {
  course: ICourse;
};

function CourseCard(course: CourseCardType) {
  console.log(course);
  const [imageURL, setImageURL] = useState<string | null>(null);
  // Fetch the image from the s3 bucket and display it.
  // const imageURL = `${process.env.SELECTEL_S3_ENDPOINT}/${course.course.file_key}`;
  //TODO
  //1. Create a get route to fetch image links by providing the file key
  useEffect(() => {
    const getImageURL = async () => {
      const imageURLResponse = await fetch("/api/s3/get-image", {
        method: "POST",
        body: JSON.stringify({
          fileKey: course.course.file_key,
        }),
      });
      const data = await imageURLResponse.json();
      if (!data.success) {
        toast.error(data.error);
      }
      console.log(data);
      setImageURL(data.data);
    };
    getImageURL();
  }, []);

  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        {imageURL && (
          <div className="relative aspect-video w-full">
            <Image
              src={imageURL}
              alt={course.course.title!}
              fill
              className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
          </div>
        )}
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
