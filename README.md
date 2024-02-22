# Ekko

**Elevate your foreign language fluency with tailored guidance and individualized verbal conversation practice on Ekko.**

## Inspiration
Multilingualism is in. In today’s interconnected world, the ability to communicate in multiple languages is not only valuable, but imperative to personal and professional success. Whether it be conversing with business professionals during international commerce exchanges, preparing for standardized school language exams, serving as a journalist or diplomat on the international stage, or simply wanting to converse more fluently with your loved ones, everybody can benefit from conversing in a foreign language. However, traditional curriculum-based language learning methods rely on repetitive exercises and  lack personalization, overlooking verbal fluency markers such as verbal precision, language variation, and personal goals. A key indication of an advanced speaker is the ability to engage in debates and convey subtle shades of meaning effectively, a skill that cannot be developed solely through the use of apps centered around memorization.

As a 2nd generation Mandarin and Cantonese speaker, one of our team members realized firsthand how difficult it was to maintain fluency of foreign languages in university. Additionally, while visiting her grandmother in the ICU at a reputable San Francisco hospital, another team member noticed that it was frustrating—and potentially life threatening—for non-English speaking patients to communicate their needs to care providers since these care providers are not trained conversationally since they received very rudimentary academic foreign language training. Although these bilingual care providers were technically licensed to care for non-English speaking patients, most of them who learned the foreign language as a second language were unable to demonstrate spoken proficiency and cultural awareness outside of a classroom context. These experiences all led us to develop Ekko.

Whether you’re a busy professional looking to enhance your global marketability or a student aiming to broaden your cultural horizons during study abroad, Ekko enables you to access verbal language practice anytime, anywhere, offering you the personalization and flexibility to learn at your own pace and develop as a global citizen.

## What it does
Introducing **Ekko**:  a personalized real time AI vocal chatbot that assesses your vocal language fluency.

With Ekko, you only talk about what you actually want to talk about. Once you enter your basic onboarding information into Ekko such as your learning goals and interests, the app will then prompt you to a simple user interface where you can start your conversation. After each response, Ekko will then give personalized feedback on your conversational performance by catching your errors and providing you with an ACTFL based proficiency level. Conversations and feedback are personalized to your learning goals; for example, if you are using Ekko to prepare for career oriented work purposes, Ekko would generate prompts that you’d likely encounter in the workplace and the feedback would likely be centered around making your diction more formal. Similarly, if you were simply using Ekko to converse with friends and family, conversation topics and corrections provided by the chatbot would be more casual.

Ekko saves your speaking errors and transfers those language specific content errors to tailor feedback to your language learning goals. For example, if you were to say _“me llamo es Cole”_ as opposed to the correct version: _“me llamo Cole”_, Ekko would save that error to check in the future. Using this unique feature, Ekko also makes connections between your learning language of interest and languages you currently speak (inputted during the onboarding process), drawing parallels between the two.

Similarly, if you were to consecutively respond with singular word responses, Ekko would suggest that you vary your sentence structure to maximize the effectiveness of the conversation.

Unlike pre-existing language learning applications such as Duolingo, Ekko is _not_ based on a curriculum, meaning that you take full reign of the conversation and practice.

## How we built it
To make Ekko as capable as possible, we used a combination of many AI and machine learning technologies—most of which we had never used before.

Because Ekko’s main value proposition is its conversational aspect, it was important that conversing with the platform is as natural as possible. This included using a state-of-the-art text-to-speech model, powered by ElevenLabs, as well as speech-to-text, powered by Deepgram. The combination of these two technologies made natural conversation on Ekko a seamless experience.

Processing speed was also of utmost importance to us to make the conversations feel natural. Hence, the obvious choice for us was to power our backend using Bun. Specifically, we’re running an Elysia.js server to interface with our ML and large language models for incredibly fast performance. This strategic choice contributed to Ekko's impressive performance and responsiveness during interactions.

Regarding large language models, Ekko chose to go full open-source thanks to Together.AI. We’re using the "NousResearch/Nous-Hermes-2-Yi-34B" model to generate responses from the AI agent, as well as "togethercomputer/m2-bert-80M-32k-retrieval" for text embeddings. These models were blazingly fast and out-performed the multitude of other models we tested for these purposes.

To store the data we collected, we chose to use the Convex.dev platform. We’re leveraging their database and authentication services, as well as function calling and vector database. Using Convex enabled us to build a complex platform with many simultaneous and interconnected processes in such a limited time span.

In order to classify the user’s proficiency, we built a text classification model using scikit learn. To train this model, we generated a synthetic dataset of hypothetical conversations that corresponded to specific ACTFL Proficiency guidelines using Together.AI’s "NousResearch/Nous-Hermes-2-Yi-34B" model. This model, hosted on GCP Vertex AI platform, enables us to specifically denote the user’s progress as they reach fluency.

Altogether, Ekko's development is characterized by a comprehensive integration of state-of-the-art technologies. The emphasis on natural conversation, swift processing, open-source language models, efficient data handling through Convex.dev, and a proficiency-classifying text model collectively contribute to Ekko's prowess as an advanced conversational language learning platform powered by frontier tech.

## Challenges we ran into
One of the major challenges we encountered was finding an adequate fluency metric to score user responses. While percentages and other numerical metrics seemed like an obvious choice, this would also mean that the longer a user were to maintain a conversation (typically holding a longer conversation is a good thing when practicing foreign languages), the higher percent error they’d receive, thus deterring users from talking for longer periods of time. We eventually settled on the idea of using qualitative feedback based on the well-established ACTFL Language Speaking category rankings that contained specific comprehension and fluency requirements under each conversation difficulty level. The scoring would be based off the average ACTFL score of the five most recent responses provided.

Our team also raised larger scale questions pertaining to stuttering and speech impediments, as many fluent speakers often naturally stutter while talking and the STT model could interpret that as lack of fluency. Moreover, usage of slang is also something that we need to look into a bit further, as the current system struggles to interpret colloquial vernacular.

## What we learned
Through developing Ekko, we learned that different languages present different challenges with TTS that we must reconsider when building past our MVP.

We also learned the major advantages that active conversation has over repetitive exercises when practicing a foreign language, as active conversation provides learners the opportunity to contextual learning in practical and authentic situations through immediate correction while repetitive exercises solely focus on reinforcing specific patterns and foundational drills and lack spontaneity of real-life language.

## Contact(s)

Nick Marker: <a href="mailto:ncmarker@usc.edu">ncmarker@usc.edu</a>
<br/>
Cole Gawin: <a href="mailto:gawin@usc.edu">gawin@usc.edu</a>
<br/>
Angelina Choy: <a href="mailto:choyange@usc.edu">choyange@usc.edu</a>
<br/>

Project Link: <a href="#">temp</a>