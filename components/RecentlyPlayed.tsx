import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../utils/hooks/useSpotify';
import { PlayIcon } from './icons/PlayIcon';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { HistoryIcon } from './icons/HistoryIcon';
import { useRecoilState } from 'recoil';
import { currentTrack } from '../store/currentTrackAtom';

momentDurationFormatSetup(moment);

export default function RecentlyPlayed() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrack);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (session && spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 }).then((data) => {
        setRecentlyPlayed(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const handleTrackClick = (target: EventTarget) => {
    const value = (target as HTMLElement).closest('button').value;
    console.log(value);
    return setCurrentTrackId(value);
  };

  const truncateArtistName = (artistName: String) => {
    if (artistName?.length > 20) {
      return artistName.substring(0, 20) + '...';
    } else {
      return artistName;
    }
  };

  return (
    <section id="recentlyPlayed" className="w-full sm:w-1/2">
      <span className="flex space-x-3 items-center mb-5">
        <h1 className="font-black text-2xl tracking-wider">Recently Played</h1>
        <HistoryIcon />
      </span>
      <div>
        {recentlyPlayed?.map((trackInfo, index) => {
          const { track } = trackInfo;
          return (
            <div
              key={index}
              className="shadow-md cursor-pointer hover:scale-105 duration-300 flex overflow-hidden flex-nowrap bg-white rounded-lg my-4"
            >
              <button
                value={track.id}
                onClick={(e) => handleTrackClick(e.target)}
                className="focus:outline-none overflow-visible p-4 bg-white w-full max-w-full flex whitespace-nowrap items-center"
              >
                <p className="mx-5 hidden md:block w-4">
                  {(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <img
                  src={track.album.images?.[0].url}
                  width={52}
                  height={52}
                  className="rounded-lg ml-2 mr-4"
                />
                <PlayIcon />

                <p className="overflow-hidden text-ellipsis max-w-sm font-semibold text-slate-700">
                  {track.name}
                </p>

                <p className="hidden xl:block pl-10  ml-auto">
                  {truncateArtistName(track.artists[0].name)}
                </p>

                <p className="xl:mx-5 text-slate-500 px-3 ml-auto mr-5">
                  {moment
                    .duration(track.duration_ms, 'milliseconds')
                    //@ts-ignore
                    .format('h:mm:ss', {
                      trim: true,
                    })}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
