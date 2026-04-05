"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  courseSchema,
  courseSchemaType,
  courseStatus,
  levels,
} from "@/lib/zodSchemas";
import { useAuthStore } from "@/store/AuthStore";
import { ArrowLeft, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

function CourseCreationPage() {
  const { user } = useAuthStore();

  const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      level: "Beginner", // Provide a default enum value
      smallDescription: "",
      slug: "",
      status: "draft", // Provide a default enum value
    }, // This ensures type safety
  });
  function onSubmit(data: courseSchemaType) {
    // Do something with the form values.
    console.log(data);
  }
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <Link
          href={`/dashboard/${user?.user_metadata.role}/courses`}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-4xl font-bold">Создать курс</h1>
      </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="min-h-24"
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
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="course-description"
                          placeholder="A detailed description of the course to be shown when students want to know more about what a course offers"
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/500 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        A detailed description of the course to be shown when
                        students want to know more about what a course offers
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="fileKey"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex items-end gap-4">
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="filekey">
                          Thumbnail image
                        </FieldLabel>
                        <Input
                          {...field}
                          id="filekey"
                          aria-invalid={fieldState.invalid}
                          placeholder="Thumbnail url"
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
                                {courseStatus.map((s, index) => (
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
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default CourseCreationPage;
