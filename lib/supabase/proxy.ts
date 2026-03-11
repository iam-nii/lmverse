import { createServerClient } from "@supabase/ssr";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";

// Role configuration
const roleConfig = {
  admin:{
    home: "/dashboard/admin",
    forbidden: ["student", "tutor","login","signup"]
  },
  student:{
    home: "/dashboard/student",
    forbidden: ["admin", "tutor","login","signup"]
  },
  tutor:{
    home: "/dashboard/student",
    forbidden: ["student", "admin","login","signup"]
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

  const { data: {user}, error } = await supabase.auth.getUser();
  console.log(user)
 
  const userRole = user?.user_metadata?.role as RoleType | undefined;


  

  // --- 1. Redirect "/" to default locale ---
  const rootRedirect = new URL(`/${DEFAULT_LOCALE}`, request.url);
  if (request.nextUrl.pathname === "/" && request.nextUrl.pathname !== rootRedirect.pathname) {
    return NextResponse.redirect(rootRedirect.toString());
  }

  // 2. Check if user is unauthenticated and is trying to access a dashboard
  if(!user  && pathWithoutLocale.includes("dashboard")){
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

  return supabaseResponse;
}