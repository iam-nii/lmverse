import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseResponse = response;
  const [, localeSegment, ...segments] = request.nextUrl.pathname.split("/");
const pathwithoutLocale = "/" + segments.join("/");

  const publicRoutes = ["/login", "/signup", "/"];
  const ispublic = publicRoutes.some((route) =>
    pathwithoutLocale.startsWith(route)
  );
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

  // No user = block protexted routes
  if (!user && !ispublic) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = withLocale(localeSegment,"/");
    return NextResponse.redirect(url);
  }
  
  // Get user role
  const userRole = user?.user_metadata?.role;
  if(!userRole){
    const url = request.nextUrl.clone();
    url.pathname = withLocale(localeSegment,"/login");
    return NextResponse.redirect(url);
  }

  const allowedRoutes = roleAccess[userRole as keyof typeof roleAccess] || [];
  

  const isAllowed = allowedRoutes.some((route)=>pathwithoutLocale.startsWith(route)) 
  || ispublic;

  // Authenticated but visiting the wrong route
  if(!isAllowed){
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = withLocale(localeSegment,roleHome[userRole as keyof typeof roleHome]);

    if(redirectUrl.pathname !== request.nextUrl.pathname){
      return NextResponse.redirect(redirectUrl);
    }
  }

 //Authenticated user visiting login/signup
 if(user && ispublic && pathwithoutLocale !=="/"){
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = withLocale(localeSegment,roleHome[userRole as keyof typeof roleHome]);

  if (redirectUrl.pathname !== request.nextUrl.pathname){
    return NextResponse.redirect(redirectUrl);
  }
 }
  return supabaseResponse;
}

function withLocale(locale: string | undefined, path: string) {
  if (!locale) return path;
  return `/${locale}${path}`;
}