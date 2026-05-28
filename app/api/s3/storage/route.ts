import { NextRequest, NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { SelectelS3 } from "@/lib/storage/s3Storage";
import { v4 as uuidv4 } from "uuid";
import { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from "@/lib/upload-security";
import { useAuthStore } from "@/store/AuthStore";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const user = (await supabase).auth.getUser();
    if (!user) {
    }
    console.log("Server User:", user);
  } catch (error) {
    throw error;
  }
}
