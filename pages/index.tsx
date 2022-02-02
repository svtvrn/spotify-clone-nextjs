import { Fragment } from 'react';
import TopArtists from '../components/TopArtists';
import RecentlyPlayed from '../components/RecentlyPlayed';
import Recommendations from '../components/Recommendations';

export default function Home() {
  return (
    <Fragment>
      <TopArtists />
      <div className="flex flex-wrap">
        <RecentlyPlayed />
        <Recommendations />
      </div>
    </Fragment>
  );
}
