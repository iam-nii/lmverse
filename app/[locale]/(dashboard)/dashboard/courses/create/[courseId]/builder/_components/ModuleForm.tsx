"use client";
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

// type lessonType = {
//     title: string,
//     description: string,
//     video_url: string,
//     video_share_url: string,
//     content: string,
//     files: string[],
//     order:number,
//     module_id:number
// }
// type moduleType = {
//     id: number,
//     title: string,
//     lessons?: lessonType[] | []
// }
export default function ModuleForm() {
  const { addModule, modules } = useCourseContentStore();
  const handleAddModule = (formData: FormData) => {
    const module_title = formData.get("module_title");
    if (module_title) addModule(module_title.toString(), modules.length + 1);
  };
  return (
    <div className="mt-8 flex flex-col gap-8 justify-items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="self-start">
            Create a new module
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form action={handleAddModule} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Create a new module</DialogTitle>
              <DialogDescription>
                Modules help structure your course into logical sections. Each
                module can contain one or more lessons, allowing you to organize
                content from basic concepts to advanced topics.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <Label htmlFor="module-title"> Module title</Label>
              <Input id="module-title" name="module_title" />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add module</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
