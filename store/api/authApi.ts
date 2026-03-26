import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/AuthStore";
import { AppRole } from "@/types/types";
import { withRateLimit } from "@universal-rate-limit/nextjs";

// ── Types ──────────────────────────────────────────────────────────────────
export type SignUpOptions = {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: "student" | "tutor";
};

// ── Sign In ────────────────────────────────────────────────────────────────
export async function signInWithEmail(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();
  const { setLoading, setError, setSession, setRole } = useAuthStore.getState();

  try {
    setLoading(true);
    setError(null);
    console.log("[AuthAPI] Initiating signInWithPassword for:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(
      "[AuthAPI] signInWithPassword finished. Error:",
      error?.message || "None"
    );

    if (error || !data.session) {
      setError(error?.message ?? "Login failed. Please try again.");
      setLoading(false);
      return { error: error?.message ?? "Login failed." };
    }

    console.log("[AuthAPI] Fetching profile from 'users' table...");

    // Fetch profile from public.users
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role, status")
      .eq("id", data.user.id)
      .single();

    console.log(
      "[AuthAPI] Profile fetch finished. Found:",
      !!profile,
      "Error:",
      profileError?.message || "None"
    );

    if (profileError || !profile) {
      console.warn(
        "[AuthAPI] Profile fetch failed or empty. Falling back to student."
      );
      setSession(data.session);
      setLoading(false);
      return { error: null, role: "student" as AppRole };
    }

    // Guard: pending tutors cannot log in
    // if (profile.role === "tutor" && profile.status === "pending") {
    //   console.warn("[AuthAPI] Pending tutor blocked.");
    //   await supabase.auth.signOut();
    //   logout();
    //   setLoading(false);
    //   const pendingError =
    //     "Your account is pending admin approval. You will be notified once approved.";
    //   setError(pendingError);
    //   return { error: pendingError };
    // }

    console.log("[AuthAPI] Login sequence complete. Role:", profile.role);
    setSession(data.session);
    setRole(profile.role as AppRole);
    setLoading(false);
    return { error: null, role: profile.role as AppRole };
  } catch (error: unknown) {
    console.error("[AuthAPI] CRITICAL ERROR in signInWithEmail:", error);
    setError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
    setLoading(false);
    return {
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

// ── Sign Up ────────────────────────────────────────────────────────────────
export async function signUpWithEmail({
  email,
  password,
  fullName,
  phone,
  role = "student",
}: SignUpOptions) {
  const supabase = createSupabaseBrowserClient();
  const { setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  setError(null);
  console.log(role);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      data: {
        full_name: fullName,
        phone: phone ?? "",
        role,
      },
    },
  });

  setLoading(false);

  if (error) {
    setError(error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── Forgot Password ────────────────────────────────────────────────────────
export async function sendPasswordResetEmail(email: string) {
  const supabase = createSupabaseBrowserClient();
  const { setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  setError(null);

  // The reset link will land on /password-reset (Supabase appends tokens automatically)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/api/auth/callback?next=/password-reset`,
  });

  setLoading(false);

  if (error) {
    setError(error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── Update Password (from reset link) ─────────────────────────────────────
export async function updatePassword(newPassword: string) {
  const supabase = createSupabaseBrowserClient();
  const { setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  setError(null);

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  setLoading(false);

  if (error) {
    setError(error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── Sign Out ───────────────────────────────────────────────────────────────
export async function signOut() {
  const supabase = createSupabaseBrowserClient();
  useAuthStore.getState().setLoading(true);
  await supabase.auth.signOut();
  useAuthStore.getState().logout();
  useAuthStore.getState().setLoading(false);
}

// ── Auth State Listener (call once at app root) ───────────────────────────
export const setupAuthListener = () => {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event: string, session) => {
    const { setSession, setLoading, logout, setRole } = useAuthStore.getState();

    setLoading(true);
    setSession(session);

    if (session?.user) {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setRole(data.role as AppRole);
      } else {
        setRole("pending" as AppRole);
      }
    } else {
      logout();
    }

    setLoading(false);
  });

  return subscription;
};
