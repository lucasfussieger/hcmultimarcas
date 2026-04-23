import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "senha", type: "password" },
      },

      async authorize(credentials) {
        const emailAdmin = process.env.EMAIL_ADMIN;
        const senhaAdmin = process.env.SENHA_ADMIN;

        if (
          credentials?.email === emailAdmin &&
          credentials?.password === senhaAdmin
        ) {
          return { id: "1", name: "Admin" };
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
