import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToMongoDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "Password" },
      },
      async authorize(credentials) {
        await connectToMongoDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const IsPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (IsPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
