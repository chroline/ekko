"use client";

import { useUser } from "@clerk/clerk-react";
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { api } from "~/convex/_generated/api";
import { convexReactClient } from "~/lib/utils";

function Onboarding() {
  const [formData, setFormData] = useState({
    languageLearning: "",
    name: "",
    knownLanguages: "",
    interests: "",
    learningGoal: "",
  });
  const { user } = useUser();

  const handleChange = (e: any) => {
    if (!e.target) {
      return null;
    }
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleSubmit = async () => {
    await convexReactClient.mutation(api.profiles.createProfile, {
      languageLearning: formData.languageLearning,
      name: formData.name,
      knownLanguages: formData.knownLanguages,
      interests: formData.interests,
      learningGoal: formData.learningGoal,
      id: user!.id,
    });

    router.push("/");
  };

  return (
    <div className={"flex min-h-[100vh] flex-col items-center justify-center bg-white p-8"}>
      <div className={"my-16 text-center"}>
        <h1 className={"mb-15 text-3xl font-bold text-purple-500"}>Personalization</h1>
        <Typography variant="small" color="gray" className="mt-2 w-full font-normal" placeholder={undefined}>
          This information will help us personalize your learning experience.
        </Typography>
      </div>
      <div className="w-full max-w-xl space-y-4">
        <div className={"space-y-3"}>
          <p className={"text-sm"}>What should we call you?</p>
          <Input
            size="lg"
            crossOrigin="anonymous"
            label="ex. Tommy Trojan"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={"space-y-3"}>
          <p className={"text-sm"}>Select the language you are trying to learn.</p>
          <Select
            size={"lg"}
            label="Choose a language..."
            placeholder={undefined}
            name="languageLearning"
            value={formData.languageLearning}
            onChange={value => handleChange({ target: { name: "languageLearning", value } })}
          >
            <Option value="spanish">Spanish</Option>
          </Select>
        </div>

        <div className={"space-y-3"}>
          <p className={"text-sm"}>Why are you looking to practice this langauge?</p>
          <Textarea
            size="lg"
            placeholder="ex. I am studying abroad this year"
            name="learningGoal"
            value={formData.learningGoal}
            onChange={handleChange}
            className={"block"}
          />
        </div>
        <div className={"space-y-3"}>
          <p className={"text-sm"}>Specify any previous language knowledge.</p>
          <Textarea
            size="lg"
            placeholder={"ex. Native English speaker, proficient in German"}
            name="knownLanguages"
            value={formData.knownLanguages}
            onChange={handleChange}
            className={"block"}
          />
        </div>
        <div className={"space-y-3"}>
          <p className={"text-sm"}>List any of your interests.</p>
          <Textarea
            size="lg"
            placeholder="ex. basketball, cooking"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className={"block"}
          />
        </div>
        <div>
          <Button
            variant="gradient"
            size="md"
            color="purple"
            className="mb-16 mt-4 w-full"
            ripple={false}
            onClick={handleSubmit}
            placeholder=""
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
