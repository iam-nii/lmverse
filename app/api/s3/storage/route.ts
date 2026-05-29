import { NextRequest, NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { SelectelS3 } from "@/lib/storage/s3Storage";
import { v4 as uuidv4 } from "uuid";
import { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from "@/lib/upload-security";
import { useAuthStore } from "@/store/AuthStore";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Check if user is authenticated
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    // 2. Parse and validate incoming request body
    const body = await req.json();
    const { filename, fileType } = body;

    if (!filename || !fileType) {
      return NextResponse.json(
        { error: "File name and file type are required" },
        { status: 400 }
      );
    }

    // 3. Enforce file type whitelist
    if (!ALLOWED_MIME_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // 4. Generate a unique, unguessable S3 key organised by the User's ID
    const fileExtension = filename.split(".").pop();
    const uniqueKey = `uploads/${user.id}/${uuidv4()}.${fileExtension}`;

    // 5. Generate the presigned POST fields and conditions
    const bucketName = process.env.SELECTEL_S3_LMVERSE_BUCKET_PUBLIC!;

    const { url, fields } = await createPresignedPost(SelectelS3, {
      Bucket: bucketName,
      Key: uniqueKey,
      Conditions: [
        ["starts-with", "$Content-Type", fileType],
        ["content-length-range", 0, MAX_FILE_SIZE], // Enforces file size limit at storage level
      ],
      Expires: 60, // Link expires in 60 seconds
    });
    return NextResponse.json({ url, fields, fileKey: uniqueKey });
  } catch (error) {
    console.error("Presigned POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
