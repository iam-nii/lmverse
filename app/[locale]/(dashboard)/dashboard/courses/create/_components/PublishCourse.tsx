"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CourseReview } from "./CoursePreview";
import { courseContext } from "@/types/courseContent/types";
import { CourseSuccess } from "./CourseSuccess";
import { toast } from "sonner";
import { createCourse } from "@/lib/actions/course/create";
import { useCourseContentStore } from "../store/CourseContentStore";
type Step = "review" | "success";

export function PublishCourse() {
  const { course } = useCourseContentStore();
  const [step, setStep] = useState<Step>("review");
  const [confirmed, setConfirmed] = useState(false);
  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    if (!confirmed) return;
    setPublishing(true);

    try {
      await createCourse(course as courseContext);
      setStep("success");
      toast.success("Course Created Successfully");
    } catch (error) {
      toast.error("Failed to Create course", {
        description:
          error instanceof Error ? error.message : JSON.stringify(error),
      });
    }
    setPublishing(false);
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === "review" ? (
          <CourseReview
            key="review"
            confirmed={confirmed}
            onConfirmedChange={setConfirmed}
            onBack={() => {
              /* navigate to previous step */
            }}
            onPublish={handlePublish}
            publishing={publishing}
          />
        ) : (
          <CourseSuccess
            key="success"
            onViewCourse={() => {
              /* navigate to the published course */
            }}
            onGoToDashboard={() => {
              /* navigate to the dashboard */
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
