"use server"
import { createClient } from "@/lib/supabase/server";
import { AppRole } from "@/types/types";

export async function updateUserRoleAction(userRole:AppRole, userId:string) {
  const supabase = await createClient();
  try {
     const { data, error } = await supabase.auth.admin.updateUserById(userId,{
      app_metadata: {role:userRole},      
     })
    if(error) throw error;

    return {success: true, user: data.user}
  } catch(error) {
    console.error("Failed to update user role",error);
    return {success:false, error:error}
  }
}
