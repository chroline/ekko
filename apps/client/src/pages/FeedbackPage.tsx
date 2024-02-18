import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";

import FeedbackDisplay from "../components/FeedbackDisplay.tsx";

function FeedbackPage() {
  const navigate = useNavigate();

  return (
    <div className={"min-h-[100vh] bg-gradient-to-tr from-purple-300 to-purple-500 p-12 text-white"}>
      <div>
        <h1 className={"mb-6 text-3xl font-bold"}>Feedback</h1>
        <FeedbackDisplay />
      </div>

      <div className={"mt-6 flex gap-2"}>
        <Button variant={"outlined"} size="lg" placeholder="" onClick={() => navigate("/")}>
          HOME
        </Button>
        <Button variant={"gradient"} size="lg" className={"w-full"} placeholder="" onClick={() => navigate("/chat")}>
          PRACTICE AGAIN
        </Button>
      </div>
    </div>
  );
}

export default FeedbackPage;
