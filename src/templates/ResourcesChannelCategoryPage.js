import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import ChannelVideoItem from "../components/ChannelVideoItem";
import Link from "../components/Link";
import Page from "../components/Page";

export default function ResourcesChannelCategoryPage(props) {
  const { pageContext } = props;
  const {
    pageData,
    categories,
    locale,
    menus,
    pages,
    channel,
    isChannel: isChannelPage,
  } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'resources');
  console.log(channel);
  return (
    <Page
      pageTitle={pages.channel.title}
      pageDescription=""
      menuItems={menuItem.subPages.map((item) => ({
        path: `/${locale}${item.url}`,
        key: item.slug,
        title: item.title,
      }))}
      menuItemGetActive={({ key }) => key === 'channel'}
      {...props}
    >
      <img className="mx-auto my-64" src={channel.logo} alt={channel.title} style={{ width: 212 }} />
      <header className="text-right">
      <a
        className="inline-flex items-center justify-end"
        href={channel.youtubeLink}
        alt={<FormattedMessage id="channel.subscribe" />}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="h-32 mr-16 w-36"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 29.241 20.56"
        >
          <path
            fill="#f00f0d"
            d="M29.68,7.717a3.674,3.674,0,0,0-2.585-2.6C24.814,4.5,15.67,4.5,15.67,4.5s-9.144,0-11.424.615a3.674,3.674,0,0,0-2.585,2.6A38.543,38.543,0,0,0,1.05,14.8a38.543,38.543,0,0,0,.611,7.084,3.619,3.619,0,0,0,2.585,2.56c2.28.615,11.424.615,11.424.615s9.144,0,11.424-.615a3.619,3.619,0,0,0,2.585-2.56,38.543,38.543,0,0,0,.611-7.084,38.543,38.543,0,0,0-.611-7.084Zm-17,11.432v-8.7L20.322,14.8,12.68,19.148Z"
            transform="translate(-1.05 -4.5)"
          />
        </svg>
        <FormattedMessage id="channel.subscribe" />
      </a>
    </header>
      <nav className="px-14">
        <ul className="flex flex-wrap items-center justify-center my-16">
          {categories.map(c => (
            <li key={c.slug} className="m-10">
              <Link
                className={classNames(
                  'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary-light hover:text-white active:bg-tertiary transition-colors duration-300',
                  c.slug === pageData.slug ? 'bg-tertiary text-white hover:bg-tertiary-light' : 'text-tertiary'
                )}
                to={c.localizedPath}
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isChannelPage && (
        <p className="w-full max-w-screen-sm mx-auto mt-20 leading-8 tracking-wide text-center mb-72">
          {channel.description}
        </p>
      )}

      <nav className="flex-grow max-w-screen-xl pb-32 mx-auto p-14 md:px-60">
        {!!pageData.items && pageData.items.length ? (
          <ul className="flex flex-wrap -mx-10 -my-20">
            {pageData.items.map(item => (
              <li
                key={item.slug}
                className="w-full px-10 py-20 sm:w-1/2 lg:w-1/3"
              >
                <ChannelVideoItem item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="font-serif font-light text-center py-72 text-36 text-gray-bc"
          ><FormattedMessage id="channel.list.empty" /></p>
        )}
      </nav>
    </Page>
  );
}
