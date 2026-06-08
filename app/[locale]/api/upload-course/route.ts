import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      description,
      file_key,
      level,
      price,
      slug,
      small_description,
      status,
      title,
    } = body;

    if (!description || !title) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }
    if (!level) {
      return NextResponse.json({ error: "Level is required" }, { status: 400 });
    }
    if (!price) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    console.log("Body from Client:", body);

    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    console.log(userData);
    return;

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          description,
          file_key,
          level_id,
          price,
          slug,
          small_description,
          status,
          title,
          creator_id,
        },
      ])
      .select();
    if (error) throw error;

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
