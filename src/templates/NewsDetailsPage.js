import React from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function NewsDetailsPage({ pageContext }) {
  const { newsItem: news, newsCategories, locale } = pageContext;

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ pageContext }}
          pageTitle={<FormattedMessage id="news" />}
        />
        <PageHeader
          menuItems={[
            {
              path: `/${locale}/news`,
              key: 'index',
              title: <FormattedMessage id="all" />,
            },
            ...newsCategories.map(category => ({
              key: category.slug,
              path: `/${locale}/news/${category.slug}`,
              title: category.title,
            }))
          ]}
          getActive={({ key }) => news.category.slug === key}
        />

        <article className="flex-grow p-14 pb-32">
          <section className="max-w-screen-md mx-auto">
            <h1 className="text-primary text-24 md:text-36 font-serif font-bold tracking-wide">{news.title}</h1>
            <div
              className="mt-24 text-16 tracking-wide leading-8 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
            {news.images && news.images.length > 0 && (
              <ul>
              {news.images.map(image => (
                <li key={image}>
                  <img src={image} alt="" />
                </li>
              ))}
              </ul>
            )}
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
