import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  providers: [
    Google({
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          npc: "npc test",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.npc = user.npc;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.npc) {
        session.npc = token.npc as string;
      }

      return session;
    },
  },
});
