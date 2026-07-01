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
import { useCourseContentStore } from "../../store/CourseContentStore";
import { useEffect, useState } from "react";
import CourseContentContainer from "../CourseContentContainer";

export default function ModuleForm() {
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const { addModule, course } = useCourseContentStore();
  useEffect(() => {
    console.log(course);
  }, [course]);

  return (
    <div className="mt-8 flex flex-col gap-8 justify-items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="self-start">
            Create a new module
          </Button>
        </DialogTrigger>
        <DialogContent>
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
            <Input
              id="module-title"
              name="module_title"
              onChange={(e) => setModuleTitle(e.target.value)}
              value={moduleTitle}
            />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={() => addModule(moduleTitle)}>Add Module</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CourseContentContainer />
    </div>
  );
}
