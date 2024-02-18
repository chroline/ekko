import { ArrowLeft, User } from "@phosphor-icons/react";
import clsx from "clsx";
import Hamburger from "hamburger-react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function AppBar() {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={clsx(
        "flex h-16 shrink-0 items-center justify-between px-4",
        pathname === "/" ? "text-white" : "relative z-10 text-purple-500 shadow-md"
      )}
    >
      {pathname === "/" ? (
        <Hamburger color={"#fff"} size={25} toggled={isOpen} toggle={setOpen} />
      ) : (
        <Link to={"/"} className={"p-2 text-purple-500"}>
          <ArrowLeft className={"h-7 w-7"} weight={"bold"} />
        </Link>
      )}

      <p className={"text-xl font-bold"}>EKKO</p>

      <div className={"p-2"}>
        <User className={"h-7 w-7"} weight={"bold"} />
      </div>
    </div>
  );
}
