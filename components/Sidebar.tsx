import {
  HeartIcon,
  CreateIcon,
  LibraryIcon,
  SearchIcon,
  HomeIcon,
} from './icons/_index';
import SidebarButton from './buttons/SidebarButton';
import { useRecoilState } from 'recoil';
import { playlists } from '../store/playlistsAtom';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../utils/hooks/useSpotify';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sidebar() {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [userPlaylists, setUserPlaylists] = useRecoilState(playlists);

  useEffect(() => {
    if (session && spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setUserPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <section className="drop-shadow-xl flex-col bg-white px-8 w-2/12 max-w-[220px] min-w-[220px] hidden 2xl:flex">
      <section id="navigate" className="mt-10">
        <Link href="/" passHref>
          <SidebarButton text="Home" activeTab={router.pathname === '/'}>
            <HomeIcon />
          </SidebarButton>
        </Link>
        <Link href="/search" passHref>
          <SidebarButton
            text="Search"
            activeTab={router.pathname === '/search'}
          >
            <SearchIcon />
          </SidebarButton>
        </Link>
        <Link href="/favorites" passHref>
          <SidebarButton
            text="Favorites"
            activeTab={router.pathname === '/favorites'}
          >
            <HeartIcon />
          </SidebarButton>
        </Link>

        <p
          id="myMusic"
          style={{ color: '#9c9c9c' }}
          className="mt-10 mb-5 font-semibold uppercase text-sm tracking-widest"
        >
          My music
        </p>

        <SidebarButton
          text="Library"
          activeTab={router.pathname === '/library'}
        >
          <LibraryIcon />
        </SidebarButton>
        <SidebarButton
          text="Create a list"
          activeTab={router.pathname === '/newPlaylist'}
        >
          <CreateIcon />
        </SidebarButton>
      </section>

      <section id="playlists">
        <p
          style={{ color: '#9c9c9c' }}
          className="mt-10 mb-5 font-semibold uppercase text-sm tracking-widest"
        >
          Playlists
        </p>

        {userPlaylists?.map((playlist) => {
          return (
            <p
              className="w-full my-4 text-sm cursor-pointer hover:text-purple-600"
              key={'playlist-' + playlist.name}
            >
              {playlist.name}
            </p>
          );
        })}
      </section>
    </section>
  );
}
