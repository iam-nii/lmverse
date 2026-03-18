import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { IStudent, Students } from "@/types/types";

interface IStudentStore {
  students: Students;
  loading: boolean;
  error: string | null;
  setStudents: (students: Students) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchStudents: () => Promise<Students>;
  approveStudent: (studentId: string) => Promise<void>;
  rejectStudent: (studentId: string) => Promise<void>;
  updateStudentStatus: (studentId: string, status: string) => Promise<void>;
  getPendingStudents: () => IStudent[];
  getApprovedStudents: () => IStudent[];
}

export const useStudentStore = create<IStudentStore>((set, get) => ({
  students: { students: [] },
  loading: false,
  error: null,

  setStudents: (students: Students) => set({ students }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchStudents: async () => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      // const { data, error } = await supabase
      //   .from("users")
      //   .select("*")
      //   .eq("role", "tutor")
      //   .order("created_at", { ascending: false });

      const {data, error} = await supabase
      .from("students")
      .select(`*,
        users(
        email,
        full_name,
        phone_number,
        role,
        status,
        created_at,
        avatar,
        updated_at
        )`)

      if (error) throw error;

      const transformedStudents = (data as any[]).map(item => ({
        id: item.user_id,
        about: item.about,
        email: item.users.email,
        full_name: item.users.full_name,
        phone_number: item.users.phone_number || '',
        role: item.users.role,
        status: item.users.status,
        profile_picture: item.users.avatar || '',
        created_at: item.users.created_at,
        updated_at: item.users.updated_at
        }));

      const studentsData: Students = {
        students: transformedStudents,
      };

      set({
        students: studentsData,
        loading: false,
      });

      return studentsData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tutors";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  approveStudent: async (studentId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("students")
        .update({
          status: "approved",
          is_approved: true,
        })
        .eq("id", studentId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", studentId)
        .eq("role", "student");

      if (updateError) throw updateError;

      // Update local state
      const currentStudents = get().students.students;
      const updatedStudents = currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, status: "approved", is_approved: true }
          : student
      );

      set({
        students: { students: updatedStudents },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to approve tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  rejectStudent: async (studentId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("students")
        .update({
          status: "rejected",
          is_approved: false,
        })
        .eq("id", studentId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", studentId)

      if (updateError) throw updateError;

      // Update local state
      const currentStudents = get().students.students;
      const updatedStudents = currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, status: "rejected", is_approved: false }
          : student
      );

      set({
        students: { students: updatedStudents },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to reject tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateStudentStatus: async (studentId: string, status: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const isApproved = status === "approved";

      const { error } = await supabase
        .from("students")
        .update({
          status,
          is_approved: isApproved,
          updated_at: new Date().toISOString(),
        })
        .eq("id", studentId);

      if (error) throw error;

      // Update local state
      const currentStudents = get().students.students;
      const updatedStudents = currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, status, is_approved: isApproved }
          : student
      );

      set({
        students: { students: updatedStudents },
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

  getPendingStudents: () => {
    return get().students.students.filter((student) => student.status === "pending");
  },

  getApprovedStudents: () => {
    return get().students.students.filter((student) => student.status === "approved");
  },
}));
