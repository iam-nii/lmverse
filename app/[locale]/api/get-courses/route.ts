import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;

    const user_id = searchParams.get("creator-id");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = supabase.from("courses").select("*");
    if (user_id) {
      query = query.eq("creator_id", user_id);
    }

    const { data: courses, error } = await query.order("created_at", {
      ascending: false,
    });

    if (!courses || error) {
      return NextResponse.json(
        { success: false, error: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, error: false, data: courses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
}
