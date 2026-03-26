"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LogoutButton } from "@/components/LogoutButtons";

const TutorsPage = () => {
  const t = useTranslations("TutorDashboard");

  return (
    <div className="flex flex-col items-start gap-4">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold text-primary"
      >
        {t("title")}
      </motion.h1>
      <p className="text-slate-600 dark:text-slate-400">
        Welcome to the tutors dashboard.
      </p>
      <LogoutButton />
    </div>
  );
};

export default TutorsPage;
