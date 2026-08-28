import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Lesson, Module } from "@/types/courseContent/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    // return NextResponse.json({ message: "Hello" }, { status: 200 });
    const {
      course_id,
      course_title,
      course_slug,
      course_description,
      course_small_description,
      course_file_key,
      course_level,
      course_price,
      course_status,
      course_modules,
    } = body;

    if (!course_description || !course_title) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }
    if (!course_level) {
      return NextResponse.json({ error: "Level is required" }, { status: 400 });
    }
    if (!course_price) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }
    if (!course_status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    console.log("Claims");

    const supabase = await createClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const creator_id = claimsData?.claims.sub;

    const { data: levelData, error: getLevelError } = await supabase
      .from("levels")
      .select("id")
      .eq("name", course_level)
      .single();

    const level_id = levelData?.id;
    if (getLevelError)
      return NextResponse.json(
        { success: false, error: getLevelError },
        { status: 400 }
      );

    // Check if the course already exists
    const { data: courseData, error: getCourseError } = await supabase
      .from("courses")
      .select("*")
      .eq("course_id", course_id)
      .single();

    if (getCourseError)
      return NextResponse.json(
        { success: false, error: getCourseError },
        { status: 400 }
      );

    if (courseData) {
      return NextResponse.json(
        { success: false, error: "Course already exists" },
        { status: 400 }
      );
    }
    // Insert the course
    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          course_id,
          course_title,
          course_description,
          course_file_key,
          level_id,
          course_price,
          course_slug,
          course_small_description,
          course_status,
          creator_id,
        },
      ])
      .select();
    if (error)
      return NextResponse.json(
        { success: false, error: error },
        { status: 500 }
      );

    // Insert the course modules
    const { data: moduleData, error: moduleError } = await supabase
      .from("modules")
      .insert(
        course_modules.map((module: Module) => ({ ...module, course_id }))
      )
      .select();
    if (moduleError)
      return NextResponse.json(
        { success: false, error: moduleError },
        { status: 500 }
      );

    const course_lessons = course_modules.flatMap((module: Module) =>
      module.lessons.map((lesson: Lesson) => ({
        ...lesson,
        module_id: module.id,
      }))
    );

    // Insert the course lessons
    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .insert(
        course_lessons.map((lesson: Lesson) => ({ ...lesson, course_id }))
      )
      .select();
    if (lessonError)
      return NextResponse.json(
        { success: false, error: lessonError },
        { status: 500 }
      );

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
