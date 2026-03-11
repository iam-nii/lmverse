import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";

// Mapping of roles to allowed routes and home page
const roleAccess = {
  student: ["/dashboard/student"],
  tutor: ["/dashboard/tutor"],
  admin: ["/dashboard/admin"],
};

const roleHome = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};

const protectedRoutes = {
  student: ["/dashboard/tutor","/dashboard/admin"],
  tutor: ["/dashboard/student","/dashboard/admin"],
  admin: ["/dashboard/student","/dashboard/tutor"]
}

// Public routes accessible without login
const publicRoutes = ["/login", "/signup", "/"];

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseResponse = response;

  // Extract locale and path without locale
  const [, localeSegment, ...segments] = request.nextUrl.pathname.split("/");
  const pathWithoutLocale = "/" + segments.join("/"); // Path ignoring locale
  const locale = localeSegment ?? DEFAULT_LOCALE;
  console.log("pathwithoutlocale:",pathWithoutLocale)

  // Check if path is public
  const isPublicRoute = publicRoutes.includes(pathWithoutLocale);
  console.log(isPublicRoute);
  // const isPublic = publicRoutes.some((route) =>
  //   pathWithoutLocale.startsWith(route)
  // ); 



  // Create Supabase client for server-side auth
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
  console.log(user)

  // --- 1. Redirect "/" to default locale ---
  const rootRedirect = new URL(`/${DEFAULT_LOCALE}`, request.url);
  if (request.nextUrl.pathname === "/" && request.nextUrl.pathname !== rootRedirect.pathname) {
    return NextResponse.redirect(rootRedirect.toString());
  }

  // 1. Check if user is unauthenticated and is trying to access a dashboard
  if(!user && pathWithoutLocale.includes("dashboard")){
    console.log("Accessing restricted route, redirecting to login...");
    // Redirect to the login page
    console.log(locale);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  

  // Check if the current route is a protected route for the given user role
  const path = request.nextUrl.pathname
  // console.log(request.nextUrl)
  // console.log("path", path);

  // --- 2. No user → block protected routes ---
  // if (!user && !isPublic) {
  //   const url = new URL(`/${locale}`, request.url);
  //   if (request.nextUrl.pathname !== url.pathname) {
  //     return NextResponse.redirect(url.toString());
  //   }
  // }

  // --- 3. No role → redirect to locale root ---
  // const userRole = user?.user_metadata?.role;
  // if (!userRole) {
  //   const url = new URL(`/${locale}`, request.url);
  //   if (request.nextUrl.pathname !== url.pathname) {
  //     return NextResponse.redirect(url.toString());
  //   }
  // }

  // --- 4. Role-based access check ---
  // const allowedRoutes = roleAccess[userRole as keyof typeof roleAccess] || [];
  // const isAllowed =
  //   allowedRoutes.some((route) => pathWithoutLocale.startsWith(route)) || isPublic;

  // // Authenticated but visiting wrong role-protected route
  // if (!isAllowed) {
  //   const redirectUrl = new URL(
  //     `/${locale}${roleHome[userRole as keyof typeof roleHome]}`,
  //     request.url
  //   );
  //   if (request.nextUrl.pathname !== redirectUrl.pathname) {
  //     return NextResponse.redirect(redirectUrl.toString());
  //   }
  // }

  // --- 5. Authenticated user visiting public routes (login/signup) ---
  // if (user && isPublic) {
  //   // Only redirect if user tries to visit login or signup
  //   const publicLoginSignupPaths = ["/login", "/signup"];
  //   if (publicLoginSignupPaths.some((p) => pathWithoutLocale.startsWith(p))) {
  //     const redirectUrl = new URL(
  //       `/${locale}${roleHome[userRole as keyof typeof roleHome]}`,
  //       request.url
  //     );
  //     if (request.nextUrl.pathname !== redirectUrl.pathname) {
  //       return NextResponse.redirect(redirectUrl.toString());
  //     }
  //   }
  // }

  return supabaseResponse;
}