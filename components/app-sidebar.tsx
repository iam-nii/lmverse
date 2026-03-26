"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { logo } from "@/constants/images";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useAuthStore } from "@/store/AuthStore";
import LocaleSwitcher from "./LocaleSwitcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const userRole = user?.user_metadata?.role;
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `${userRole}`,
        icon: IconDashboard,
      },
      {
        title: "Courses",
        url: `${userRole}/courses`,
        icon: IconListDetails,
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Image
                  src={logo}
                  alt="logo"
                  className="cursor-pointer size-8"
                />
                <span className="text-base font-semibold">LmVerse.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <LocaleSwitcher triggerClassName="w-full bg-secondary hover:opacity-90 hover:bg-secondary " />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
