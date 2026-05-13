"use server";
console.log("✅ actions.ts loaded");

import { createClient } from "@/lib/supabase/server";
import { AppRole } from "@/types/types";

export async function updateUserRoleAction(userRole: AppRole, userId: string) {
  console.log("Updating user row...", userRole);
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { role: userRole },
    });

    if (error) throw error;
    console.log("User role updated successfully. New role:", userRole);
    return { success: true, user: data.user };
  } catch (error) {
    console.error("Failed to update user role", error);
    return { success: false, error: error };
  }
}

export async function testAction() {
  console.log("🔵 TEST ACTION CALLED");
  return { test: true };
}
