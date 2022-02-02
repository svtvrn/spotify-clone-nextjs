import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyApi from '../spotify';

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh token fails, attempt to sign in again
      if (session.error === 'refreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.user['accessToken']);
    }
  }, [session]);

  return spotifyApi;
}
