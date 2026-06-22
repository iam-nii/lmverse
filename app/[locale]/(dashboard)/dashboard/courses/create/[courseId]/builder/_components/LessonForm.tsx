"use client";
import DocumentUploader from "@/components/file-uploader/MaterialUploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCourseContentStore } from "@/store/courses/CourseContentStore";
import { CircleQuestionMark } from "lucide-react";

export default function LessonForm() {
  const { addModule, modules } = useCourseContentStore();

  const handleAddLesson = (formData: FormData) => {
    const module_title = formData.get("module_title");
    if (module_title) addModule(module_title.toString(), modules.length + 1);
  };
  return (
    <div className="flex flex-col gap-8 justify-items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={"sm"} className="self-start">
            Create a new Lesson
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] min-w-fit">
          <form action={handleAddLesson} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Create a new Lesson</DialogTitle>
              <DialogDescription>
                {" "}
                Add a new lesson to this course. You can edit its content later.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 flex flex-col gap-4">
              <Field>
                <Label htmlFor="lesson-title"> Lesson title</Label>
                <Input id="lesson-title" name="title" />
              </Field>
              <Field>
                <Label htmlFor="lesson-discription"> Lesson Discription</Label>
                <Input id="lesson-discription" name="discription" />
              </Field>
              <Field>
                <Label htmlFor="lesson-video-url"> Lesson title</Label>
                <Input id="lesson-video-url" name="video_url" />
              </Field>
              <Field>
                <Label htmlFor="lesson-video-share-url">
                  Video Share url
                  <span className="text-accent-foreground">
                    <CircleQuestionMark />
                  </span>
                </Label>
                <Input id="lesson-video-share-url" name="video_share_url" />
              </Field>
              <Field>
                <Label htmlFor="content">Lesson content</Label>
                {/* <Input id="content" name="content" /> */}
                <RichTextEditor field={"content"} initialText="Course Content"/>
              </Field>
              <Field>
                <Label htmlFor="content">Lesson files</Label>

                <DocumentUploader
                  fileType="docs"
                  maxFiles={2}
                  maxSize={1024 * 1024 * 5}
                />
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Lesson</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
