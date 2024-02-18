import {useState} from 'react';

import { useNavigate } from "react-router-dom";

import { Input, Select, Option, Button } from '@material-tailwind/react';

import { convex } from '~/lib/utils';
import { api } from '~/convex/_generated/api';
    

function Onboarding() {

    const [formData, setFormData] = useState({
        language: '',
        userName: '',
        knownLanguages: '',
        hobbies: '',
        purpose: '',
      });

    const handleChange = (e: any) => {
        if (!e.target) { return null; }
        const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
        };

        
    const navigate = useNavigate();

    const handleSubmit = async () => {
      console.log(formData);

      await convex.mutation(api.profiles.createProfile, {
        languageLearning: formData.language,
        userName: formData.userName,
        knownLanguages: formData.knownLanguages,
        interests: formData.hobbies,
        learningGoal: formData.purpose,
      });

      navigate("/");
    };


  return (
    <div className={'text-purple-500 min-h-[100vh] bg-white p-12'}>
      <h1 className={"text-3xl font-bold mb-15"}>Learning Preferences</h1>
      <div className="w-72 space-y-4">
        <p className={"my-5"}>Select the language you are trying to learn.</p>

        <Select
            variant="static" 
            label="" 
            placeholder="--Select Language--"
            name="language"
            value={formData.language}
            onChange={(value)=>handleChange({target:{name:"language",value}})}
        >
            <Option value="spanish">Spanish</Option>
        </Select>

        <p>
          Enter your first name.
        </p>
        <Input
          variant="static"
          size="lg"
          crossOrigin="anonymous"
          label=""
          placeholder="ex. Nick"
          name="userName"
          value={formData.userName}
          onChange={handleChange}

        />

        <p>
          Enter the languages you already know along with the number of years
          spoken. Insert in format langauge #, langauge #...
        </p>
        <Input
          variant="static"
          size="lg"
          crossOrigin="anonymous"
          label=""
          placeholder="ex. spanish 2, german 1"
          name="knownLanguages"
          value={formData.knownLanguages}
          onChange={handleChange}
        />

        <p>List any of your hobbies.</p>
        <Input
          variant="static"
          size="lg"
          crossOrigin="anonymous"
          label=""
          placeholder="ex. basketball cooking"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
        />

        <p>What are you trying to learn a langauge for?</p>
        <Input
          variant="static"
          size="lg"
          crossOrigin="anonymous"
          label=""
          placeholder="ex. I am studying abroad this year"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <Button 
            variant="gradient" 
            size="md" 
            color="purple" 
            className="rounded-full" 
            ripple={false}
            onClick={handleSubmit}
            placeholder=""
        >
            SUBMIT
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
