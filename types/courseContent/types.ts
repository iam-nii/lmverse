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
  id: number;
  order: number;
  title: string;
  lessons?: Lesson[];
}
export interface courseContext {
  module_id: number;
  module_order: number;
  module_title: string;
  module_lessons?: Lesson[]; // lesson title?
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