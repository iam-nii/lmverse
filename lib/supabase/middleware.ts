import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest, response: NextResponse) {
    console.log(`[Middleware] Updating session for: ${request.nextUrl.pathname}`);
    let supabaseResponse = response

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    // Because next-intl generates the response early, we must explicitly sync
                    // changes forward into the out-bound response header as well.
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // This refreshes the auth token automatically if expired
    console.log("[Middleware] Calling getUser...");
    const {
        data: { user },
    } = await supabase.auth.getUser()
    console.log("[Middleware] getUser finished. User exists:", !!user);

    // Protect the dashboard routes
    // Assuming routes starting with /users (e.g. /users/students or /users/tutors)
    // are protected. The prefix might include the locale as well depending on routing.
    const path = request.nextUrl.pathname;
    // Match path containing /users but exclude login pages if they exist under users
    if (
        !user &&
        path.match(/\/(en|fr|ru)\/users/i) &&
        !path.match(/\/(en|fr|ru)\/users\/(admin\/login|tutor\/login)/i)
    ) {
        // If not authenticated, redirect to the login page (preserve locale)
        const locale = path.split('/')[1] || 'en';
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = `/${locale}/login`;
        return NextResponse.redirect(loginUrl);
    }

    return supabaseResponse
}
