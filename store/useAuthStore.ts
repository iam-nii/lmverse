import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Session, User } from '@supabase/supabase-js';

// Based on Phase 1 Data Schema in gemini.md
export type AppRole = 'admin' | 'student' | 'tutor';

interface AuthState {
    session: Session | null;
    user: User | null;
    role: AppRole | null;
    isLoading: boolean;
    error: string | null;
    setSession: (session: Session | null) => void;
    setUser: (user: User | null, role?: AppRole) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            session: null,
            user: null,
            role: null,
            isLoading: true, // Init to true so we can wait for initial auth check
            error: null,
            setSession: (session) => set({ session }),
            setUser: (user, role = 'student') => set({ user, role }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            logout: () => set({ session: null, user: null, role: null, error: null }),
        }),
        {
            name: 'lmverse-auth-storage', // unique name for localStorage
            storage: createJSONStorage(() => localStorage),
            // We purposefully only persist session/role if required, but Supabase SDK handles session natively.
            // Persisting role/user helps avoid UI flickering on standard reloads.
            partialize: (state) => ({ role: state.role, user: state.user }),
        }
    )
);
