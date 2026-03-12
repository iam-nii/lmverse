<<<<<<< HEAD
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest } from 'next/server';
=======
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest } from "next/server";

const intlMiddleWare = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Run next-intl first
  const response = intlMiddleWare(request);

  //Then update Supabase session
  return await updateSession(request, response);
}
>>>>>>> supabase/implementAuth

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  console.log("middleware");
  return await updateSession(request, response);
}
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
