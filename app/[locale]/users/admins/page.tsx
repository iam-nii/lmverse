"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const AdminsPage = () => {
    // const t = useTranslations("admins");

    return (
        <div className="flex flex-col items-start gap-4">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold text-primary"
            >
                Admins
            </motion.h1>
            <p className="text-slate-600 dark:text-slate-400">
                Welcome to the Admins dashboard.
            </p>
        </div>
    );
};

export default AdminsPage;
