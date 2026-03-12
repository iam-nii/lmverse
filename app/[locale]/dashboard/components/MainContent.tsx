"use client";
import { motion } from "framer-motion"
import type { MainContentProps, MenuItemId } from "@/types/types";
import dynamic from "next/dynamic";
import React from "react";
import Settings from "./Settings";
import Profile from "./Profile";


// Dynamic imports
const Dashboard = dynamic (()=> import ('./Dashboard'));
const Courses = dynamic (()=> import ('./Courses'));
const Teachers = dynamic (()=> import ('./Teachers'));
const Subscriptions = dynamic(()=> import('./Subscriptions'));

const components: Partial<Record<MenuItemId, React.ComponentType>> = {
    dashboard: Dashboard,
    courses: Courses,
    teachers: Teachers,
    profile: Profile,
    settings: Settings,
    subscription: Subscriptions
}

export const MainContent = ({selectedItem}: MainContentProps)=>{
    const Component = components[selectedItem] || Dashboard
    return (
        <motion.main>
            <Component/>
        </motion.main>
    )
}