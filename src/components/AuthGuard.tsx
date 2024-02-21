"use client";

import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import useProfile from "~/lib/useProfile";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const profile = useQuery(api.profiles.getProfile, { profileId: user?.id as Id<"profiles"> });
  const { profile: savedProfile, setProfile } = useProfile();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/auth/sign-in");
      }
      if (savedProfile === null && profile === null) {
        router.push("/onboarding");
      }
    }
  }, [isSignedIn, isLoaded, savedProfile, profile, router]);

  useEffect(() => {
    setProfile(profile);
  }, [profile]);

  if (!isLoaded || !isSignedIn || (!savedProfile && pathname !== "/onboarding")) {
    return null;
  }

  return <>{children}</>;
}
