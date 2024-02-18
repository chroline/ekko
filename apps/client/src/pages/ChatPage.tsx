import { Transition } from "@headlessui/react";
import { IconButton, Spinner } from "@material-tailwind/react";
import { Microphone } from "@phosphor-icons/react";
import clsx from "clsx";
import { useAsyncFn } from "react-use";

import { useEffect, useState } from "react";

import AppBar from "~/components/AppBar.tsx";
import ChatBubble from "~/components/ChatBubble.tsx";
import useMicrophone from "~/lib/useMicrophone.ts";
import { playAudio } from "~/lib/utils.ts";

export default function ChatPage() {
  const [initChat, setInitChat] = useState(false);
  const [history, setHistory] = useState<{ message: string; isUser: boolean; isLoading?: boolean }[]>([]);

  const { connect, toggleMicrophone, microphone, caption } = useMicrophone();

  const [generateResponseState, generateResponseFn] = useAsyncFn(async () => {
    const res: { text: string; mp3buffer: any } = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/platform/generate-response",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            languageLearning: "Spanish",
            knownLanguages: "English",
            interests: "soccer, coding, art",
            learningGoal: "I want to learn spanish to be able to better communicate during my trip to Mexico",
            proficiencyLevel: "Novice Low",
          },
          history: history.length > 0 ? history.slice(0, -1).map(({ message }) => message) : [],
          message: history.length > 0 ? history[history.length - 1].message : undefined,
        }),
      }
    ).then(v => v.json());

    setHistory(history => {
      if (history[history.length - 1]?.isLoading) {
        history.pop();
        return [...history, { message: res.text, isUser: false, isLoading: false }];
      } else return [...history, { message: res.text, isUser: false }];
    });

    await playAudio(res.mp3buffer.data as Iterable<number>);
  }, [setHistory, history]);

  useEffect(() => {
    if (!initChat) {
      setInitChat(true);
      generateResponseFn();
    }
  }, [generateResponseFn]);

  async function onToggleRecord() {
    await toggleMicrophone();
    // microphone was previously off
    if (!microphone) {
      setHistory(history => [...history, { message: "", isUser: true, isLoading: true }]);
      await connect();
    }
    // microphone was previously on
    else {
      generateResponseFn();
      setHistory(history => [...history, { message: "", isUser: false, isLoading: true }]);
    }
  }

  useEffect(() => {
    setHistory(history => {
      if (history.length === 0) return [];

      if (history[history.length - 1].isLoading && history[history.length - 1].isUser && caption) {
        history.pop();
        return [...history, { message: caption, isUser: true, isLoading: true }];
      } else return history;
    });
  }, [caption]);

  return (
    <div className={"flex min-h-[100vh] flex-col bg-white"}>
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
      <Transition
        show={history.length !== 0}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={"flex min-h-[100vh] flex-col bg-white"}>
          <div className={"fixed top-0 w-full z-50 bg-white"}>
            <AppBar/>
           </div>
          <div className={"flex-1 pb-20 pt-6 mt-16"}>
            <div className={"space-y-4 px-4 text-[#494949]"}>
              {history.map((message, i) => (
                <ChatBubble key={i} message={message.message} isUser={message.isUser} />
              ))}
            </div>
          </div>
          <div className={"fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full"}>
            <IconButton
              size="lg"
              placeholder={undefined}
              className={clsx("rounded-full p-10", (history.length === 1 || microphone) && "animate-magnet")}
              color={microphone ? "red" : "purple"}
              onClick={onToggleRecord}
            >
              <Microphone className={"h-10 w-10"} weight={"duotone"} />
            </IconButton>
          </div>
        </div>
      </Transition>
    </div>
  );
}
