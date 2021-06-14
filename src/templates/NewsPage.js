import React from "react";
import { Link } from "gatsby";

import IntlProvider from "../components/IntlProvider";
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
        <section className="flex-grow w-full max-w-screen-xl mx-auto p-14 pb-48 md:pb-96">
          <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
            <span className="mx-20">
              {newsCategory ? newsCategory.title : <FormattedMessage id="all" />}
            </span>
            <span className="bg-current h-1 flex-grow" />
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
                    <div className="flex justify-between items-center mb-20">
                      <div
                        className="px-16 py-2 rounded-full text-white text-16"
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
                      <h2 className="flex-grow text-20 tracking-wide">{news.title}</h2>
                      <Link
                        className="rounded-full text-white ml-32 px-24 py-10 bg-secondary"
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
              className="py-72 text-36 text-gray-bc text-center font-serif font-light"
            ><FormattedMessage id="list.empty" /></p>
          )}
        </section>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
