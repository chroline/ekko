import generateResponse from "./generate-response";

export default async function initChat({
  config,
  userId,
}: {
  config: {
    languageLearning: string;
    knownLanguages: string;
    interests: string;
    learningGoal: string;
    proficiencyLevel: string;
  };
  userId: string;
}) {
  const initialMessage = await generateResponse({ config, history: [] });
}
