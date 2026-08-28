import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";
import { AnimatedCheck } from "./AnimatedCheck";
import { useCourseContentStore } from "../store/CourseContentStore";
type CourseSuccessProps = {
  onViewCourse: () => void;
  onGoToDashboard: () => void;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

export function CourseSuccess({
  onViewCourse,
  onGoToDashboard,
}: CourseSuccessProps) {
  const { course } = useCourseContentStore();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative flex w-full flex-col items-center py-6 text-center"
    >
      <Confetti />

      <div className="relative mb-7 mt-2">
        <AnimatedCheck />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-3"
      >
        <motion.h1
          variants={item}
          className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Course Published!
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground"
        >
          <span className="font-medium text-foreground">
            {course.course_title}
          </span>{" "}
          is now live and ready for your learners to explore.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-5 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onGoToDashboard}
            className="h-11 px-5"
          >
            <LayoutDashboard className="size-4" />
            Go to Dashboard
          </Button>
          <Button size="lg" onClick={onViewCourse} className="h-11 px-6">
            View Course
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
