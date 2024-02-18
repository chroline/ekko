import { create } from "zustand";

import Profile from "@app/common/types/Profile";

const useChatHistory = create<{
  profile: Profile | null | undefined;
  setProfile(profile: Profile): void;
}>()(set => ({
  profile: undefined,
  setProfile: profile => set({ profile }),
}));

export default useChatHistory;
