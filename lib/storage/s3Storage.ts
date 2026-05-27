import { S3Client } from "@aws-sdk/client-s3";

export class StorageService {
  private readonly client: S3Client;
  private readonly bucket: string;

  public constructor() {
    this.client = new S3Client({
      endpoint: process.env["SELECTEL_S3_ENDPOINT"]!,
      credentials: {
        accessKeyId: process.env["SELECTEL_S3_ACCESS_KEY"]!,
        secretAccessKey: process.env["SELECTEL_S3_SECRET_KEY"]!,
      },
      region: process.env["SELECTED_S3_REGION"],
    });
    this.bucket = process.env["SELECTEL_S3_LMVERSE_BUCKET"]!;
  }
}
