import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className={
        "flex min-h-[100vh] flex-col items-center justify-center space-y-8 bg-gradient-to-t from-purple-300 to-purple-500"
      }
    >
      <h1 className={"font-heading text-5xl font-bold text-white"}>EKKO</h1>
      <SignIn
        path="/auth/sign-in"
        routing="path"
        signUpUrl="/auth/sign-up"
        appearance={{
          variables: {
            colorPrimary: "#9b61ff",
            colorText: "black",
          },
        }}
      />
    </div>
  );
}
