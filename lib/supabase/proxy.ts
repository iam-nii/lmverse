import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseResponse = response;
  const locale = request.nextUrl.locale;
  const pathwithoutLocale =
    request.nextUrl.pathname.replace(`${locale}`, "") || "";
  const publicRoutes = ["/login", "/admin", "/tutor", "/dashboard", "/student"];
  const ispublic = publicRoutes.some((route) =>
    pathwithoutLocale.startsWith(route)
  );
  const roleAccess = {
    student: ["/dashboard/student"],
    tutor: ["/dashboard/tutor"],
    admin: ["/dashboard/admin"],
  };

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  if (!user && ispublic) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  console.log("Authorized user:", user);
  return supabaseResponse;
}

// const userRole = user?.role; // from JWT claims

// // Determine allowed routes for this role
// const allowedRoutes = roleAccess[userRole as keyof typeof roleAccess] || [];

// // If the path is not allowed for this role, redirect to a safe page
// const isAllowed =
//   allowedRoutes.some((route) => path.startsWith(route)) ||
//   publicRoutes.some((route) => path.startsWith(route));

// if (!userRole || !isAllowed) {
//   const redirectUrl = request.nextUrl.clone();
//   redirectUrl.pathname = "/login"; // or a "not authorized" page
//   return NextResponse.redirect(redirectUrl);
// }
