import { useAuth } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "@phosphor-icons/react";
import clsx from "clsx";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

export default function AppBar() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div
      className={clsx(
        "sticky z-20 flex h-16 shrink-0 items-center justify-between px-4",
        pathname === "/" ? "text-white" : "relative z-10 text-purple-500 shadow-md"
      )}
    >
      {pathname === "/" ? (
        <Hamburger color={"#fff"} size={25} toggled={isOpen} toggle={setOpen} />
      ) : (
        <Link href={"/"} className={"p-2 text-purple-500"}>
          <ArrowLeft className={"h-7 w-7"} weight={"bold"} />
        </Link>
      )}

      <p className={"absolute left-1/2 -translate-x-1/2 font-heading text-xl font-bold"}>EKKO</p>

      <UserButton afterSignOutUrl={"/auth/sign-in"} />
    </div>
  );
}
