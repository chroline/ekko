import { Fire } from "@phosphor-icons/react";

import useProfile from "~/lib/useProfile.ts";

function Header() {
  const { profile } = useProfile();

  return (
    <div className={"space-y-2 py-20 text-white"}>
      <h1 className={"text-center text-5xl font-bold"}>Hola, {profile!.name}</h1>

      <div className={"flex items-center justify-center space-x-1 font-medium text-white"}>
        <Fire weight="fill" className={"h-6 w-6"} />
        <p className={"text-lg"}>KEEP YOUR STREAK!</p>
      </div>
    </div>
  );
}

export default Header;
