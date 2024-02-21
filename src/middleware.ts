import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/auth/sign-in", "/auth/sign-up"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
