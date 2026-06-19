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
    lessons?: Lesson[] | []
}

interface ModuleLessonState {
    modules: Module[];
    isLoading: boolean;
    addModule:(title: string) => void;
    addLessonToModule: (module_id:number, lesson_id: number) => void;
}