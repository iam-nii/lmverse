import { courseContext } from "@/types/courseContent/types";
import { PublishCourse } from "./PublishCourse";

const course: courseContext = {
  course_id: "crs_9f2a1c",
  course_title: "The Art of Interface Motion",
  course_slug: "the-art-of-interface-motion",
  course_short_description:
    "Design purposeful animation for modern products — easing, choreography, and micro-interactions that feel effortless.",
  course_description:
    "A hands-on course on designing purposeful animation for modern products. Build a refined motion system from first principles, covering easing, choreography, and the micro-interactions that make interfaces feel alive.",
  course_file_key: "/course-thumbnail.png",
  course_price: 129,
  course_level: "Intermediate",
  course_status: "draft",
  course_modules: [
    {
      id: "mod_1",
      order: 1,
      title: "Foundations of Motion",
      lessons: [
        {
          id: "l1",
          title: "Why motion matters",
          video_url: "https://example.com/v/1",
          video_share_url: "https://example.com/s/1",
          content: "",
          module_id: "mod_1",
          order: 1,
          files: ["Motion Principles Handbook.pdf"],
        },
        {
          id: "l2",
          title: "The grammar of easing",
          video_url: "https://example.com/v/2",
          video_share_url: "https://example.com/s/2",
          content: "",
          module_id: "mod_1",
          order: 2,
          files: ["Easing Curves Cheat Sheet.pdf"],
        },
        {
          id: "l3",
          title: "Timing and rhythm",
          video_url: "https://example.com/v/3",
          video_share_url: "https://example.com/s/3",
          content: "",
          module_id: "mod_1",
          order: 3,
        },
      ],
    },
    {
      id: "mod_2",
      order: 2,
      title: "Choreographing Interfaces",
      lessons: [
        {
          id: "l4",
          title: "Orchestration & stagger",
          video_url: "https://example.com/v/4",
          video_share_url: "https://example.com/s/4",
          content: "",
          module_id: "mod_2",
          order: 1,
          files: ["https://figma.com/file/starter-kit"],
        },
        {
          id: "l5",
          title: "Shared element transitions",
          video_url: "https://example.com/v/5",
          video_share_url: "https://example.com/s/5",
          content: "",
          module_id: "mod_2",
          order: 2,
        },
        {
          id: "l6",
          title: "Layout animations",
          video_url: "https://example.com/v/6",
          video_share_url: "https://example.com/s/6",
          content: "",
          module_id: "mod_2",
          order: 3,
        },
      ],
    },
    {
      id: "mod_3",
      order: 3,
      title: "Micro-interactions in Practice",
      lessons: [
        {
          id: "l7",
          title: "Buttons that feel right",
          video_url: "https://example.com/v/7",
          video_share_url: "https://example.com/s/7",
          content: "",
          module_id: "mod_3",
          order: 1,
          files: ["Welcome-and-Setup-Walkthrough.mp4"],
        },
        {
          id: "l8",
          title: "Feedback & state changes",
          video_url: "https://example.com/v/8",
          video_share_url: "https://example.com/s/8",
          content: "",
          module_id: "mod_3",
          order: 2,
        },
      ],
    },
  ],
};

export default function SubmitCourse() {
  const UploadCourse = () => {
    // const response = await fetch("/api/upload-course", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     description: data.description,
    //     file_key: data.fileKey,
    //     level: data.level,
    //     price: data.price,
    //     slug: data.slug,
    //     small_description: data.smallDescription,
    //     status: data.status,
    //     title: data.title,
    //   }),
    // });
  };
  return (
    <div className="w-full h-full">
      <PublishCourse course={course} />
    </div>
  );
}
