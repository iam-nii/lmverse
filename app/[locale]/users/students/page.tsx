"use client";

import { type NextPageIntlayer } from "next-intlayer";
import { useIntlayer } from "next-intlayer";
import { motion } from "framer-motion";

const StudentsPage: NextPageIntlayer = () => {
  const { title } = useIntlayer("students");

  return (
    <div className="flex flex-col items-start gap-4">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold text-primary"
      >
        {title as unknown as string}
      </motion.h1>
      <p className="text-slate-600 dark:text-slate-400">
        Welcome to the students dashboard.
      </p>
    </div>
  );
};

export default StudentsPage;
