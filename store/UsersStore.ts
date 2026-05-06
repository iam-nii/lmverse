import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

interface IuserStore {
  users: users;
  loading: boolean;
  error: string | null;
  setusers: (users: users) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchusers: () => Promise<users>;
  approveuser: (userId: string) => Promise<void>;
  rejectuser: (userId: string) => Promise<void>;
  updateuserStatus: (userId: string, status: string) => Promise<void>;
  getPendingusers: () => Iuser[];
  getApprovedusers: () => Iuser[];
}

export const useuserStore = create<IuserStore>((set, get) => ({
  users: { users: [] },
  loading: false,
  error: null,

  setusers: (users: users) => set({ users }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchusers: async () => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      // const { data, error } = await supabase
      //   .from("users")
      //   .select("*")
      //   .eq("role", "tutor")
      //   .order("created_at", { ascending: false });

      const { data, error } = await supabase.from("users").select(`*`);
      console.log(data);

      if (error) throw error;
      console.log("users fetched", data);

      const transformedusers = (data as any[]).map((item) => ({
        id: item.user_id,
        about: item.about,
        email: item.users.email,
        full_name: item.users.full_name,
        phone_number: item.users.phone_number || "",
        role: item.users.role,
        status: item.users.status,
        profile_picture: item.users.avatar || "",
        created_at: item.users.created_at,
        updated_at: item.users.updated_at,
      }));

      const usersData: users = {
        users: transformedusers,
      };

      set({
        users: usersData,
        loading: false,
      });

      return usersData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tutors";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  approveuser: async (userId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("users")
        .update({
          status: "approved",
          is_approved: true,
        })
        .eq("id", userId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("role", "user");

      if (updateError) throw updateError;

      // Update local state
      const currentusers = get().users.users;
      const updatedusers = currentusers.map((user) =>
        user.id === userId
          ? { ...user, status: "approved", is_approved: true }
          : user
      );

      set({
        users: { users: updatedusers },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to approve tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  rejectuser: async (userId: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("users")
        .update({
          status: "rejected",
          is_approved: false,
        })
        .eq("id", userId);

      if (error) throw error;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Update local state
      const currentusers = get().users.users;
      const updatedusers = currentusers.map((user) =>
        user.id === userId
          ? { ...user, status: "rejected", is_approved: false }
          : user
      );

      set({
        users: { users: updatedusers },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to reject tutor";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateuserStatus: async (userId: string, status: string) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const isApproved = status === "approved";

      const { error } = await supabase
        .from("users")
        .update({
          status,
          is_approved: isApproved,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      const currentusers = get().users.users;
      const updatedusers = currentusers.map((user) =>
        user.id === userId ? { ...user, status, is_approved: isApproved } : user
      );

      set({
        users: { users: updatedusers },
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

  getPendingusers: () => {
    return get().users.users.filter((user) => user.status === "pending");
  },

  getApprovedusers: () => {
    return get().users.users.filter((user) => user.status === "approved");
  },
}));
