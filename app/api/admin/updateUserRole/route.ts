import { supabaseAdmin } from "@/lib/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
  } catch {}
}
