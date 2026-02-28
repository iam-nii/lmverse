"use client";

import { useState } from "react";
import { MenuCloseIcon } from "@/components/ui/animated-state-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIntlayer } from "next-intlayer";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitch from "./ThemeSwitch";

function NavMenuSheet() {
  const [open, setOpen] = useState(false);
  const navMenu = useIntlayer("navMenu");
  const courses = useIntlayer("courses");
  const buttons = useIntlayer("buttons");

  const close = () => setOpen(false);

  const navLinks = [
    { label: navMenu.home.label, href: navMenu.home.href.value },
    { label: navMenu.dashboard.label, href: navMenu.dashboard.href.value },
    { label: navMenu.work.label, href: navMenu.work.href.value },
    { label: navMenu.contactUs.label, href: navMenu.contactUs.href.value },
  ];

  const courseLinks = [
    { label: courses.genEng.label, href: courses.genEng.href.value },
    { label: courses.businessEng.label, href: courses.businessEng.href.value },
    { label: courses.techEng.label, href: courses.techEng.href.value },
    { label: courses.intExams.label, href: courses.intExams.href.value },
    { label: courses.rusExam.label, href: courses.rusExam.href.value },
  ];

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeSwitch />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <MenuCloseIcon isOpen={open} size={24} className="text-slate-800 dark:text-white" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72 flex flex-col">
          <SheetHeader className="text-left pb-4 border-b border-border">
            <SheetTitle className="text-lg font-bold">Lmverse</SheetTitle>
          </SheetHeader>

          {/* Main nav links */}
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="text-base font-medium px-2 py-2.5 rounded-lg hover:bg-muted hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Courses sub-section */}
          <div className="border-t border-border pt-4">
            <p className="text-xs uppercase font-semibold text-muted-foreground px-2 mb-2 tracking-wider">
              Courses
            </p>
            <div className="flex flex-col gap-1">
              {courseLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="text-sm px-2 py-2 rounded-lg hover:bg-muted hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-auto border-t border-border pt-4 flex flex-col gap-3">
            <LocaleSwitcher />
            <Link href="/login" className="w-full" onClick={close}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold">
                {buttons.signIn}
              </Button>
            </Link>
            <Link href="/signup" className="w-full" onClick={close}>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold">
                {buttons.register}
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NavMenuSheet;
