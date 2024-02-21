import { WarningCircle } from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { useEffect } from "react";

import { api } from "~/convex/_generated/api";
import proficiencyColorMap from "~/lib/proficiencyColorMap";
import proficiencyScoreMap from "~/lib/proficiencyScoreMap";
import { convexReactClient } from "~/lib/utils";

function FeedbackDisplay() {
  const { chatId } = useParams<{ chatId: string }>();

  const data: { message: string; feedback: string; proficiency: string }[] | undefined = useQuery(
    api.feedbacks.getFeedbacksFromChat,
    { chatId: chatId! }
  );

  const overallScore = Math.round(
    (data
      ?.map(v => v.proficiency)
      .map(v => proficiencyScoreMap[v as keyof typeof proficiencyScoreMap])
      .reduce((a, b) => a + b, 0) || 0) / (data?.length || 1)
  );
  const proficiencyLevel =
    Object.entries(proficiencyScoreMap).filter(([_, score]) => score === overallScore)[0]?.[0] || "Novice";

  useEffect(() => {
    if (!!data) {
      convexReactClient.mutation(api.chats.setChatProficiencyLevel, { chatId: chatId!, proficiencyLevel });
    }
  }, [chatId, data]);

  return (
    <div>
      <p>Here's some feedback and corrections on your past conversation:</p>
      <div className={"pt-4"}>
        {data?.map((message, i) => <ErrorCard key={i} errName={message.message} errDescription={message.feedback} />)}
      </div>
      {data && (
        <div
          className={"flex w-full flex-col gap-2 rounded-lg p-5 text-center shadow-lg"}
          style={{ background: proficiencyColorMap[proficiencyLevel as keyof typeof proficiencyColorMap] }}
        >
          <p className={"font-medium"}>PROFICIENCY SCORE:</p>
          <p className={"text-3xl font-bold"}>{proficiencyLevel}</p>
          <p className={"font-sm font-semibold"}>Nice work!</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackDisplay;

function ErrorCard(props: any) {
  return (
    <div className={"border-slate-950 mb-4 mt-2 rounded-xl bg-white p-4 drop-shadow-lg"}>
      <WarningCircle className="-mt-1 mr-1 inline-block" size={20} fill="#904bff" />
      <h6 className={"inline-block font-semibold text-purple-600"}>{props.errName}</h6>
      <p className={"ml-6 whitespace-pre-line text-purple-600"}>{props.errDescription}</p>
    </div>
  );
}
