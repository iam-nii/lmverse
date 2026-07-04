"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Clock,
  FileText,
  Layers,
  Link2,
  Loader2,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { courseContext } from "@/types/courseContent/types";
import { formatPrice, resolveThumbnail, summarizeCourse } from "@/lib/course";
import { useCourseContentStore } from "../store/CourseContentStore";
import { useEffect, useEffectEvent, useState } from "react";
import GetImage from "@/components/course/GetImage";

const resourceIcons = {
  pdf: FileText,
  video: Video,
  link: Link2,
} as const;

type CourseReviewProps = {
  confirmed: boolean;
  onConfirmedChange: (value: boolean) => void;
  onBack: () => void;
  onPublish: () => void;
  publishing: boolean;
};

export function CourseReview({
  confirmed,
  onConfirmedChange,
  onBack,
  onPublish,
  publishing,
}: CourseReviewProps) {
  const { course } = useCourseContentStore();
  const { totalModules, totalLessons, estimatedDuration, resources } =
    summarizeCourse(course as courseContext);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  const image = useEffectEvent((fileKey: string) => {
    setImageURL(`${process.env.SELECTEL_S3_ENDPOINT}/${fileKey}`);
  });
  useEffect(() => {
    if (course.course_file_key) {
      image(course.course_file_key);
    }
  }, [course.course_file_key]);

  const stats = [
    { icon: Layers, label: "Modules", value: totalModules },
    { icon: PlayCircle, label: "Lessons", value: totalLessons },
    { icon: Clock, label: "Duration", value: estimatedDuration },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="w-full"
    >
      {/* Heading */}
      <div className="mb-6 flex flex-col items-start gap-2">
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Take one last look before it goes live. You can always edit details
          after publishing.
        </p>
      </div>

      {/* Summary card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:w-56">
            <GetImage
              course_title={course.course_title!}
              course_file_key={course.course_file_key!}
            />
          </div>

          {/* Title + description */}
          <div className="flex min-w-0 flex-col justify-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {course.course_level && (
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-medium capitalize text-muted-foreground">
                  {course.course_level}
                </span>
              )}
              <span className="inline-flex items-center rounded-full border border-success/30 bg-success-muted/60 px-2 py-0.5 text-xs font-medium text-foreground">
                {formatPrice(course.course_price || 0)}
              </span>
            </div>
            <h2 className="text-pretty text-lg font-semibold leading-snug tracking-tight text-foreground">
              {course.course_title}
            </h2>
            <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              {course.course_short_description || course.course_description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-t border-border">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-1 px-5 py-4",
                i > 0 && "border-l border-border"
              )}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <stat.icon className="size-3.5" />
                {stat.label}
              </span>
              <span className="text-base font-semibold tabular-nums tracking-tight text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Resources */}
        {resources.length > 0 && (
          <div className="border-t border-border px-5 py-4 sm:px-6">
            <span className="mb-3 block text-xs font-medium text-muted-foreground">
              Attached resources · {resources.length}
            </span>
            <ul className="flex flex-col gap-2">
              {resources.map((resource, i) => {
                const Icon = resourceIcons[resource.type];
                return (
                  <li
                    key={`${resource.name}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                      {resource.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {resource.meta}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Confirmation */}
      <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
        <p className="text-sm leading-relaxed text-foreground">
          You&apos;re all set. Ready to make{" "}
          <span className="font-semibold">{course.course_title}</span> available
          to your learners?
        </p>

        <label
          className={cn(
            "mt-4 flex cursor-pointer select-none items-start gap-3 rounded-xl border p-3.5 transition-colors",
            confirmed
              ? "border-success/40 bg-success-muted/60"
              : "border-border bg-card hover:bg-muted/60"
          )}
        >
          <span
            role="checkbox"
            aria-checked={confirmed}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onConfirmedChange(!confirmed);
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              onConfirmedChange(!confirmed);
            }}
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              confirmed
                ? "border-success bg-success text-success-foreground"
                : "border-border bg-background"
            )}
          >
            <motion.span
              initial={false}
              animate={{ scale: confirmed ? 1 : 0, opacity: confirmed ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </motion.span>
          </span>
          <span className="text-sm leading-relaxed text-foreground">
            I have reviewed my course and I&apos;m ready to publish it.
          </span>
        </label>

        {/* Actions */}
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={publishing}
            className="h-11 px-5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button
            size="lg"
            onClick={onPublish}
            disabled={!confirmed || publishing}
            className="h-11 px-6"
          >
            {publishing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Publishing…
              </>
            ) : (
              "Publish Course"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
