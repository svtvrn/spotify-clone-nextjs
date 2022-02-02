import { useRecoilState } from 'recoil';
import useSpotify from './useSpotify';
import { currentTrack } from '../../store/currentTrackAtom';
import { useEffect, useState } from 'react';

export default function useTrack() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrack);
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      if (currentTrackId) {
        const info = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setTrackInfo(info);
      }
    };

    fetchTrackInfo();
  }, [currentTrackId, spotifyApi]);

  return trackInfo;
}
