"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import CourseForm from "./CourseForm";
import ModuleForm from "./ModuleForm";
import LessonForm from "./LessonForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import SubmitCourse from "../SubmitForm";

const steps = [
  { title: "Add Course Details", page: <CourseForm /> },
  { title: "Add Modules to your course", page: <ModuleForm /> },
  { title: "Add Lessons to your course modules", page: <LessonForm /> },
  { title: "Done", page: <SubmitCourse /> },
];

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    console.log("CreateForm component rendered");
  }, []);

  const handleCreateCourse = async () => {};
  return (
    <section className="w-full">
      <Stepper
        value={currentStep}
        onValueChange={(value) => setCurrentStep(value)}
        className="space-y-8"
      >
        <StepperNav className="mb-10 gap-5">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex grow flex-col items-start justify-center gap-3.5">
                <StepperIndicator className="bg-border data-[state=active]:bg-primary data-[state=completed]:bg-primary h-1 w-full rounded-full">
                  <span className="sr-only">{index + 1}</span>
                </StepperIndicator>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold">
                  {step.title}
                </StepperTitle>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm flex flex-col items-end">
          {steps.map((step, index) => (
            <StepperContent key={index} value={index + 1}>
              {step.page}
            </StepperContent>
          ))}
          <div className="flex items-center justify-end gap-2.5 mt-4 cursor-pointer">
            {currentStep !== steps.length ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer"
                onClick={handleCreateCourse}
              >
                Create course <PlusIcon size={16} className="ml-1" />
              </Button>
            )}
          </div>
        </StepperPanel>
      </Stepper>
    </section>
  );
}
