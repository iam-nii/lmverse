import { Button } from "@/components/ui/button";
import { MenuItemId, SidebarProps } from "@/types/types";
import { logo, logoDark } from "@/constants/images";
import { useTheme } from "next-themes";
import {
  LucideProps,
  Monitor,
  Users,
  Notebook,
  Settings,
  User,
} from "lucide-react";
import { ComponentType, useEffect, useEffectEvent, useState } from "react";
import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";
import { LogoutButton } from "@/components/LogoutButtons";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";

export const Sidebar = ({
  isOpen,
  onToggle,
  selected,
  onSelect,
}: SidebarProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const handleMounted = useEffectEvent(() => setMounted(true));
  const t = useTranslations();

  const menuItems: {
    id: MenuItemId;
    label: string;
    icon: ComponentType<LucideProps>;
  }[] = [
    {
      id: "dashboard",
      label: t("adminDashboard.routes.dashboard"),
      icon: Monitor,
    },
    {
      id: "courses",
      label: t("adminDashboard.routes.courses"),
      icon: Notebook,
    },
    { id: "teachers", label: t("adminDashboard.routes.teachers"), icon: Users },
    {
      id: "settings",
      label: t("adminDashboard.routes.settings"),
      icon: Settings,
    },
    { id: "profile", label: t("adminDashboard.routes.profile"), icon: User },
  ];

  useEffect(() => {
    handleMounted();
  }, []);

  if (!mounted) return null;
  return (
    <aside
      className={`
    flex flex-col
    ${isOpen ? "min-w-80" : "min-w-16"}
    transition-all duration-200
    overflow-hidden
    border-border
    bg-secondary
    rounded-3xl
    py-8
    sticky top-0
    shadow-lg shadow-black/20
  `}
    >
      {/* Top section */}
      <div className="flex items-center justify-between px-4 mb-8">
        <Image
          src={logo}
          alt="logo"
          width={42}
          height={42}
          onClick={onToggle}
          className="cursor-pointer"
        />

        {isOpen && <ThemeSwitch />}
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = selected === item.id;

          return (
            <li
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
            flex items-center
            ${isOpen ? "justify-start gap-3 px-4" : "justify-center"}
            py-3 mx-2
            rounded-2xl
            cursor-pointer
            transition-colors
            ${
              active
                ? "bg-[#1f1f1f] text-white dark:bg-[#dcdcdc] dark:text-black"
                : "hover:bg-[#3a3a3a] dark:hover:bg-[#e6e6e6]"
            }
          `}
            >
              <Icon size={20} />

              {isOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div
        className={`flex flex-col gap-2 items-center justify-center px-5 mt-40 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <LocaleSwitcher triggerClassName="w-full bg-secondary hover:opacity-90 hover:bg-secondary " />
        <LogoutButton className="w-full" />
      </div>
    </aside>
  );
};
