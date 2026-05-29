// app/api/s3/upload/route.ts

import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { SelectelS3 } from "@/lib/storage/s3Storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Body from Client:", body);

    const { fileName, contentType, size } = body;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const extension = fileName.split(".").pop() || "jpg";

    const key = `courses/thumbnails/${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.SELECTEL_BUCKET!,
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
      { error: `Internal Error ${error}` },
      { status: 500 }
    );
  }
}
