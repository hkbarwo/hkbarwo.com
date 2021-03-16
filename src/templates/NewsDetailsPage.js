import React from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import NewsDetailsArticle from "../components/NewsDetailsArticle";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function NewsDetailsPage({ path, pageContext }) {
  const { newsItem: news, newsCategories, locale } = pageContext;
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
            ...newsCategories.map(category => ({
              key: category.slug,
              path: `/${locale}/news/${category.slug}`,
              title: category.title,
            }))
          ]}
          getActive={({ key }) => news.category.slug === key}
        />

        <NewsDetailsArticle
          title={news.title}
          content={news.content}
          pdfFile={news.pdfFile}
          images={news.images}
          youtubeVideoID={news.youtubeVideoID}
        />

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
