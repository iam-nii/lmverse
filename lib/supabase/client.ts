import { createBrowserClient } from '@supabase/ssr';
import { type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

// Browser-side Supabase client singleton
export function createSupabaseBrowserClient() {
    if (client) return client;

    console.log("[Supabase] Initializing singleton browser client...");
    client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    return client;
}
