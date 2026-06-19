import {create} from "zustand";

interface Lesson{
    title: string,
    description: string,
    video_url: string,
    video_share_url: string,
    content: string,
    files: string[],
    order:number,
    module_id:number
}
interface Module{
    id: number,
    title: string,
    lessons?: string[]
}

interface CourseContent {
    modules: Module[] | [];
    lessons: Lesson[]| [];
    isLoading: boolean;
    addModule:(title: string, id: number) => void;
    // add lesson
    addLesson: (lesson: Lesson)=> void;
    updateModule: (id:number, title: string)=>void;
    addLessonToModule: (module_id:number, lesson_id: string) => void;
}

export const useCourseContentStore = create<CourseContent>((set,get)=>({
    modules: [],
    lessons: [],
    isLoading: false,
    addModule: (newtitle, newId) => set((state)=>({modules:[...state.modules, {id:newId,title:newtitle, lessons:[]}]})),
    updateModule: (module_id, module_title)=>set((state)=>({modules: state.modules.map((module)=>
    module.id === module_id ? {...module, title:module_title} : module
    )})),
    addLesson: (lesson) => set((state)=>({lessons: [...state.lessons,lesson]})),
    addLessonToModule: (module_id, lesson_id)=> set((state)=>({
        modules: 
        state.modules.map((module)=>{
            if (module.id == module_id) return module;
            if (module.lessons?.includes(lesson_id)) return module;
            return{
                ...module,
                lessons: [...(module.lessons || []), lesson_id]
            }
        })
    }))

}))