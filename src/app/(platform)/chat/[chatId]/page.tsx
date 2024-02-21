"use client";

import { useUser } from "@clerk/clerk-react";
import { Transition } from "@headlessui/react";
import { IconButton, Spinner } from "@material-tailwind/react";
import { Check, Microphone } from "@phosphor-icons/react";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useAsyncFn } from "react-use";

import { useEffect } from "react";

import AppBar from "~/components/AppBar";
import ChatBubble from "~/components/ChatBubble";
import { api } from "~/convex/_generated/api";
import Profile from "~/lib/types/Profile";
import useChatHistory from "~/lib/useChatHistory";
import useMicrophone from "~/lib/useMicrophone";
import useProfile from "~/lib/useProfile";
import { convexReactClient, playAudio } from "~/lib/utils";

async function generateFeedback(args: { chatId: string; message: string; languageLearning: string }) {
  console.log("feedback1");
  await fetch("/api/generate-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  console.log("feedback2");
}

async function saveKnowledge(args: { userId: string; message: string }) {
  await fetch("/api/save-knowledge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
}

async function performRecall(args: { userId: string; message: string }) {
  const res: string[] = await fetch("/api/perform-recall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then(v => v.json());

  return res;
}

async function generateResponse(args: {
  config: Omit<Profile, "name">;
  history: { message: string; isUser: boolean }[];
  message: string;
  knowledge: string[];
}) {
  const res: { text: string; mp3buffer: any } = await fetch("/api/generate-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then(v => v.json());

  return res;
}

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();

  const { history, addMessage, updateLastMessage, overrideHistory } = useChatHistory();

  const { connect, toggleMicrophone, microphone, caption } = useMicrophone();

  const { user } = useUser();
  const { profile } = useProfile();

  const [, generateResponseFn] = useAsyncFn(async () => {
    const _history = useChatHistory.getState().history;

    console.log(0);

    addMessage({ message: "", isUser: false, isLoading: true });

    // store user's message
    await convexReactClient.mutation(api.chats.addMessageToChat, {
      chatId: chatId!,
      // @ts-ignore
      message: { ..._history[_history.length - 1], isLoading: undefined },
    });

    console.log(1);

    let res: { text: string; mp3buffer: any };

    await Promise.all([
      (async () => {
        console.log("hello feedback");
        await generateFeedback({
          chatId: chatId!,
          message: _history[_history.length - 1].message,
          languageLearning: profile!.languageLearning,
        });
      })(),
      (async () => {
        console.log("hello generate");
        const relevantKnowledge = await performRecall({
          userId: user!.id,
          message: _history[_history.length - 1].message,
        });
        res = await generateResponse({
          config: profile,
          history: _history.slice(0, -1),
          message: _history[_history.length - 1].message,
          knowledge: relevantKnowledge,
        });

        saveKnowledge({ userId: user!.id, message: _history[_history.length - 1].message });
      })(),
    ]);

    console.log(2);

    addMessage({ message: res.text, isUser: false });
    await convexReactClient.mutation(api.chats.addMessageToChat, {
      chatId: chatId!,
      message: { message: res.text, isUser: false },
    });

    await playAudio(res.mp3buffer.data as Iterable<number>);
  }, [history]);

  async function onToggleRecord() {
    await toggleMicrophone();
    // microphone was previously off
    if (!microphone) {
      addMessage({ message: "", isUser: true, isLoading: true });
      await connect();
    }
    // microphone was previously on
    else {
      updateLastMessage({ isUser: true, isLoading: false });
      generateResponseFn();
    }
  }

  useEffect(() => {
    if (history.length === 0) {
      convexReactClient.query(api.chats.getChat, { chatId: chatId! }).then(data => overrideHistory(data!.messages));
    }
  }, [history.length]);

  useEffect(() => {
    if (history[history.length - 1]?.isLoading && history[history.length - 1].isUser && caption) {
      updateLastMessage({ message: caption, isUser: true, isLoading: true });
    }
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
        appear={true}
        show={history.length !== 0}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={"flex min-h-[100vh] flex-col bg-white"}>
          <div className={"fixed top-0 z-50 w-full bg-white"}>
            <AppBar />
          </div>
          <div className={"mt-16 flex-1 pb-20 pt-6"}>
            <div className={"space-y-4 px-4 pb-20 text-[#494949]"}>
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
              variant={"gradient"}
            >
              <Microphone className={"h-10 w-10"} weight={"duotone"} />
            </IconButton>
          </div>
          <div className={"fixed bottom-12 right-8 rounded-full"}>
            <IconButton
              size={"lg"}
              placeholder={undefined}
              className={clsx("p-4")}
              color={"green"}
              onClick={() => router.push(`/review/${chatId}`)}
              variant={"gradient"}
              disabled={history[history.length - 1]?.isLoading}
            >
              <Check className={"h-8 w-8"} weight={"bold"} />
            </IconButton>
          </div>
        </div>
      </Transition>
    </div>
  );
}
