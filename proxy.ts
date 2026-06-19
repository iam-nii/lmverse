import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleWare = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Run next-intl first
  const response = intlMiddleWare(request);

  //Then update Supabase session
  try {
    
    return await updateSession(request, response);
  } catch (error) {
    console.log(error)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    
  }
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
