import React, { useRef, useState } from "react";
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
      className="relative mb-28 flex-grow mt-40 -mx-16 lg:mt-0 h-40 md:h-auto overflow-hidden transition-height duration-300"
      style={{ height: isShowMenu ? menuHeight : undefined }}
    >
      <div className="relative flex justify-end items-center w-full h-40 px-4 md:hidden">
        <button
          className="p-8 hover:text-primary transition-colors"
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
        className="absolute md:relative inset-x-0 top-0 flex flex-col md:flex-row items-center justify-center lg:mr-logo mx-32 font-serif font-bold"
      >
        {menuItems.map(({ key, path = false, title }, i) => {
          const isActive = getActive({ key, path });
          return (
            <li
              key={key}
              className={classNames(
                'border-gray-bc px-20 text-center w-full md:w-auto',
                isActive ? 'order-first md:order-none py-8' : 'border-t md:border-t-0 py-4',
                {
                  'border-l-0 md:border-l': i !== 0,
                }
              )}
            >
              <Link
                className={classNames('hover:text-primary transition-colors whitespace-nowrap', { 'text-secondary': isActive })}
                to={path}
              >{title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default function PageHeader({ menuItems = [], getActive, locale }) {
  return (
    <header className="lg:flex items-start p-16 md:p-40">
      <SiteLogo className="w-logo-sm lg:w-logo mx-auto lg:m-0" locale={locale} />

      {menuItems.length > 0 && (
        <PageSubNav menuItems={menuItems} getActive={getActive} />
      )}
    </header>
  );
}
