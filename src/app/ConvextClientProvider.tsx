"use client";

import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ReactNode } from "react";

import { convexReactClient } from "../lib/utils";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convexReactClient} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
