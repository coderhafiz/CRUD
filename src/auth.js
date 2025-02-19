import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/db.js";
// import { MongoClient } from "mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "database", // Use database session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString(); // Ensure ID is assigned
        token.role = user.role || "admin";
      }
      console.log("JWT Callback - Token:", token); // Debugging
      return token;
    },
    async session({ session, token }) {
      if (!token?.id) {
        console.log(
          "Session callback error: Missing token.id, fetching from DB..."
        );

        try {
          const client = await clientPromise;
          const db = client.db(); // Replace with your database name if necessary
          const foundUser = await db
            .collection("users")
            .findOne({ email: session.user.email });

          if (foundUser) {
            session.user.id = foundUser._id.toString();
            session.user.role = foundUser.role || "admin";
            console.log("Session Callback - Retrieved user from DB:", session);
          } else {
            console.error("User not found in DB:", session.user.email);
          }
        } catch (err) {
          console.error("MongoDB fetch error:", err);
        }
      } else {
        session.user.id = token.id;
        session.user.role = token.role || "admin";
      }
      console.log("Final Session - Session:", session); // Debugging
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
