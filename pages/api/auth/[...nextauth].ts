import { Account, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../utils/spotify';

const refreshAccessToken = async (token: JWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // handle expiration in milliseconds
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'refreshAccessTokenError',
    };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account;
      user: User;
    }) {
      // Initial Sign-In
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // handle expiration in milliseconds
        };
      }

      // Refresh session
      if (token?.accessTokenExpires > Date.now()) {
        // Is still valid
        return token;
      } else {
        // Token has expired, we need to refresh it
        return await refreshAccessToken(token);
      }
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user['accessToken'] = token.accessToken;
      session.user['refreshToken'] = token.refreshToken;
      session.user['username'] = token.username;

      return session;
    },
  },
});
