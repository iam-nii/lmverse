import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SELECTEL_S3_ACCESS_KEY: z.string().min(1),
    SELECTEL_S3_SECRET_KEY: z.string().min(1),
    SELECTEL_S3_ENDPOINT: z.string().min(1),
    SELECTEL_S3_REGION: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.string().min(1),
  },
  clientPrefix: "NEXT_PUBLIC_", // <-- REQUIRED
  runtimeEnv: process.env,
});
