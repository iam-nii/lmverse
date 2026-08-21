"use client"
// Syncing zustand with supabase
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { createClient } from "@/lib/supabase/client";

interface Props {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const setSession = useAuthStore((state) => state.setSession);

    useEffect(() => {
        const supabase = createClient();

        // Supabase isn't configured.
        // Don't crash the entire application.
        if (!supabase) {
            console.error(
                "[AuthProvider] Supabase is not configured"
            )
            setSession(null);
            return;
        }

        let mounted = true;
        async function getInitialSession() {
            try {
                const { data: { session }, error, } = await supabase!.auth.getSession();

                if (error) {
                    console.error(
                        "[AuthProvider] Failed to get session:",
                        error
                    );

                    return;
                }

                if (mounted) {
                    setSession(session);
                }

            } catch (error) {
                console.error(
                    "[AuthProvider] Unexpected session error:",
                    error
                );
            }
        }
        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setSession(session);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [setSession]);

    return children;
}