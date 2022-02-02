import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { artists } from '../store/artistsAtom';
import { useCallback, useEffect, useState } from 'react';
import useSpotify from '../utils/hooks/useSpotify';
import styles from '../styles/Recommended.module.scss';
import { WaveformIcon } from './icons/_index';
import { RecordIcon } from './icons/RecordIcon';

export default function Recommendations() {
  const topArtists = useRecoilValue(artists);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [recommendedForToday, setRecommendedForToday] = useState([]);
  const [currentRecommended, setCurrentRecommended] = useState(0);

  const albumRef = useCallback(() => {
    setTimeout(() => {
      if (currentRecommended < 19) {
        return setCurrentRecommended(currentRecommended + 1);
      } else {
        return setCurrentRecommended(0);
      }
    }, 5000);
  }, [currentRecommended]);

  useEffect(() => {
    if (topArtists.length > 0) {
      if (session && spotifyApi.getAccessToken()) {
        spotifyApi
          .getRecommendations({
            min_energy: 0.1,
            seed_artists: [
              topArtists[5]?.id,
              topArtists[6]?.id,
              topArtists[1]?.id,
            ],
            min_popularity: 50,
          })
          .then((data) => {
            setRecommendedForToday(data.body.tracks);
          });
      }
    }
  }, [topArtists, session, spotifyApi]);

  return (
    <section className="w-full mt-5 pl-0 sm:pl-12 sm:mt-0 sm:w-1/2">
      <span className="flex space-x-3 items-center mb-5">
        <h1 className="font-black text-2xl tracking-wider">Discover</h1>
      </span>
      <div id="recommendations" className="flex justify-center items-center">
        {recommendedForToday?.length > 0 ? (
          <div
            ref={albumRef}
            style={{
              backgroundImage: `url('${recommendedForToday[currentRecommended].album.images[0].url}')`,
            }}
            className="rounded-3xl w-full bg-cover h-[484px] bg-center duration-300"
          >
            <div className=" rounded-3xl w-full h-full bg-neutral-800/50 duration-300 flex flex-col justify-center items-center">
              <span className="px-6">
                <h3 className="font-black text-neutral-100 text-3xl duration-300">
                  {recommendedForToday[currentRecommended].album.name}
                </h3>
                <p className="text-neutral-300 text-xl duration-300">
                  {
                    recommendedForToday[currentRecommended].album.artists[0]
                      .name
                  }
                </p>
              </span>
              <span className="mt-10 space-y-3">
                <button
                  className={
                    styles['play__now__btn'] +
                    ' w-full max-w-xs px-6 py-3 rounded-3xl duration-300 hover:scale-95 flex space-x-2 text-lg focus:outline-none'
                  }
                >
                  <span>Listen now</span>
                  <WaveformIcon />
                </button>
                <button
                  className={
                    styles['visit__album__btn'] +
                    ' w-full max-w-xs px-6 py-3 rounded-3xl duration-300 hover:scale-95 flex items-center space-x-2 text-neutral-100 text-lg focus:outline-none'
                  }
                >
                  <span>Visit album</span>
                  <RecordIcon />
                </button>
              </span>
            </div>
          </div>
        ) : null}{' '}
      </div>
    </section>
  );
}
