import { Provider } from 'next-auth/providers';
import { getProviders, signIn } from 'next-auth/react';

export default function Login({ providers }) {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <h1 className="font-light text-lg mb-10">Welcome to Spetsofy Alpha</h1>
      {Object.values(providers).map((provider: Provider) => {
        return (
          <button
            className="bg-red-400 text-neutral-100 hover:bg-purple-500 duration-300 hover:scale-95 font-semibold py-2 px-4 rounded-full w-full max-w-[180px]"
            key={'login-with-' + provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            {`Login with ${provider.name}`}
          </button>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
