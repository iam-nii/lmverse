import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCourseContentStore } from "@/app/[locale]/(dashboard)/dashboard/courses/create/store/CourseContentStore";
import { Reorder } from "framer-motion";
import { NotebookPen, Layers, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseContentContainer() {
  const modules = useCourseContentStore(
    (state) => state.course.course_modules ?? []
  );
  const { reorderModules, removeModule } = useCourseContentStore();
  // const lessons = useCourseContentStore((state) => state.course.course_modules?.flatMap((module) => module.lessons) ?? [])

  return (
    <div className=" md:max-w-[45vw]">
      <h1 className="text-sm italic font-semibold">
        Drag and drop to reorder modules
      </h1>
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
            <div key={module.id} className="w-full flex items-center gap-2">
              <AccordionItem value={module.id.toString()} className="w-full">
                <Reorder.Item value={module}>
                  <AccordionTrigger className="w-full">
                    <div className="flex items-center gap-2 w-full">
                      <Layers size={20} />
                      {module.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {/* Display course lesson titles */}
                    {(module.lessons?.length ?? 0) > 0 ? (
                      module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-2"
                        >
                          <NotebookPen size={16} />
                          {lesson.title}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground italic">
                        No lessons available in this module
                      </p>
                    )}
                  </AccordionContent>
                </Reorder.Item>
              </AccordionItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeModule(module.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </Accordion>
      </Reorder.Group>
    </div>
  );
}
