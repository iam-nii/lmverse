import { supabase } from './supabaseClient';
import { useAuthStore, AppRole } from '../useAuthStore';

// Initialize session listener once
export const initAuthListener = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
        const setSession = useAuthStore.getState().setSession;
        const setUser = useAuthStore.getState().setUser;
        const setLoading = useAuthStore.getState().setLoading;

        setLoading(true);
        setSession(session);

        if (session?.user) {
            // Fetch role from profile table/metadata
            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', session.user.id)
                .single();

            if (!error && data) {
                setUser(session.user, data.role as AppRole);
            } else {
                // Fallback default
                setUser(session.user, 'student');
            }
        } else {
            useAuthStore.getState().logout();
        }

        setLoading(false);
    });
};
