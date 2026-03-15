import { create } from "zustand";
import { AuthState } from "@/types/types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  role: null,

  //  Actions
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setRole: (role) => set({ role }),
  logout: () =>
    set({
      user: null,
      session: null,
      role: null,
      loading: false,
      error: null,
    }),
}));
