"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@material-tailwind/react";

import "~/globals.css";
import theme from "~/lib/theme";

import ConvexClientProvider from "./ConvextClientProvider";

const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ConvexClientProvider>
            <ThemeProvider value={theme}>
              <main>{children}</main>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
