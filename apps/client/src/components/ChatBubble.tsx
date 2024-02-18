import { Spinner } from "@material-tailwind/react";
import { PersonArmsSpread, Robot } from "@phosphor-icons/react";
import clsx from "clsx";

export default function ChatBubble({ message, isUser }: { message: string; isUser: boolean }) {
  return (
    <div className={clsx("flex max-w-[80%] items-end space-x-2", isUser && "ml-auto flex")}>
      {isUser ? (
        <>
          <p className={clsx("flex-1 rounded-md border-2 p-2")}>{message}</p>
          <PersonArmsSpread className={"h-8 w-8 text-purple-500"} weight="duotone" />
        </>
      ) : (
        <>
          <Robot className={"h-8 w-8 text-purple-500"} weight="duotone" />
          {message === "" ? (
            <Spinner className={"h-8 w-8"} />
          ) : (
            <p className={clsx("flex-1 rounded-lg bg-gray-200 p-2")}>{message}</p>
          )}
        </>
      )}
    </div>
  );
}
