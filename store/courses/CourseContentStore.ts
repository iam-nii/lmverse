import { CourseContent } from "@/types/courseContent/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useCourseContentStore = create<CourseContent>()(
  persist(
    (set) => ({
      modules: [],
      lessons: [],
      isLoading: false,
      setModules: (modules) =>
        set(() => ({
          modules: modules.map((module, index) => ({
            ...module,
            order: index,
          })),
        })),
      addModule: (newtitle, newId) =>
        set((state) => ({
          modules: [
            ...state.modules,
            {
              id: newId,
              title: newtitle,
              order: state.modules.length + 1,
              lessons: [],
            },
          ],
        })),
      updateModule: (module_id, module_title) =>
        set((state) => ({
          modules: state.modules.map((module) =>
            module.id === module_id
              ? { ...module, title: module_title }
              : module
          ),
        })),
      addLesson: (lesson) =>
        set((state) => ({ lessons: [...state.lessons, lesson] })),
      addLessonToModule: (module_id, lesson_id) =>
        set((state) => ({
          modules: state.modules.map((module) => {
            if (module.id == module_id) return module;
            if (module.lessons?.includes(lesson_id)) return module;
            return {
              ...module,
              lessons: [...(module.lessons || []), lesson_id],
            };
          }),
        })),
      removeModules: () => {
        localStorage.removeItem("course-content-storage");
      },
    }),
    {
      name: "course-content-storage",
    }
  )
);
