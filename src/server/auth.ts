import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "~/server/db";
import { object, string, TypeOf } from "zod";
import { PrismaClient } from "@prisma/client";
import { verify } from "argon2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      // id: string;
      // name: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const signInSchema = object({
  name: string({
    required_error: "phone is required",
  }),
  password: string({
    required_error: "password is required",
  }),
});

const credentialsProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  async authorize(credentials, req) {
    try {
      const creds = await signInSchema.parseAsync(credentials);
      const prisma = new PrismaClient();
      const user = await prisma.user.findFirst({
        where: {
          name: creds.name,
        },
      });
      if(user == null){
        return null;
      }
      const isValid = await verify(user?.password || "", creds.password);
      if (!isValid) return null;
      else return user;
    } catch (e) {
      return null;
    }
  },

  credentials: {
    name: { label: "phone", type: "text" },
    password: { label: "Password", type: "password" },
  },
});
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     // id: user.id,
    //   },
    // }),
    /******************************************************** When signIn, jwt callback is invoked where token parameter contain value return from authorize function of credential provider  ************/
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    /** JWT and session callbacks are invoked when useSession or getServerSession are called where token parameter in session contain value returned from JWT callback */
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token?.user;

      return session;
    },

    // session: async ({ session, token }: any) => {
    //   session.user = token.user;
    //   return session;
    // },
  },
  pages: {
    signIn: "/server/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    credentialsProvider,
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
