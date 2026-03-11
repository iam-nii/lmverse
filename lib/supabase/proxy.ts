import { createServerClient } from "@supabase/ssr";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";

// Role configuration
const roleConfig = {
  admin:{
    home: "/dashboard/admin",
    forbidden: ["student", "tutor"]
  },
  student:{
    home: "/dashboard/student",
    forbidden: ["admin", "tutor"]
  },
  tutor:{
    home: "/dashboard/student",
    forbidden: ["student", "admin"]
  }
}

type RoleType = "admin" | "tutor" | "student";

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
  const userRole = user?.user_metadata?.role as RoleType | undefined;
  console.log(userRole)

  

  // --- 1. Redirect "/" to default locale ---
  const rootRedirect = new URL(`/${DEFAULT_LOCALE}`, request.url);
  if (request.nextUrl.pathname === "/" && request.nextUrl.pathname !== rootRedirect.pathname) {
    return NextResponse.redirect(rootRedirect.toString());
  }

  // 2. Check if user is unauthenticated and is trying to access a dashboard
  if(!user && pathWithoutLocale.includes("dashboard")){
    console.log("Accessing restricted route, redirecting to login...");
    // Redirect to the login page
    console.log(locale);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // 3. Check if a user is trying to access a restricted page
  if(userRole && userRole in roleConfig){
    const config = roleConfig[userRole];
    const pathSegments = pathWithoutLocale.split('/').filter(Boolean);
    const hasForbiddenSegment = config.forbidden.some(keyword => pathSegments.includes(keyword));
    

    if(hasForbiddenSegment){
      return NextResponse.redirect(new URL(`/${locale}${config.home}`,request.url))
    }    
  }
  if(userRole == "admin" && (pathWithoutLocale.includes("student")|| pathWithoutLocale.includes("tutor")))
  {
    // redirect to admin page
  }
  if(userRole == "student" && (pathWithoutLocale.includes("admin")|| pathWithoutLocale.includes("tutor"))){
    // redirect to student page
  }
  if(userRole == "tutor" && (pathWithoutLocale.includes("admin")|| pathWithoutLocale.includes("student"))){
    // redirect to tutor page
  }
  // if(user && pathWithoutLocale.includes()){

  // }


  

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