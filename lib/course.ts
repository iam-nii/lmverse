import { courseContext } from "@/types/courseContent/types";

export type CourseResource = {
  name: string;
  type: "pdf" | "video" | "link";
  meta: string;
};

export type CourseSummary = {
  totalModules: number;
  totalLessons: number;
  estimatedDuration: string;
  resources: CourseResource[];
};

/** Average minutes we assume per lesson when the source data has no duration. */
const MINUTES_PER_LESSON = 9;

function resolveResource(file: string): CourseResource {
  const clean = file.split(/[?#]/)[0];
  const name = decodeURIComponent(clean.split("/").pop() || file);
  const ext = (name.split(".").pop() || "").toLowerCase();

  if (ext === "pdf") {
    return { name, type: "pdf", meta: "PDF" };
  }
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(ext)) {
    return { name, type: "video", meta: ext.toUpperCase() };
  }
  return {
    name: name || file,
    type: "link",
    meta: ext ? ext.toUpperCase() : "Link",
  };
}

/** Turns a raw courseContext into the derived stats the review UI needs. */
export function summarizeCourse(course: courseContext): CourseSummary {
  const modules = course.course_modules ?? [];
  const lessons = modules.flatMap((m) => m.lessons ?? []);

  const resources = lessons
    .flatMap((lesson) => lesson.files ?? [])
    .filter(Boolean)
    .map(resolveResource);

  const totalMinutes = lessons.length * MINUTES_PER_LESSON;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const estimatedDuration =
    totalMinutes === 0
      ? "—"
      : hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes}m`;

  return {
    totalModules: modules.length,
    totalLessons: lessons.length,
    estimatedDuration,
    resources,
  };
}

/** Formats course_price into a human label. */
export function formatPrice(price: number): string {
  if (!price || price <= 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

/**
 * Resolves the thumbnail. course_file_key may be a full URL, an absolute
 * path, or a storage key — fall back to a local asset when it's just a key.
 */
export function resolveThumbnail(fileKey: string): string {
  if (!fileKey) return "/course-thumbnail.png";
  if (/^(https?:)?\/\//.test(fileKey) || fileKey.startsWith("/")) {
    return fileKey;
  }
  return "/course-thumbnail.png";
}
