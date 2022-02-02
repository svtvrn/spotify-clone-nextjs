import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../../utils/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrack } from '../../store/currentTrackAtom';
import { PlayIcon, HeartIcon, MoreIcon } from '../../components/icons/_index';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export default function Favorites() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrack);

  const [favoriteTracks, setFavoriteTracks] = useState([]);

  useEffect(() => {
    if (session && spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks({ offset: 0 }).then(
        (data) => {
          setFavoriteTracks(data.body?.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }, [session, spotifyApi]);

  const handleTrackClick = (target: EventTarget) => {
    const value = (target as HTMLElement).closest('button').value;
    console.log(value);
    return setCurrentTrackId(value);
  };

  return (
    <div
      className="w-full min-h-screen bg-no-repeat px-0"
      style={{
        backgroundImage: `url('/img/favoritesBanner.webp')`,
        backgroundPositionX: '100%',
      }}
    >
      <div className="relative min-h-screen top-32 w-full pb-32">
        <div className="bg-white w-fit slate py-5 px-12 rounded-2xl drop-shadow-lg mb-24">
          <h1 className="flex font-bold text-4xl mb-5 text-slate-600">
            My favorite tracks
            <HeartIcon className="ml-2 h-10 w-10 fill-violet-400 stroke-transparent" />
          </h1>
          <h3 className="text-xl text-neutral-400">
            Revisit your old and new favorites
          </h3>
        </div>
        <div className="bg-white/70 backdrop-blur-lg w-full px-12 py-5 rounded-3xl shadow-lg min-h-screen">
          <div className="bg-white rounded-lg grid-cols-8 gap-12 shadow-lg py-3 px-6 hidden md:grid">
            <p className="tracking-wider text-slate-500 col-span-2">Track</p>
            <p className="tracking-wider text-slate-500 col-span-2">Album</p>
            <p className="tracking-wider text-slate-500 col-span-1">Added</p>
            <p className="tracking-wider text-slate-500 col-span-1">Duration</p>
          </div>
          {favoriteTracks?.map((trackInfo, index) => {
            const { track } = trackInfo;
            const addedAtFormatted = moment(
              moment().format(trackInfo.added_at)
            ).format('YYYY-MM-DDTHH:mm:ss');
            return (
              <div
                key={index}
                className="shadow-md cursor-pointer hover:scale-[1.02] duration-300 flex overflow-hidden flex-nowrap bg-white rounded-lg my-4"
              >
                <button
                  value={track.id}
                  onClick={(e) => handleTrackClick(e.target)}
                  className="focus:outline-none overflow-visible px-6 py-3 bg-white w-full whitespace-nowrap items-center grid grid-cols-8 gap-12"
                >
                  <div className="track__info flex items-center md:col-span-2 col-span-6">
                    <img
                      src={track.album.images?.[0].url}
                      width={56}
                      height={56}
                      className="rounded-lg"
                    />
                    <PlayIcon />

                    <span className="overflow-hidden text-left">
                      <p className="overflow-hidden text-ellipsis max-w-sm font-semibold text-slate-700">
                        {track.name}
                      </p>
                      <p className="overflow-hidden text-ellipsis max-w-sm">
                        {track.artists[0].name}
                      </p>
                    </span>
                  </div>

                  <p className="album__info hidden md:block text-left overflow-hidden text-ellipsis max-w-sm col-span-2">
                    {track.album.name}
                  </p>

                  <p className="hidden md:block text-slate-500 text-left col-span-1">
                    {moment(addedAtFormatted, 'YYYY-MM-DDTHH:mm:ss').fromNow()}
                  </p>

                  <p className="hidden md:block text-slate-500 text-left col-span-1">
                    {moment
                      .duration(track?.duration_ms, 'milliseconds')
                      //@ts-ignore
                      .format('h:mm:ss', {
                        trim: true,
                      })}
                  </p>

                  <span className="flex items-center space-x-4 col-span-2">
                    <button className="focus:outline-none">
                      <HeartIcon className="h-6 w-6 fill-violet-400 stroke-transparent"></HeartIcon>
                    </button>
                    <button className="focus:outline-none">
                      <MoreIcon />
                    </button>
                    <p
                      className={`${
                        track.explicit ? 'block' : 'hidden'
                      } text-xs uppercase font-black tracking-widest text-slate-600 bg-slate-200 px-2 rounded-sm`}
                    >
                      explicit
                    </p>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
