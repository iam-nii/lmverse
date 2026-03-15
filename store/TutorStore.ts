import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { Tutor, Tutors } from "@/types/types";

interface TutorStore {
  tutors: Tutors;
  loading: boolean;
  error: string | null;
  setTutors: (tutors: Tutors) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchTutors: () => Promise<Tutors>;
  approveTutor: (tutorId: string) => Promise<void>;
  rejectTutor: (tutorId: string) => Promise<void>;
  updateTutorStatus: (tutorId: string, status: string) => Promise<void>;
  getPendingTutors: () => Tutor[];
  getApprovedTutors: () => Tutor[];
}

export const useTutorStore = create<TutorStore>((set, get) => ({
  tutors: { tutors: [] },
  loading: false,
  error: null,

  setTutors: (tutors: Tutors) => set({ tutors }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchTutors: async () => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "tutor")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const tutorsData: Tutors = {
        tutors: (data as Tutor[]) || [],
      };

      set({
        tutors: tutorsData,
        loading: false,
      });

      return tutorsData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tutors";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  approveTutor: async (tutorId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("tutors")
        .update({
          status: "approved",
          is_approved: true,
        })
        .eq("id", tutorId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", tutorId)
        .eq("role", "tutor");

      if (updateError) throw updateError;

      // Update local state
      const currentTutors = get().tutors.tutors;
      const updatedTutors = currentTutors.map((tutor) =>
        tutor.id === tutorId
          ? { ...tutor, status: "approved", is_approved: true }
          : tutor
      );

      set({
        tutors: { tutors: updatedTutors },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to approve tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  rejectTutor: async (tutorId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("tutors")
        .update({
          status: "rejected",
          is_approved: false,
        })
        .eq("id", tutorId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", tutorId)
        .eq("role", "tutor");

      if (updateError) throw updateError;

      // Update local state
      const currentTutors = get().tutors.tutors;
      const updatedTutors = currentTutors.map((tutor) =>
        tutor.id === tutorId
          ? { ...tutor, status: "rejected", is_approved: false }
          : tutor
      );

      set({
        tutors: { tutors: updatedTutors },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to reject tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateTutorStatus: async (tutorId: string, status: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const isApproved = status === "approved";

      const { error } = await supabase
        .from("tutors")
        .update({
          status,
          is_approved: isApproved,
          updated_at: new Date().toISOString(),
        })
        .eq("id", tutorId);

      if (error) throw error;

      // Update local state
      const currentTutors = get().tutors.tutors;
      const updatedTutors = currentTutors.map((tutor) =>
        tutor.id === tutorId
          ? { ...tutor, status, is_approved: isApproved }
          : tutor
      );

      set({
        tutors: { tutors: updatedTutors },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update tutor status";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  getPendingTutors: () => {
    return get().tutors.tutors.filter((tutor) => tutor.status === "pending");
  },

  getApprovedTutors: () => {
    return get().tutors.tutors.filter((tutor) => tutor.status === "approved");
  },
}));
