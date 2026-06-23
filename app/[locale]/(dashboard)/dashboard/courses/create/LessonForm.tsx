"use client";
import DocumentUploader from "@/components/file-uploader/MaterialUploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCourseContentStore } from "@/app/[locale]/(dashboard)/dashboard/courses/create/store/CourseContentStore";
import { CircleQuestionMark, PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { lessonFormSchema, lessonFormSchemaType } from "./Schemas/CourseShemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function LessonForm() {
  const { addLesson } = useCourseContentStore();
  const modules = useCourseContentStore((state) => state.course.course_modules ?? [])

  const lessonForm = useForm<lessonFormSchemaType>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      vidoe_share_url: "",
      content: "",
      module_id: "",
      fileKey: [],
    }
  })
  const handleAddLesson = (formData: lessonFormSchemaType) => {


  };
  return (
    <div className="flex flex-col gap-8 justify-items-center">
      <form onSubmit={lessonForm.handleSubmit(handleAddLesson)} className="flex flex-col gap-4">
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 flex flex-col gap-4">
          <FieldGroup className="flex flex-col items-end">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
              <Controller
                  name="module_id"
                  control={lessonForm.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="level">Select a module</FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="level" />
                            <SelectContent>
                              <SelectGroup>
                                {modules.map((module, index) => (
                                  <SelectItem key={index} value={module.id}>
                                    {module.title}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </SelectTrigger>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    </div>
                  )}
                />
              <Controller
                name="title"
                control={lessonForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="lesson_title"> Lesson title</Label>
                    <Input
                      {...field}
                      id="lesson_title"
                      aria-invalid={fieldState.invalid}
                      placeholder="The title of the lesson to be added"
                      autoComplete="off"
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-end">
              <Controller
                name="description"
                control={lessonForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="lesson_discription"> Lesson Discription</Label>
                    <Input
                      {...field}
                      id="lesson_discription"
                      aria-invalid={fieldState.invalid}
                      placeholder="A short description of the course"
                      autoComplete="off"
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="video_url"
                control={lessonForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="video_url" className="flex items-center"> Lesson Video link
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-accent-foreground">
                            <CircleQuestionMark className="text-muted-foreground" size={20} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The link for the video player (e.g. Youtube, Vimeo)</p>

                        </TooltipContent>
                      </Tooltip>

                    </Label>
                    <Input
                      {...field}
                      id="video_url"
                      aria-invalid={fieldState.invalid}
                      placeholder="www.youtube.com/lmverseVideo"
                      autoComplete="off"
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 w-full items-start">
              <Controller
                name="vidoe_share_url"
                control={lessonForm.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="lesson-video-share-url" className="flex items-center">
                      Video Share link
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-accent-foreground">
                            <CircleQuestionMark className="text-muted-foreground" size={20} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {/* What's the Video share link? */}
                          A link from a platform like {" "}
                          <Link href="https://www.loom.com/">
                            loomie
                          </Link>
                          {" "} or {" "}
                          <Link href="https://skrini.ru/">srkini.ru</Link>

                        </TooltipContent>
                      </Tooltip>

                    </Label>
                    <Input
                      {...field}
                      id="vidoe_share_url"
                      aria-invalid={fieldState.invalid}
                      placeholder="A short description of the course"
                      autoComplete="off"
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                  name="fileKey"
                  control={lessonForm.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content">Lesson files
                          </FieldLabel>

                          <DocumentUploader
                            path="courses/materials"
                            onChange={(key)=> {
                              field.onChange(key);
                              lessonForm.trigger("fileKey")
                            }}
                            fileType="docs"
                            maxFiles={2}
                            maxSize={1024 * 1024 * 5}
                          />
                        
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    </div>
                  )}
                />
                
            </div>
            <div className="w-full">
              <Controller
                  name="content"
                  control={lessonForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="content">Lesson content
                      </FieldLabel>
                      <RichTextEditor field={field}  initialText="Course Content" className="[&_.ProseMirror]:min-h-[400px]"/>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
            </div>
          </FieldGroup>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="destructive" type="reset" className="cursor-pointer">Clear</Button>
          <Button type="button" className="cursor-pointer">Add Lesson <PlusIcon /></Button>
        </div>

      </form>
    </div>
  );
}
