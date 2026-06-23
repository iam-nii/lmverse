export interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  video_share_url: string;
  content: string;
  files: string[];
  order: number;
  module_id: number;
}
export interface Module {
  id: string;
  order: number;
  title: string;
  lessons: Lesson[];
}
export interface courseContext {
  course_id: string;
  course_title: string;
  course_slug: string;
  course_short_description: string;
  course_description: string;
  course_file_key: string;
  course_price: number;
  course_level: string;
  course_status: string;
  course_modules: Module[]
}
export const levels = [
  "Starter",
  "Elementary",
  "Intermediate",
  "Upper Intermediate",
  "Advanced",
  "Advanced C2",
];
export interface Course {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  price: number;
  level: string;
  smallDescription: string;
  slug: string;
  status: string;
  modules: Module[]
}
export const courseStatus = ["draft", "published", "archived"];

export interface CourseContent {
  modules: Module[] | [];
  setModules: (modules: Module[]) => void;
  lessons: Lesson[] | [];
  isLoading: boolean;
  addModule: (title: string, id: number) => void;
  addLesson: (lesson: Lesson) => void;
  updateModule: (id: number, title: string) => void;
  addLessonToModule: (module_id: number, lesson_id: string) => void;
  removeModules: () => void;
}