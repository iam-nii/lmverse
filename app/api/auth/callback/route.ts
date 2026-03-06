import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // "next" is the redirection destination after code exchange
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // User successfully authenticated via PKCE!
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Fallback if the code verification fails or is absent
    return NextResponse.redirect(`${origin}/login?error=InvalidAuthCode`);
}
