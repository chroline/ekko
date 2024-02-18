import { useUser } from "@clerk/clerk-react";
import { Transition } from "@headlessui/react";
import { IconButton, Spinner } from "@material-tailwind/react";
import { Check, Microphone } from "@phosphor-icons/react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import { useAsyncFn } from "react-use";

import { useEffect } from "react";

import Profile from "@app/common/types/Profile.ts";

import AppBar from "~/components/AppBar.tsx";
import ChatBubble from "~/components/ChatBubble.tsx";
import { api } from "~/convex/_generated/api";
import useChatHistory from "~/lib/useChatHistory.ts";
import useMicrophone from "~/lib/useMicrophone.ts";
import useProfile from "~/lib/useProfile.ts";
import { convex, playAudio } from "~/lib/utils.ts";

async function generateFeedback(args: { chatId: string; message: string; languageLearning: string }) {
  await fetch(import.meta.env.VITE_BACKEND_URL + "/platform/generate-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
}

async function saveKnowledge(args: { userId: string; message: string }) {
  await fetch(import.meta.env.VITE_BACKEND_URL + "/platform/save-knowledge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
}

async function performRecall(args: { userId: string; message: string }) {
  const res: string[] = await fetch(import.meta.env.VITE_BACKEND_URL + "/platform/perform-recall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then(v => v.json());

  console.log({ res });

  return res;
}

async function generateResponse(args: {
  config: Omit<Profile, "name">;
  history: string[];
  message: string;
  knowledge: string[];
}) {
  const res: { text: string; mp3buffer: any } = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/platform/generate-response",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }
  ).then(v => v.json());

  return res;
}

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();

  const { history, addMessage, updateLastMessage, overrideHistory } = useChatHistory();

  const { connect, toggleMicrophone, microphone, caption } = useMicrophone();

  const { user } = useUser();
  const { profile } = useProfile();

  const [, generateResponseFn] = useAsyncFn(async () => {
    const _history = useChatHistory.getState().history;

    addMessage({ message: "", isUser: false, isLoading: true });

    // store user's message
    await convex.mutation(api.chats.addMessageToChat, {
      chatId: chatId!,
      // @ts-ignore
      message: { ..._history[_history.length - 1], isLoading: undefined },
    });

    generateFeedback({
      chatId: chatId!,
      message: _history[_history.length - 1].message,
      languageLearning: profile!.languageLearning,
    });

    const relevantKnowledge = await performRecall({ userId: user!.id, message: _history[_history.length - 1].message });
    const res: { text: string; mp3buffer: any } = await generateResponse({
      // @ts-ignore
      config: { ...profile, name: undefined },
      history: _history.slice(0, -1).map(({ message }) => message),
      message: _history[_history.length - 1].message,
      knowledge: relevantKnowledge,
    });

    saveKnowledge({ userId: user!.id, message: _history[_history.length - 1].message });

    addMessage({ message: res.text, isUser: false });
    await convex.mutation(api.chats.addMessageToChat, {
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
      convex.query(api.chats.getChat, { chatId: chatId! }).then(data => overrideHistory(data!.messages));
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
              onClick={() => navigate(`/review/${chatId}`)}
              variant={"gradient"}
            >
              <Check className={"h-8 w-8"} weight={"bold"} />
            </IconButton>
          </div>
        </div>
      </Transition>
    </div>
  );
}
