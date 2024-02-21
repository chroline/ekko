import { create } from "zustand";

import Profile from "~/lib/types/Profile";

const useProfile = create<{
  profile: Profile | null | undefined;
  setProfile(profile: Profile): void;
}>()(set => ({
  profile: undefined,
  setProfile: profile => set({ profile }),
}));

export default useProfile;
