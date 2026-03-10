import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { loadUser } from "@/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  providers: [
    Google({
      async profile(profile) {
        const user = await loadUser(profile.email, "google");

        return {
          ...profile,
          userId: user.id,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.userId) {
        session.user.userId = token.userId as number;
      }

      return session;
    },
  },
});
