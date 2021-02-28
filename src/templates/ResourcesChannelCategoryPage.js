import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import classNames from "classnames";

import ChannelVideoItem from "../components/ChannelVideoItem";
import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function ResourcesChannelCategoryPage({ path, pageContext }) {
  const { pageData, categories, locale, menus, pages } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'resources');

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={menuItem.title}
        />
        <PageHeader
          locale={locale}
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === 'channel'}
        />

        <nav className="px-14">
          <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
            <span className="mx-20">
              {pages.channel.title}
            </span>
            <span className="bg-current h-1 flex-grow" />
          </h1>
          <ul className="flex flex-wrap items-center justify-center my-16">
            {categories.map(c => (
              <li key={c.slug} className="m-10">
                <Link
                  className={classNames(
                    'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary transition-colors duration-200',
                    c.slug === pageData.slug ? 'bg-tertiary text-white hover:bg-opacity-50' : 'text-tertiary hover:bg-opacity-20'
                  )}
                  to={c.localizedPath}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex-grow max-w-screen-xl p-14 pb-32 md:px-60 mx-auto">
          {!!pageData.items && pageData.items.length ? (
            <ul className="flex flex-wrap -mx-10 -my-20">
              {pageData.items.map(item => (
                <li
                  key={item.slug}
                  className="w-full sm:w-1/2 lg:w-1/3 px-10 py-20"
                >
                  <ChannelVideoItem item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="py-72 text-36 text-gray-bc text-center font-serif font-light"
            ><FormattedMessage id="channel.list.empty" /></p>
          )}
        </nav>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
