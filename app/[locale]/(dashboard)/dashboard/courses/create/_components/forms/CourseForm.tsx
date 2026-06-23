import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Uploader from "@/components/file-uploader/Uploader";

import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparkleIcon } from "lucide-react";
import { courseSchema, courseSchemaType } from "../../Schemas/CourseShemas";
import { courseStatus, levels } from "@/types/courseContent/types";
const initialValues = {
  title: "",
  description: "",
  fileKey: "",
  price: 0,
  level: "Beginner",
  smallDescription: "",
  slug: "",
  status: "draft",
};

export default function CourseForm (){

    // On page load, check if there is some data already in the local storage and load it into the fields
  useEffect(() => {
    const stored = localStorage.getItem("course-details");
    if (stored) {
      const parsed = JSON.parse(stored)
      form.reset({
        title: parsed.title || '',
        description: parsed.description || '',
        fileKey: parsed.fileKey || '',
        price: parsed.price || 0,
        level: parsed.level || 'Beginner',
        smallDescription: parsed.smallDescription || '',
        slug: parsed.slug || '',
        status: parsed.status || 'draft',
      })
    }
  }, [])
     const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialValues // This ensures type safety
  });

    async function onSubmit(data: courseSchemaType) {
    // console.log(data)
    // Store data in local storage temporarily
    localStorage.setItem('course-details', JSON.stringify(data))
    // console.log(data);
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
    // console.log(response);

    // FOR TESTING  
    const randomCourseId = uuidv4();
    console.log([data, randomCourseId])
    redirect(`/dashboard/courses/create/${randomCourseId}/builder?course=${data.slug}`)

  }
    return (
        <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="course-title">
                        Course Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="course-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Course title"
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
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="course-slug">
                          Slug Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="course-clug"
                          aria-invalid={fieldState.invalid}
                          placeholder="Slug"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                      <Button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          const titleValue = form.getValues("title");
                          const slug = slugify(titleValue);
                          form.setValue("slug", slug);
                        }}
                      >
                        Generate slug
                        <SparkleIcon size={16} className="ml-1" />
                      </Button>
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name="smallDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="short-description">
                        Short Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="short-description"
                          placeholder="A short description about the course to be shown on course cards"
                          rows={6}
                          className="min-h-24 "
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/200 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        A short description about the course to be shown on
                        course cards.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="course-description">
                        Course Description
                      </FieldLabel>
                      <RichTextEditor field={field}  initialText="Course Description"/>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name="fileKey"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="filekey">
                          Thumbnail image
                        </FieldLabel>
                        <Uploader
                        path="courses/thumbnails"
                          onChange={(key) => {
                            field.onChange(key);
                            form.trigger("fileKey");
                          }}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    </div>
                  )}
                />
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="price">Price in rubles</FieldLabel>
                        <Input
                          {...field}
                          id="price"
                          aria-invalid={fieldState.invalid}
                          placeholder="0.00 ₽"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    </div>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="level"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="level">Course level</FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="level" />
                            <SelectContent>
                              <SelectGroup>
                                {levels.map((level, index) => (
                                  <SelectItem key={index} value={level}>
                                    {level}
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
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="status">Course status</FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                            <SelectContent>
                              <SelectGroup>
                                {courseStatus.map((s: string, index: number) => (
                                  <SelectItem key={index} value={s}>
                                    {s}
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
              </div>
            </FieldGroup>

            {/* <Button type="submit" className="cursor-pointer">
              Create course <PlusIcon size={16} className="ml-1" />
            </Button> */}
          </form>
        </CardContent>
      </Card>
    )
}