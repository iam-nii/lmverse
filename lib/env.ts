import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_ENDPOINT_URL_S3: z.string().min(1),
    AWS_ENDPOINT_URL_IAM: z.string().min(1),
    AWS_REGION: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.string().min(1),
  },
  clientPrefix: "NEXT_PUBLIC_", // <-- REQUIRED
  runtimeEnv: process.env,
});
