import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { Outlet, useNavigate } from "react-router";

import { useEffect } from "react";

import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import useProfile from "~/lib/useProfile.ts";

export default function AuthGuard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const profile = useQuery(api.profiles.getProfile, { profileId: user?.id as Id<"profiles"> });
  const { profile: savedProfile, setProfile } = useProfile();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate("/auth/sign-in");
      }
      if (savedProfile === null) {
        navigate("/onboarding");
      }
    }
  }, [isSignedIn, isLoaded, profile, navigate]);

  useEffect(() => {
    setProfile(profile);
  }, [profile]);

  if (!isLoaded || !savedProfile) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
