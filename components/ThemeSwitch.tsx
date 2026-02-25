"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleMounted = useEffectEvent(() => setMounted(true));

  useEffect(() => {
    handleMounted();
  }, []);

  if (!mounted)
    return (
      <Button
        aria-label="Toggle theme button placeholder"
        variant="outline"
        size="icon"
        className="rounded-full"
      ></Button>
    );

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      suppressHydrationWarning={true}
      variant="outline"
      size="icon"
      className="rounded-full"
    >
      {resolvedTheme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
