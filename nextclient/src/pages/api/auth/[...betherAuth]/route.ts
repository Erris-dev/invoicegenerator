import { betterAuth, email } from "better-auth";
import { apolloClient } from "@/lib/apolloClient";
import { LOGIN_MUTATION, SYNC_GOOGLE_MUTATION } from "@/lib/mutations";

interface Credentials {
    email: string;
    password: string;
}

export const auth = betterAuth({
    socialProviders: {
        google: {
           clientId: process.env.GOOGLE_CLIENT_ID || "",
           clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        credentials: {
            async authorize(credentials: Credentials) {
                try {
                    const { data } = await apolloClient.mutate({
                        mutation: LOGIN_MUTATION,
                        variables: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                    });
                    
                    const user= data?.login;
                    if (!user) throw new Error("Invalid credentials");

                    return user;
                } catch (error) {
                    console.error("Error during login: ", error);
                }
            }
        }
    },
    callbacks: {
        async jwt({ token, user, account, profile }: { token: any; user?: any; account?: any; profile?: any }) {
            if (user) token.id = user.id;

            if (account?.provider === "google") {
                try {
                    await apolloClient.mutate({
                        mutation: SYNC_GOOGLE_MUTATION,
                        variables: {
                            email: profile.email,
                            name: profile.name,
                            providerId: profile.sub,
                        },
                    });
                } catch (error) {
                    console.error("Error syncing Google user:", error);
                }
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user.id = token.id;
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",,
    },
});