import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className={"flex min-h-[100vh] items-center justify-center"}>
      <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
    </div>
  );
}
