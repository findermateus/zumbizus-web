import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LoadUser from "@/lib/cases/load-user";
import UserDAO from "@/lib/data-access-objects/user-dao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  providers: [
    Google({
      async profile(profile) {
        const userDAO = new UserDAO();
        const loadUser = new LoadUser(userDAO);

        const user = await loadUser.execute(profile.email, "google");

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
