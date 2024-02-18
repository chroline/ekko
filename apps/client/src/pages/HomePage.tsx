import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { useNavigate } from "react-router";

import { useState } from "react";

import AppBar from "~/components/AppBar.tsx";
import Header from "~/components/Header";

function HomePage() {
  const navigate = useNavigate();

  const [faded, setFaded] = useState(false);
  const startConvo = () => {
    setFaded(true);
    setTimeout(() => {
      navigate("/chat");
    }, 500);
  };

  return (
    <div className={clsx("gradient-bg transition", faded && "opacity-0")}>
      <AppBar />
      <div className={clsx("px-8 transition")}>
        <Header />

        <div
          className={
            "mx-auto flex h-64 w-64 flex-col items-center justify-center space-y-3 rounded-full bg-white shadow-xl"
          }
          id="prog-circ"
          style={{ boxShadow: "0px 4px 18px 8px rgba(0, 0, 0, 0.08), inset #ff8a613b 0px 4px 18px 8px" }}
        >
          <p className={"text-lg font-medium text-[#ff8a61]"}>PROFICIENCY</p>
          <p className={"text-3xl font-bold text-[#ff8a61]"}>Superior</p>
          <p className={"inter-font-black text-[#3b3b3b]"}>🇪🇸 Spanish</p>
        </div>

        <div className={"flex justify-center pt-24"}>
          <Button
            onClick={startConvo}
            color={"purple"}
            variant={"gradient"}
            size={"lg"}
            className={"rounded-full"}
            placeholder={undefined}
          >
            START CONVERSATION
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
