import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, role } = body;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        role,
      },
    });

    const { error: userTableError } = await supabase
      .from("users")
      .update({ role: role })
      .eq("id", userId);

    if (error || userTableError) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: error?.message || userTableError?.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
