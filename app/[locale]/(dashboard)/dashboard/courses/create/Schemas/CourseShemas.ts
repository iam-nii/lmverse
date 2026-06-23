import { courseStatus, levels } from "@/types/courseContent/types";
import {z} from "zod"
// interface Lesson {
//   id: string;
//   title: string;
//   description: string;
//   video_url: string;
//   video_share_url: string;
//   content: string;
//   files: string[];
//   order: number;
//   module_id: number;
// }

export const lessonFormSchema = z.object({
    title: z.string(),
    module_id: z.string(),
    description: z.string().optional(),
    video_url: z.url().optional(),
    vidoe_share_url: z.url().optional(),
    content: z.string(),
    fileKey: z.array(z.instanceof(File)).optional(),
})

export type lessonFormSchemaType = z.infer<typeof lessonFormSchema>;



export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  fileKey: z.string().optional(),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  level: z.enum(levels, { message: "Level is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Short description must be at least 3 characters long" })
    .max(200, {
      message: "Short description must be at most 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),
  status: z.enum(courseStatus, { message: "Status is required" }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
