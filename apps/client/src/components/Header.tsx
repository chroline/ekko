import { Fire } from "@phosphor-icons/react";

function Header() {
  return (
    <div className={"space-y-2 py-20 text-white"}>
      <h1 className={"text-center font-bold"}>Hola, Nick</h1>

      <div className={"flex items-center justify-center space-x-1 font-medium text-white"}>
        <Fire weight="fill" className={"h-6 w-6"} />
        <p className={"text-lg"}>5 DAY STREAK</p>
      </div>
    </div>
  );
}

export default Header;
