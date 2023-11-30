import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from "../../../../utils/config";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
};

export default NextAuth(authOptions);
