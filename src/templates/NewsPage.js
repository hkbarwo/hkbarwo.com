import React from "react";

import IntlProvider from "../components/IntlProvider";
import Link from "../components/Link";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import { FormattedDate, FormattedMessage } from "react-intl";

export default function NewsPage({ path, pageContext }) {
  const { newsItems, newsCategory, newsCategories, locale } = pageContext;
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={<FormattedMessage id="news" />}
        />
        <PageHeader
          locale={locale}
          menuItems={[
            {
              path: `/${locale}/news`,
              key: 'index',
              title: <FormattedMessage id="all" />,
            },
            ...newsCategories.map(c => ({
              key: c.slug,
              path: `/${locale}/news/${c.slug}`,
              title: c.title,
            }))
          ]}
          getActive={({ key }) => newsCategory ? newsCategory.slug === key : key === 'index'}
        />
        <section className="flex-grow w-full max-w-screen-xl pb-48 mx-auto p-14 md:pb-96">
          <h1 className="flex items-center justify-center max-w-sm mx-auto font-serif font-bold text-center text-primary text-24">
            <span className="flex-grow h-1 bg-current" />
            <span className="mx-20">
              {newsCategory ? newsCategory.title : <FormattedMessage id="all" />}
            </span>
            <span className="flex-grow h-1 bg-current" />
          </h1>
          {newsItems.length > 0 ? (
            <ul className="md:px-60">
              {newsItems.map((news) => {
                const { category, slug } = news;
                return (
                  <li
                    key={slug}
                    className="py-20 border-b border-gray-e5"
                  >
                    <div className="flex items-center justify-between mb-20">
                      <div
                        className="px-16 py-2 text-white rounded-full text-16"
                        style={{ backgroundColor: category.color }}
                      >{category.title}</div>
                      <div className="flex items-center">
                        <svg
                          className="w-16 h-16 mr-8 text-gray-bc"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M10.44,11.19l-3-3v-5H8.53V7.78l2.66,2.66ZM8,15.44A7.44,7.44,0,1,1,15.44,8,7.44,7.44,0,0,1,8,15.44ZM8,1.62A6.38,6.38,0,1,0,14.38,8,6.38,6.38,0,0,0,8,1.62Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-secondary text-14">
                          <FormattedDate value={news.date} />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h2 className="flex-grow tracking-wide text-20">{news.title}</h2>
                      <Link
                        className="px-24 py-10 ml-32 text-white transition-colors duration-300 rounded-8 bg-secondary hover:bg-secondary-dark"
                        to={`/${locale}/news/${news.slug}`}
                      >
                        <FormattedMessage id="know.more" />
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p
              className="font-serif font-light text-center py-72 text-36 text-gray-bc"
            ><FormattedMessage id="list.empty" /></p>
          )}
        </section>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
