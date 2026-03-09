import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    userId: number;
  }

  interface Session {
    user: {
      userId: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
  }
}
