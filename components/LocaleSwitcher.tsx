"use client";

import { FC } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { eng, rus, fr } from "@/constants/images";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
type triggerProps = {
  triggerClassName?: string;
};
const LocaleSwitcher: FC<triggerProps> = ({ triggerClassName }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const availableLocales = routing.locales;

  const setLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const languages: Record<string, { label: string; locale: string }> = {
    en: { label: "English", locale: "en" },
    ru: { label: "Русский", locale: "ru" },
    fr: { label: "Français", locale: "fr" },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2 cursor-pointer"
        >
          <Image
            src={locale === "en" ? eng : locale === "ru" ? rus : fr}
            alt={languages[locale]?.label || "Language"}
            width={20}
            height={20}
          />
          <p className="text-muted-foreground">
            {languages[locale]?.label || "ENG"}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit align-start">
        <DropdownMenuGroup>
          {availableLocales.map((loc) => (
            <DropdownMenuItem key={loc}>
              <Button
                variant="ghost"
                onClick={() => setLocale(loc)}
                className="w-full flex align-start justify-between"
              >
                <Image
                  src={loc === "en" ? eng : loc === "ru" ? rus : fr}
                  alt={languages[loc]?.label || loc}
                  width={20}
                  height={20}
                />
                {languages[loc]?.label || loc}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
