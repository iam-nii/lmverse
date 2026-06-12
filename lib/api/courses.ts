import { ICourse } from "@/types/types";

type CoursesResponse = {
  success: boolean;
  error: boolean;
  data: ICourse[];
};

export async function fetchCourses(): Promise<CoursesResponse> {
  const res = await fetch("/api/get-courses", {
    // Next.js cache: revalidate every 60s on the server, always fresh on client
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "Failed to fetch courses");
  }

  return res.json();
}
export async function fetchCourseById(id: ICourse["id"]): Promise<ICourse> {
  const res = await fetch(`/api/get-courses/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "Failed to fetch course");
  }

  return res.json();
}
