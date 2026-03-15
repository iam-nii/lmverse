"use client";
import { motion } from "framer-motion";
import type { MainContentProps, MenuItemId } from "@/types/types";
import React from "react";

// Pages
import Settings from "./Settings";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Teachers from "./Teachers";
import Subscriptions from "./Subscriptions";

// Dynamic imports

const components: Partial<Record<MenuItemId, React.ComponentType>> = {
  dashboard: Dashboard,
  courses: Courses,
  teachers: Teachers,
  profile: Profile,
  settings: Settings,
  subscription: Subscriptions,
};

export const MainContent = ({ selectedItem }: MainContentProps) => {
  const Component = components[selectedItem] || Dashboard;
  return (
    <motion.main>
      <Component />
    </motion.main>
  );
};
