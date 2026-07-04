"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CourseReview } from "./CoursePreview";
import { courseContext } from "@/types/courseContent/types";
import { CourseSuccess } from "./CourseSuccess";

type Step = "review" | "success";

export function PublishCourse({ course }: { course: courseContext }) {
  const [step, setStep] = useState<Step>("review");
  const [confirmed, setConfirmed] = useState(false);
  const [publishing, setPublishing] = useState(false);

  function handlePublish() {
    if (!confirmed) return;
    setPublishing(true);
    // Simulate the publish request before transitioning to the success state.
    window.setTimeout(() => {
      setPublishing(false);
      setStep("success");
    }, 900);
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
            course={course}
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
