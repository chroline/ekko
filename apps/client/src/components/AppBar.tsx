import { User } from "@phosphor-icons/react";
import Hamburger from "hamburger-react";

import { useState } from "react";

export default function AppBar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={"flex h-16 items-center justify-between px-4"}>
      <Hamburger color="#fff" size={25} toggled={isOpen} toggle={setOpen} />

      <p className={"text-xl font-bold text-white"}>EKKO</p>

      <div className={"p-2"}>
        <User className={"h-7 w-7 text-white"} />
      </div>
    </div>
  );
}
