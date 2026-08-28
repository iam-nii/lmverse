import { courseContext } from "@/types/courseContent/types";

export async function createCourse(course: courseContext) {
  const response = await fetch("/api/upload-course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Failed to Create course");
  }
  const result = await response.json();
  return result;
}
