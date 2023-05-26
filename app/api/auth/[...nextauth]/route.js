import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, signin, getUserInfo } from '@/util/login';
import GoogleProvider from 'next-auth/providers/google';
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'domain-login',
      name: 'Domain Account',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.password) {
          return null;
        }
        const user = await login(credentials?.email, credentials?.password);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (profile) {
        let myUser = await getUserInfo(profile);
        return { ...token, ...myUser };
      } else {
        return { ...token, ...user };
      }
    },
    async signIn({ account, profile, user, credentials }) {
      return signin(profile, account);
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   // signIn: '/login',
  //   // signOut: '/auth/signout',
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // (used for check email message)
  //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
});

export { handler as GET, handler as POST };
