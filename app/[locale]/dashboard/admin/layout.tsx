"use client";
import { MenuItemId } from "@/types/types";
import { motion } from "framer-motion";

import { useState, type PropsWithChildren } from "react";
import { Sidebar } from "../pages/Sidebar";
import { MainContent } from "../pages/MainContent";

export default function AdminLayout({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<MenuItemId>("dashboard");
  const [sidebarOpen, setsidebarOpen] = useState(true);
  return (
    <motion.div className="flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setsidebarOpen(!sidebarOpen)}
        selected={selected}
        onSelect={setSelected}
      />
      <MainContent selectedItem={selected} />
    </motion.div>
  );
}
