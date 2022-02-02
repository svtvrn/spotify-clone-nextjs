import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../utils/hooks/useSpotify';
import { Fragment, useEffect, useState } from 'react';
import {
  PlayAltIcon,
  NextIcon,
  PreviousIcon,
  SpeakerIcon,
} from './icons/_index';

import VolumeSlider from './sliders/VolumeSlider';
import useTrack from '../utils/hooks/useTrack';
import { currentTrack } from '../store/currentTrackAtom';

export default function MusicPlayer() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrack);
  const track = useTrack();

  useEffect(() => {
    if (session && spotifyApi.getAccessToken() && !currentTrackId) {
      if (!track) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          setCurrentTrackId(data.body?.item.id ?? '');

          spotifyApi.getMyCurrentPlaybackState().then((data) => {});
        });
      }
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div
      className={`${
        track ? 'h-20' : 'h-0'
      } bottom-0 fixed w-full duration-500 backdrop-blur-lg bg-white/80 rounded-2xl shadow-2xl flex items-center`}
    >
      <div className="flex items-center space-x-6 px-3 w-full">
        <div id="trackInfo" className="flex space-x-4 w-1/4 items-center">
          {track ? (
            <Fragment>
              <img
                src={track?.album.images[0].url}
                width={60}
                height={60}
                className="rounded-xl"
              ></img>
              <span className={track ? 'visible' : 'invisible'}>
                <p className="font-semibold text-neutral-700">{track?.name}</p>
                <p className="text-neutral-700">{track?.artists[0].name}</p>
              </span>
            </Fragment>
          ) : null}
        </div>

        <div
          className={`${
            track ? 'visible' : 'invisible'
          } flex space-x-6 items-center`}
        >
          <button className="hidden md:block">
            <PreviousIcon />
          </button>
          <button>
            <PlayAltIcon />
          </button>
          <button className="hidden md:block">
            <NextIcon />
          </button>
        </div>
        <span
          className={`${
            track ? 'visible' : 'invisible'
          } flex space-x-2 items-center`}
        >
          <button>
            <SpeakerIcon />
          </button>
          <VolumeSlider />
        </span>
      </div>
    </div>
  );
}
