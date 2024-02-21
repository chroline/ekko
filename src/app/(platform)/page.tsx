"use client";

import { useUser } from "@clerk/clerk-react";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import tinycolor from "tinycolor2";

import { useEffect, useState } from "react";

import AppBar from "~/components/AppBar";
import Header from "~/components/Header";
import { api } from "~/convex/_generated/api";
import proficiencyColorMap from "~/lib/proficiencyColorMap";

export default function DashboardPage() {
  const router = useRouter();

  const { user } = useUser();

  const proficiencyLevel = useQuery(api.chats.getChatsProficiencyLevel, { userId: user!.id }) || "Novice";

  const [faded, setFaded] = useState(true);
  const startConvo = () => {
    setFaded(true);
    setTimeout(() => {
      router.push("/chat");
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => setFaded(false), 100);
  }, []);

  return (
    <div className={clsx("gradient-bg transition", faded && "opacity-0")}>
      <AppBar />
      <div className={clsx("px-8 transition")}>
        <Header />

        <div
          className={`mx-auto flex h-64 w-64 flex-col items-center justify-center space-y-3 rounded-full bg-white shadow-xl`}
          style={{
            color: proficiencyColorMap[proficiencyLevel as keyof typeof proficiencyColorMap],
            boxShadow: `0px 5px 20px 10px rgba(0, 0, 0, 0.08), inset ${tinycolor(
              proficiencyColorMap[proficiencyLevel as keyof typeof proficiencyColorMap]
            )
              .setAlpha(0.2)
              .toString()} 0px 5px 20px 10px`,
          }}
        >
          <p className={"text-lg font-medium"}>PROFICIENCY</p>
          <p className={"text-3xl font-bold"}>{proficiencyLevel}</p>
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
