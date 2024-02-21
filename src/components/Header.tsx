import { Fire } from "@phosphor-icons/react";

import useProfile from "~/lib/useProfile";

function Header() {
  const { profile } = useProfile();

  return (
    <div
      className={
        "fixed left-0 top-0 flex h-[50vh] w-full flex-col items-center justify-center space-y-2 pb-24 text-white"
      }
    >
      <h1 className={"text-center text-5xl font-bold"}>Hola, {profile!.name}</h1>

      <div className={"flex items-center justify-center space-x-1 font-medium text-white"}>
        <Fire weight="fill" className={"h-6 w-6"} />
        <p className={"text-lg"}>KEEP YOUR STREAK!</p>
      </div>
    </div>
  );
}

export default Header;
