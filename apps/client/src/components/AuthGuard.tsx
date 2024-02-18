import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { useEffect } from "react";

import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import useProfile from "~/lib/useProfile.ts";

export default function AuthGuard() {
  const { pathname } = useLocation();
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const profile = useQuery(api.profiles.getProfile, { profileId: user?.id as Id<"profiles"> });
  const { profile: savedProfile, setProfile } = useProfile();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate("/auth/sign-in");
      }
      if (savedProfile === null && profile === null) {
        navigate("/onboarding");
      }
    }
  }, [isSignedIn, isLoaded, savedProfile, profile, navigate]);

  useEffect(() => {
    setProfile(profile);
  }, [profile]);

  console.log({ isLoaded, savedProfile }, !isLoaded || (!savedProfile && pathname !== "/onboarding"));

  if (!isLoaded || (!savedProfile && pathname !== "/onboarding")) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
