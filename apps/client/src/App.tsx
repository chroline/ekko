import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";

import AuthGuard from "~/components/AuthGuard.tsx";
import { convex } from "~/lib/utils.ts";
import ChatPage from "~/pages/ChatPage.tsx";
import FeedbackPage from "~/pages/FeedbackPage.tsx";
import HomePage from "~/pages/HomePage.tsx";
import InitChatPage from "~/pages/InitChatPage.tsx";
import Onboarding from "~/pages/Onboarding.tsx";
import SignInPage from "~/pages/SignInPage.tsx";
import SignUpPage from "~/pages/SignUpPage.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Routes>
          <Route path={"/"} element={<AuthGuard />}>
            <Route index element={<HomePage />} />
            <Route path={"/chat"}>
              <Route index element={<InitChatPage />} />
              <Route path={"/chat/:chatId"} element={<ChatPage />} />
            </Route>
            <Route path={"/onboarding"} element={<Onboarding />} />
            <Route path={"/review/:chatId"} element={<FeedbackPage />} />
          </Route>
          <Route path={"/auth/sign-in/*"} element={<SignInPage />} />
          <Route path={"/auth/sign-up/*"} element={<SignUpPage />} />
        </Routes>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
