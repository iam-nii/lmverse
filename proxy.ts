import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleWare = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  //1. Run next-intl first
  const intlResponse = intlMiddleWare(request);

  //2. Run Supabase session handling
  try {    
    return await updateSession(request, intlResponse);
  } catch (error) {
    console.log("[Proxy] Supabase middleware faild:", error);
    return intlResponse;
    
  }
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
