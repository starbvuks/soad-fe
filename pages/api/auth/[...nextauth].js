// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId:
//         "367601732247-fp5ounfribppe6ikeil8sk76moer1g08.apps.googleusercontent.com",
//       clientSecret: "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",
//     }),
//   ],
//   callbacks: {
//     async jwt(token, user, account) {
//       if (account) {
//         const response = await fetch(
//           `${process.env.NEXTAUTH_URL}/api/connect/google/callback?access_token=${account?.accessToken}`
//         );
//         const data = await response.json();
//         token.jwt = data.jwt;
//         token.id = data.user.id;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//     async redirect(url, baseUrl) {
//       return baseUrl;
//     },
//   },
// });

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  secret: "soad",
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
});
