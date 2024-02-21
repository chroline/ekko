import { ClerkProvider } from "@clerk/nextjs";

import "~/globals.css";

import ConvexClientProvider from "./ConvextClientProvider";

const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ConvexClientProvider>
            <main>{children}</main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
