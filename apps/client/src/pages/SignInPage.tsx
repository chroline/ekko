import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className={"flex min-h-[100vh] items-center justify-center"}>
      <SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
    </div>
  );
}
