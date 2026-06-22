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
    description: z.string(),
    video_url: z.url().optional(),
    vidoe_share_url: z.url().optional(),
    content: z.string(),
    fileKey: z.array(z.instanceof(File)).optional()
})

export type lessonFormSchemaType = z.infer<typeof lessonFormSchema>;