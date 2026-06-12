"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/lib/api/courses";
import { queryKeys } from "@/lib/query-keys";

export function useCourses() {
  return useQuery({
    queryKey: queryKeys.courses.lists(),
    queryFn: fetchCourses,
    staleTime: 1000 * 60, // data stays fresh for 60s
    refetchOnWindowFocus: true, // refetch when user returns to tab
    select: (response) => response.data, // unwrap the courses array directly
  });
}
