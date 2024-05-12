import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import { createTable } from "~/server/db/schema";
import { getUserByEmail } from "./actions/auth";
import NextAuth from "next-auth/next";

async function getUser(email: string) {
  try {
      return await getUserByEmail(email);
  } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...(token.user as User),
        id: token.sub,
      },
    }),

    jwt: ({ token, user }) => {
      console.log("here in token side", user);
      
      if (user) {
        token.sub = user.id;
        token.user = user;
      }

      return token;
    }
  },
  // adapter: DrizzleAdapter(db, createTable) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60
  },
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "m@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse({
                        email: credentials?.email,
                        password: credentials?.password
                    });

                // console.log("Parsed credentials", parsedCredentials)
                console.log("here 3");


                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    const passwordsMatch = password ===  user.password as string;

                    if (!passwordsMatch) return null;

                    return user
                }

                // If credentials are invalid, log and return null
                console.log('Invalid credentials');
                return null;
      }
    })
  ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
