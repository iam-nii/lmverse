import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { AppRole, IUser, Users } from "@/types/types";
import { updateUserRoleAction } from "@/app/api/admin/actions";


interface IUserStore {
  users: Users;
  loading: boolean;
  error: string | null;
  setusers: (users: Users) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUsers: () => Promise<Users>;
  updateUserRole: (userId: string, newRole: AppRole) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateUserStatus: (userId: string, status: IUser["status"]) => Promise<void>;
  getPendingusers: () => IUser[];
  getApprovedusers: () => IUser[];
  getUsersByRole: (role: AppRole) => IUser[];
  getDeletedUsers: () => IUser[];
}

export const useUserStore = create<IUserStore>((set, get) => ({
  users: { users: [] },
  loading: false,
  error: null,

  setusers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchUsers: async () => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      console.log(data);

      if (error) throw error;
      console.log("users fetched", data);

      const users: Users = {
        users: (data || []).map((user) => ({
          ...user,
          created_at: new Date(user.created_at),
          updated_at: new Date(user.updated_at),
          role: user.role as AppRole,
        })),
      };

      set({ users, loading: false });

      return users;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tutors";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateUserRole: async (userId: string, newRole: AppRole) => {
    set({ loading: true, error: null });

    try {
      //1. Update the public.user table
      // const { error: publicError } = await supabase
      //   .from("users")
      //   .update({ role: newRole, updated_at: new Date().toISOString() })
      //   .eq("id", userId);

      // if (publicError) throw publicError;

      //2. Update auth.users metadata via admin actions
      // const { error: authError } = await supabase.auth.admin.updateUserById(
      //   userId,
      //   {
      //     user_metadata: { role: newRole },
      //   }
      // );
      const response = await updateUserRoleAction(newRole,userId)
      if (response.error) throw response.error;

      //3. Update local state
      const currentUsers = get().users;
      const updatedUsers = currentUsers.users.map((user) =>
        user.id === userId
          ? { ...user, role: newRole, updated_at: new Date() }
          : user
      );
      set({ users: { users: updatedUsers }, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user role";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteUser: async (userId: string) => {
    await get().updateUserStatus(userId, "deleted");
  },

  updateUserStatus: async (userId: string, status: IUser["status"]) => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      // const isApproved = status === "approved";

      const { error } = await supabase
        .from("users")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      const currentusers = get().users;
      const updatedusers = currentusers.users.map((user) =>
        user.id === userId ? { ...user, status, updated_at: new Date() } : user
      );

      set({
        users: { users: updatedusers },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user status";
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

  getUsersByRole: (role: AppRole) => {
    return get().users.users.filter((user) => user.role === role);
  },

  getDeletedUsers: () => {
    return get().users.users.filter((user) => user.status === "deleted");
  },
}));
