import { Button } from "@material-tailwind/react";
import clsx from "clsx";

import { useState } from "react";

import AppBar from "~/components/AppBar.tsx";
import Header from "~/components/Header";

function HomePage() {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => setFullScreen(prevState => !prevState);

  return (
    <div className={clsx("gradient-bg transition", fullScreen && "opacity-0")}>
      <AppBar />
      <div className={clsx("px-8 transition")}>
        <Header contentFluency="Proficient" contentLang="Spanish" contentSmthn="Else" />

        <div
          className={
            "mx-auto flex h-64 w-64 flex-col items-center justify-center space-y-3 rounded-full bg-white shadow-xl"
          }
          id="prog-circ"
          style={{ boxShadow: "0px 4px 18px 8px rgba(0, 0, 0, 0.08), inset #ff8a613b 0px 4px 18px 8px" }}
        >
          <p className="text-lg font-medium">PROFICIENCY</p>
          <p className={"text-3xl font-bold text-[#ff8a61]"}>Superior</p>
          <p className="inter-font-black">🇪🇸 Spanish</p>
        </div>

        <div className={"flex justify-center pt-24"}>
          <Button
            onClick={toggleFullScreen}
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
