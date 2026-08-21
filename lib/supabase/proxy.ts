import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";

const roleConfig = {
  admin: {
    home: "/dashboard/admin",
    forbidden: ["student", "tutor", "login", "signup"],
  },
  student: {
    home: "/dashboard/student",
    forbidden: ["admin", "tutor", "login", "signup"],
  },
  tutor: {
    home: "/dashboard/student",
    forbidden: ["student", "admin", "login", "signup"],
  },
} as const;

type RoleType = keyof typeof roleConfig;

const publicRoutes = ["/login", "/signup", "/"];

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseResponse = response;

  /*
   * ----------------------------------------
   * Route / locale information
   * ----------------------------------------
   */

  const [, localeSegment, ...segments] =
    request.nextUrl.pathname.split("/");

  const pathWithoutLocale = "/" + segments.join("/");
  const locale = localeSegment || DEFAULT_LOCALE;

  const isPublicRoute = publicRoutes.includes(pathWithoutLocale);

  /*
   * ----------------------------------------
   * Supabase configuration
   * ----------------------------------------
   */

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  /*
   * If Supabase isn't configured correctly,
   * don't crash the entire application.
   *
   * next-intl has already created a valid response,
   * so return that response.
   */
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key."
    );

    /*
     * Don't allow protected pages without Supabase.
     */
    if (pathWithoutLocale.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
    }

    return supabaseResponse;
  }

  /*
   * ----------------------------------------
   * Supabase
   * ----------------------------------------
   */

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });

            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set(
                name,
                value,
                options
              );
            });
          },
        },
      }
    );

    /*
     * getClaims() verifies the authenticated user.
     */
    const { data, error } = await supabase.auth.getClaims();

    if (error) {
      console.error(
        "[Supabase] getClaims failed:",
        error.message
      );
    }

    const userRole =
      data?.claims?.user_metadata?.role as RoleType | undefined;

    /*
     * ----------------------------------------
     * Root redirect
     * ----------------------------------------
     */

    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${DEFAULT_LOCALE}`, request.url)
      );
    }

    /*
     * ----------------------------------------
     * Protected dashboard
     * ----------------------------------------
     */

    const isDashboardRoute =
      pathWithoutLocale.startsWith("/dashboard");

    if (!data?.claims && isDashboardRoute) {
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
    }

    /*
     * ----------------------------------------
     * Role-based routing
     * ----------------------------------------
     */

    if (userRole && userRole in roleConfig) {
      const config = roleConfig[userRole];

      const pathSegments = pathWithoutLocale
        .split("/")
        .filter(Boolean);

      const hasForbiddenSegment =
        config.forbidden.some((keyword) =>
          pathSegments.includes(keyword)
        );

      if (hasForbiddenSegment) {
        return NextResponse.redirect(
          new URL(`/${locale}${config.home}`, request.url)
        );
      }
    }

    /*
     * Everything is fine.
     */
    return supabaseResponse;
  } catch (error) {
    /*
     * ----------------------------------------
     * Supabase failure
     * ----------------------------------------
     */

    console.error(
      "[Supabase] Middleware error:",
      error
    );

    /*
     * IMPORTANT:
     *
     * Do not create a new NextResponse here.
     * Return the response produced by next-intl.
     */
    if (pathWithoutLocale.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
    }

    return supabaseResponse;
  }
}