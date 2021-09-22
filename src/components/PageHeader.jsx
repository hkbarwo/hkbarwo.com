import React, { Fragment, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import classNames from 'classnames';
import { Link } from "gatsby";

import useResize from "../utils/react-hooks/useResize";

import SiteLogo from "./SiteLogo";

function PageSubNav({ menuItems = [], getActive }) {
  const menu = useRef(null);
  const { height: menuHeight } = useResize(menu);
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <nav
      className="relative flex-grow h-40 mt-40 -mx-16 overflow-hidden duration-300 md:overflow-visible mb-28 lg:mt-0 md:h-auto transition-height"
      style={{ height: isShowMenu ? menuHeight : undefined }}
    >
      <div className="relative flex items-center justify-end w-full h-40 px-4 md:hidden">
        <button
          className="p-8 transition-colors hover:text-primary"
          onClick={() => setIsShowMenu(!isShowMenu)}
        >
          <svg
            className={classNames('w-12 h-12 transform transition-transform duration-300', {
              'rotate-180': isShowMenu,
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.83 5.84L6 10.67 1.17 5.83M6 1.33v9.3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <ul
        ref={menu}
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-center mx-32 font-serif font-bold md:relative md:flex-row lg:mr-logo"
      >
        {menuItems.map(({ key, path = false, title }, i) => {
          const isActive = getActive({ key, path });
          return (
            <li
              key={key}
              className={classNames(
                'border-gray-bc px-20 text-center w-full md:w-auto py-8 md:py-0',
                isActive ? 'order-first md:order-none' : 'border-t md:border-t-0',
                {
                  'border-l-0 md:border-l': i !== 0,
                }
              )}
            >
              <Link
                className={classNames(
                  'relative hover:text-secondary-dark group transition-colors whitespace-nowrap md:py-8 transition-colors duration-300',
                  { 'text-secondary': isActive }
                )}
                to={path}
              >
                {title}
                <Transition
                  as={Fragment}
                  show={isActive}
                  appear={true}
                  enter="transition duration-300 ease-out"
                  enterFrom="transform translate-y-4 opacity-0"
                  enterTo="transform translate-y-0 opacity-100"
                  leave="transition duration-300 ease-out"
                  leaveFrom="transform translate-y-0 opacity-100"
                  leaveTo="transform translate-y-4 opacity-0"
                >
                  <span className="absolute inset-x-0 bottom-0 hidden h-1 transition duration-300 md:block bg-secondary group-hover:bg-secondary-dark" />
                </Transition>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default function PageHeader({ menuItems = [], getActive, locale }) {
  return (
    <header className="items-start p-16 lg:flex md:p-40">
      <SiteLogo className="mx-auto w-logo-sm lg:w-logo lg:m-0" locale={locale} />

      {menuItems.length > 0 && (
        <PageSubNav menuItems={menuItems} getActive={getActive} />
      )}
    </header>
  );
}
