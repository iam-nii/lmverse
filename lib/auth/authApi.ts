import { redirect } from "next/navigation";
import { createClient } from "../supabase/client";
import { userSignInType, userSignUpType } from "@/types/userTypes";
import { User } from "@supabase/supabase-js";

export async function SignupEmailPassword(PAYLOAD: userSignUpType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: PAYLOAD.email,
    password: PAYLOAD.password,
    options: {
      data: {
        full_name: PAYLOAD.full_name,
        role: PAYLOAD.role,
      },
    },
  });
  if (error) {
    return { error: error.message };
  }
}

export async function signInWithEmail(payload: userSignInType) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  if (error) {
    return { error: error.message };
  }
  return { data };
}

export async function SignOut() {
  const supabase = createClient();
  supabase.auth.signOut();
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient();

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/`,
  });
}

export async function updatePassword(password: string) {
  const supabase = createClient();

  await supabase.auth.updateUser({ password });
}
