import '../styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MusicPlayer from '../components/MusicPlayer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className="flex flex-col min-h-screen items-stretch ">
          <main className="flex flex-row flex-nowrap min-h-screen">
            <Sidebar />
            <section className="p-4 2xl:mx-12 flex flex-col w-full 2xl:w-10/12 pb-32">
              <Header />
              <Component {...pageProps} />
            </section>
          </main>
          <MusicPlayer />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
