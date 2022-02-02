import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import useSpotify from '../utils/hooks/useSpotify';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/_index';

import styles from '../styles/TopArtists.module.scss';
import { useRecoilState } from 'recoil';
import { artists } from '../store/artistsAtom';

export default function TopArtists() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useRecoilState(artists);

  const topArtistsCarouselRef = useRef();

  useEffect(() => {
    if (session && spotifyApi.getAccessToken() && topArtists.length === 0) {
      spotifyApi.getMyTopArtists().then((data) => {
        setTopArtists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const scrollCarouselRight = (event) => {
    if (topArtistsCarouselRef && topArtistsCarouselRef.current) {
      (topArtistsCarouselRef.current as HTMLElement).scrollLeft += 1180;
    }
  };

  const scrollCarouselLeft = () => {
    if (topArtistsCarouselRef && topArtistsCarouselRef.current) {
      (topArtistsCarouselRef.current as HTMLElement).scrollLeft -= 1180;
    }
  };

  return (
    <section id="topArtists" className="my-14">
      <div className="w-full flex flex-row justify-between mb-5">
        <span className="flex flex-row space-x-5 items-center relative">
          <h1 className="font-black text-2xl tracking-wider">Top Artists</h1>
          <p className="text-neutral-500 font-semibold text-sm relative hidden sm:block">
            - Top 20
          </p>
        </span>
        <span className="space-x-3">
          <button
            onMouseDown={scrollCarouselLeft}
            className="bg-white shadow-md hover:scale-95 duration-300 text-neutral-500 p-2 rounded-2xl hover:text-purple-700 focus:outline-none"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onMouseDown={scrollCarouselRight}
            className="bg-white shadow-md hover:scale-95 duration-300 text-neutral-500 p-2 rounded-2xl hover:text-purple-700 focus:outline-none"
          >
            <ChevronRightIcon />
          </button>
        </span>
      </div>
      <div
        ref={topArtistsCarouselRef}
        className={styles['top__artists__carousel'] + ' flex space-x-10'}
      >
        {topArtists?.map((artist) => {
          return (
            <div key={artist.name} className="flex-none">
              <img
                className="rounded-3xl object-cover h-64 w-64 cursor-pointer shadow-lg"
                src={artist.images[0].url}
              />
              <div className="ml-2">
                <p className="mt-5 font-black text-lg">{artist.name}</p>
                <p className="pt-1 font-light text-sm text-slate-400">
                  {artist.genres?.[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
