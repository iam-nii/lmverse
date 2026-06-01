import { SelectelS3 } from "@/lib/storage/s3Storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fileKey } = await req.json();
    console.log("Deleting file...");

    if (!fileKey) {
      return NextResponse.json(
        {
          error: "File key is required",
        },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.SELECTEL_S3_LMVERSE_BUCKET_PUBLIC,
      Key: fileKey,
    });

    await SelectelS3.send(command);
    return NextResponse.json(
      { message: "Object deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
