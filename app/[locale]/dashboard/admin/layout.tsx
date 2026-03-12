"use client";
import { MenuItemId } from "@/types/types";
import { motion } from "framer-motion";

import { useState, type PropsWithChildren } from "react";
import { Sidebar } from "../components/Sidebar";


export default function AdminLayout({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<MenuItemId>('Dashboard');
  const [sidebarOpen, setsidebarOpen] = useState(true);
  return (
    <motion.div className="flex">
      <Sidebar
       isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selected={selected}
        onSelect={setSelected}
      />

    </motion.div>
  );
}
