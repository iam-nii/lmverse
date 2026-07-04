// app/api/s3/upload/route.ts

import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { SelectelS3 } from "@/lib/storage/s3Storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fileName, contentType, size, path, allowedTypes } = body;

    // const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!Object.keys(allowedTypes).includes(contentType)) {
      console.log("Allowed Types:", allowedTypes);
      console.log("Content Type:", contentType);
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const extension = fileName.split(".").pop() || "jpg";

    const key = `${path}/${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.SELECTEL_S3_LMVERSE_BUCKET_PUBLIC!,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(SelectelS3, command, {
      expiresIn: 60,
    });

    return NextResponse.json({
      key,
      preSignedURL: url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
