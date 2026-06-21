"use client";
import { useCourses } from "@/hooks/use-courses";
import CourseCard from "./CourseCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CoursesGrid() {
  const { data: courses, isLoading, isError, error } = useCourses();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="w-full max-w-xs">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}

export default CoursesGrid;
