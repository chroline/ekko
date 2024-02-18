import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Routes, Route } from "react-router-dom";

import AuthGuard from "~/components/AuthGuard.tsx";
import ChatPage from "~/pages/ChatPage.tsx";
import HomePage from "~/pages/HomePage.tsx";
import SignInPage from "~/pages/SignInPage.tsx";
import SignUpPage from "~/pages/SignUpPage.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Routes>
          <Route path={"/"} element={<AuthGuard />}>
            <Route index element={<HomePage />} />
            <Route path={"/chat"} element={<ChatPage />} />
          </Route>
          <Route path={"/auth/sign-in"} element={<SignInPage />} />
          <Route path={"/auth/sign-up"} element={<SignUpPage />} />
        </Routes>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
