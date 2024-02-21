import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className={
        "flex min-h-[100vh] flex-col items-center justify-center space-y-8 bg-gradient-to-t from-purple-300 to-purple-500"
      }
    >
      <h1 className={"font-heading text-5xl font-bold text-white"}>EKKO</h1>
      <SignUp
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
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
