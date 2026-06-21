import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCourseContentStore } from "@/store/courses/CourseContentStore";
import { Reorder } from "framer-motion";
import { CirclePlus, GripVertical, ListPlus } from "lucide-react";
import LessonForm from "./LessonForm";

export default function ModulesContainer() {
  const { modules, lessons, setModules } = useCourseContentStore();

  return (
    <div className="mt-8 md:max-w-[45vw]">
      <Reorder.Group
        axis="y"
        values={modules}
        onReorder={setModules}
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
              <Reorder.Item key={module.id} value={module}>
                <AccordionTrigger className="w-full">
                  <div className="flex items-center gap-2 w-full">
                    <GripVertical />
                    {module.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8">
                  {(module.lessons?.length ?? 0) > 0 ? (
                    module.lessons?.map((lesson_id) => {
                      const lesson = lessons.find(
                        (lesson) => lesson.id === lesson_id
                      );
                      return (
                        <div key={lesson_id}>
                          <p>{lesson?.title}</p>
                        </div>
                      );
                    })
                  ) : (
                    <LessonForm />
                  )}
                </AccordionContent>
              </Reorder.Item>
            </AccordionItem>
          ))}
        </Accordion>
      </Reorder.Group>
    </div>
  );
}
