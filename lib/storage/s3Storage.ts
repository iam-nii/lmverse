import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export const SelectelS3 = new S3Client({
  region: process.env["SELECTEL_S3_REGION"]!,
  endpoint: process.env["SELECTEL_S3_ENDPOINT"]!,
  // forcePathStyle: true,

  credentials: {
    accessKeyId: process.env["SELECTEL_S3_ACCESS_KEY"]!,
    secretAccessKey: process.env["SELECTEL_S3_SECRET_KEY"]!,
  },
});
