import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon, LogOutIcon, SearchIcon } from './icons/_index';
import { signOut } from 'next-auth/react';

import styles from '../styles/User.module.scss';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="relative my-2 w-full h-20 flex flex-row justify-between items-center px-2 border-b-2 border-neutral-300">
      <input
        className="w-full max-w-xs rounded-lg shadow-lg focus:outline-none py-2 px-4"
        placeholder="Search"
        type="text"
      ></input>

      <Menu>
        <Menu.Button className="focus:outline-none flex flex-row items-center space-x-3 pl-16">
          {session?.user?.['image'] ? (
            <Fragment>
              <img
                src={session.user['image']}
                width={44}
                height={44}
                className={
                  styles['user__picture'] + ' min-h-[40px] min-w-[40px]'
                }
              />
              <p className="font-black tracking-wider text-neutral-600 hidden lg:block">
                {session.user['name'].split(' ')[0]}
              </p>
              <span className="rounded-full ring-2 ring-[#c7abb7] sm:block hidden">
                <ChevronDownIcon />
              </span>
            </Fragment>
          ) : null}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-2 w-56 mt-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
            <Menu.Item>
              {({ active }) => {
                return (
                  <button
                    className={`${
                      active ? 'bg-purple-600 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-3 py-3 text-sm font-semibold space-x-1`}
                    onClick={() => signOut()}
                  >
                    <LogOutIcon />
                    <span>Log out</span>
                  </button>
                );
              }}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
