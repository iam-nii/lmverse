import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Module, Lesson, courseContext } from "@/types/courseContent/types";

const initialCourse = (): Partial<courseContext> => ({
  course_id: uuidv4(),
  course_modules: [],
});
interface CourseContentStore {
  // Course
  course: Partial<courseContext>;
  updateCourse: (data: Partial<courseContext>) => void;

  // Modules
  addModule: (title: string) => void;
  reorderModules: (modules: Module[]) => void;
  updateModule: (moduleId: string, data: Partial<Module>) => void;
  removeModule: (moduleId: string) => void;

  // Lessons
  addLesson: (moduleId: string, lesson: Lesson) => void;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    data: Partial<Lesson>
  ) => void;
  removeLesson: (moduleId: string, lessonId: string) => void;

  reset: () => void;
}

export const useCourseContentStore = create<CourseContentStore>()(
  persist(
    (set) => ({
      course: initialCourse(),
      updateCourse: (data) =>
        set((state) => ({
          course: {
            ...state.course,
            ...data,
          },
        })),
      addModule: (title) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules: [
              ...(state.course.course_modules ?? []),
              {
                id: uuidv4(),
                title,
                order: (state.course.course_modules?.length ?? 0) + 1,
                lessons: [],
              },
            ],
          },
        })),
      reorderModules: (modules: Module[]) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules: modules.map((module, index) => ({
              ...module,
              order: index + 1,
            })),
          },
        })),
      updateModule: (moduleId, data) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules:
              state.course.course_modules?.map((module) =>
                module.id === moduleId ? { ...module, ...data } : module
              ) ?? [],
          },
        })),
      removeModule: (moduleId) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules: state.course.course_modules?.filter(
              (module) => module.id !== moduleId
            ),
          },
        })),
      addLesson: (moduleId, lesson) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules:
              state.course.course_modules?.map((module) =>
                module.id === moduleId
                  ? {
                      ...module,
                      lessons: [...module.lessons, lesson],
                    }
                  : module
              ) ?? [],
          },
        })),
      updateLesson: (moduleId, lessonId, data) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules: state.course.course_modules?.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    lessons: module.lessons.map((lesson) =>
                      lesson.id === lessonId
                        ? {
                            ...lesson,
                            ...data,
                          }
                        : lesson
                    ),
                  }
                : module ?? []
            ),
          },
        })),
      removeLesson: (moduleId, lessonId) =>
        set((state) => ({
          course: {
            ...state.course,
            course_modules: state.course.course_modules?.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    lessons: module.lessons.filter(
                      (lesson) => lesson.id !== lessonId
                    ),
                  }
                : module ?? []
            ),
          },
        })),
      reset: () =>
        set({
          course: {
            course_modules: [],
          },
        }),
    }),
    {
      name: "course-content-storage",
    }
  )
);
