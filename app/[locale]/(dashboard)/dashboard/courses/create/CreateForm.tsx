"use client"

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"

const steps = [
  { title: "Course Details" },
  { title: "Course Modules" },
  { title: "Module Lessons" },
  { title: "Preview Form" },
]

export default function CreateForm() {
  return (
    <section className="w-full px-28">
        <Stepper defaultValue={1} className="space-y-8">
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

      <StepperPanel className="text-sm">
        {steps.map((step, index) => (
          <StepperContent
            key={index}
            value={index + 1}
            className="flex items-center justify-center"
          >
            {step.title} content
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
    </section>
  )
}
