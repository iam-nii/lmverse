import { SelectelS3 } from "@/lib/storage/s3Storage";
import { DeleteObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
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
  } catch (error: unknown) {
    if (error instanceof S3ServiceException) {
      console.error(`AWS S3 Error [${error.name}]:`, error.message);

      // Map specific AWS exceptions to user-friendly status codes
      const status = error.name === "AccessDenied" ? 403 : 500;

      return NextResponse.json(
        { error: `Storage error: ${error.message}`, code: error.name },
        { status }
      );
    }
    if (error instanceof Error) {
      console.error("Standard Application Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Fallback for completely unexpected edge-case types (e.g., string throws)
    console.error("Unknown infrastructure error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
