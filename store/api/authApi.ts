import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useAuthStore, AppRole } from '../useAuthStore';

// ── Types ──────────────────────────────────────────────────────────────────
export type SignUpOptions = {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role?: 'student' | 'tutor';
};

// ── Sign In ────────────────────────────────────────────────────────────────
export async function signInWithEmail(email: string, password: string) {
    const supabase = createSupabaseBrowserClient();
    const { setLoading, setError, setUser, setSession, logout } = useAuthStore.getState();

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
        setError(error?.message ?? 'Login failed. Please try again.');
        setLoading(false);
        return { error: error?.message ?? 'Login failed.' };
    }

    // Fetch profile from public.users
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role, status')
        .eq('id', data.user.id)
        .single();

    if (profileError || !profile) {
        // Profile missing — use defaults
        setSession(data.session);
        setUser(data.user, 'student');
        setLoading(false);
        return { error: null, role: 'student' as AppRole };
    }

    // Guard: pending tutors cannot log in
    if (profile.role === 'tutor' && profile.status === 'pending') {
        await supabase.auth.signOut();
        logout();
        setLoading(false);
        const pendingError = 'Your account is pending admin approval. You will be notified once approved.';
        setError(pendingError);
        return { error: pendingError };
    }

    setSession(data.session);
    setUser(data.user, profile.role as AppRole);
    setLoading(false);
    return { error: null, role: profile.role as AppRole };
}

// ── Sign Up ────────────────────────────────────────────────────────────────
export async function signUpWithEmail({ email, password, fullName, phone, role = 'student' }: SignUpOptions) {
    const supabase = createSupabaseBrowserClient();
    const { setLoading, setError } = useAuthStore.getState();

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone ?? '',
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
        redirectTo: `${window.location.origin}/password-reset`,
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        const { setSession, setUser, setLoading, logout } = useAuthStore.getState();

        setLoading(true);
        setSession(session);

        if (session?.user) {
            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', session.user.id)
                .single();

            if (!error && data) {
                setUser(session.user, data.role as AppRole);
            } else {
                setUser(session.user, 'student');
            }
        } else {
            logout();
        }

        setLoading(false);
    });

    return subscription;
};
