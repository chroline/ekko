"use client";

import { useUser } from "@clerk/clerk-react";
import { Transition } from "@headlessui/react";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useAsync } from "react-use";

import useChatHistory from "~/lib/useChatHistory";
import useProfile from "~/lib/useProfile";
import { playAudio } from "~/lib/utils";

export default function InitChatPage() {
  const { user } = useUser();
  const { history, addMessage, clearHistory } = useChatHistory();
  const router = useRouter();

  const { profile } = useProfile();

  useAsync(async () => {
    if (!user) return;

    clearHistory();

    const res: {
      chatId: string;
      initialMessage: {
        text: string;
        mp3buffer: any;
      };
    } = await fetch("/api/init-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        config: { ...profile, name: undefined },
        userId: user.id,
      }),
    }).then(v => v.json());

    addMessage({ message: res.initialMessage.text, isUser: false });

    setTimeout(() => router.push(`/chat/${res.chatId}`), 500);

    await playAudio(res.initialMessage.mp3buffer.data as Iterable<number>);
  }, [user]);

  return (
    <div className={"flex min-h-[100vh] flex-col"}>
      <Transition
        appear={true}
        show={history.length === 0}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={"fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"}>
          <Spinner className="h-20 w-20" color={"purple"} />
        </div>
      </Transition>
    </div>
  );
}
