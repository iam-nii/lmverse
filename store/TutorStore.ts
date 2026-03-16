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
      // const { data, error } = await supabase
      //   .from("users")
      //   .select("*")
      //   .eq("role", "tutor")
      //   .order("created_at", { ascending: false });

      const { data, error } = await supabase.from("tutors").select(
        `*,
        users ( 
        email,
      full_name,
      phone_number,
      role,
      status,
      created_at,
      updated_at)`
      );
      if (error) throw error;

      // Transform the nested data into flat Tutor objects
      const transformedTutors: Tutor[] = data.map((item) => ({
        id: item.user_id, // or item.id if you want the tutor ID
        about: item.about,
        experience: item.experience_years?.toString() || "", // Map experience_years to experience
        is_approved: item.is_approved,
        email: item.users.email,
        full_name: item.users.full_name,
        phone_number: item.users.phone_number || "",
        role: item.users.role,
        status: item.users.status,
        profile_picture: "", // You might need to add this to users table or set a default
        created_at: item.users.created_at,
        updated_at: item.users.updated_at,
      }));

      const tutorsData: Tutors = {
        tutors: transformedTutors,
      };

      console.log(tutorsData);

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
