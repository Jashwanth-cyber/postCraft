import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler=NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (
          user &&
          user.hashedpassword &&
          await bcrypt.compare(credentials.password, user.hashedpassword)
        ) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
