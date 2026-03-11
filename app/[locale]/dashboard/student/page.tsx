"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LogoutButton } from "@/components/LogoutButtons";

const StudentsPage = () => {
  const t = useTranslations("studentDashboard");

  return (
    <div className="flex flex-col items-start gap-4">
      <LogoutButton/>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold text-primary"
      >
        {t("title")}
      </motion.h1>
      <p className="text-slate-600 dark:text-slate-400">
        Welcome to the students dashboard.
      </p>
    </div>
  );
};

export default StudentsPage;
