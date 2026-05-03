import type { PropsWithChildren, FC } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html suppressHydrationWarning>
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
