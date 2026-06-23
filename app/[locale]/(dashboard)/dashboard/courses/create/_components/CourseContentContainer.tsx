import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCourseContentStore } from "@/app/[locale]/(dashboard)/dashboard/courses/create/store/CourseContentStore";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

export default function CourseContentContainer() {
  const modules = useCourseContentStore((state) => state.course.course_modules ?? []);
  const { reorderModules } = useCourseContentStore();
  // const lessons = useCourseContentStore((state) => state.course.course_modules?.flatMap((module) => module.lessons) ?? [])

  return (
    <div className="mt-8 md:max-w-[45vw]">

      {/* Displaying the available modules */}
      <Reorder.Group
        axis="y"
        values={modules}
        onReorder={reorderModules}
        className="w-full"
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="max-w-lg"
        >
          {modules.map((module) => (
            <AccordionItem key={module.id} value={module.id.toString()}>
              <Reorder.Item value={module}>
                <AccordionTrigger className="w-full">
                  <div className="flex items-center gap-2 w-full">
                    <GripVertical />
                    {module.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8">
                  {/* Display course lesson titles */}
                  {
                   (module.lessons?.length ?? 0) > 0 ?(
                    module.lessons.map((lesson)=>(
                      <p key={lesson.id}>{lesson.title}</p>
                    ))
                   ) : (
                    <p className="text-muted-foreground italic">No lessons available in this module</p>
                   )
                  }
                </AccordionContent>
              </Reorder.Item>
            </AccordionItem>
          ))}
        </Accordion>
      </Reorder.Group>
    </div>
  );
}
