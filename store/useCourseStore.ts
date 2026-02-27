import { create } from 'zustand';

// Types derived from gemini.md JSON Schema
export type CourseCategory = 'General' | 'Business' | 'Technical' | 'Exam Prep';

export interface Course {
    id: string;
    title: string;
    category: CourseCategory;
}

export interface Level {
    id: string;
    name: string;
    cefr_equivalent: string;
}

interface CourseState {
    courses: Course[];
    levels: Level[];
    isLoading: boolean;
    error: string | null;
    setCourses: (courses: Course[]) => void;
    setLevels: (levels: Level[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    levels: [],
    isLoading: false,
    error: null,
    setCourses: (courses) => set({ courses }),
    setLevels: (levels) => set({ levels }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
