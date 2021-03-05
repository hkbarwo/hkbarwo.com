import React from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import YouTubePlayer from "../components/YouTubePlayer";

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

        <article className="flex-grow p-14 pb-96">
          <section className="max-w-screen-md mx-auto">
            <h1 className="text-primary text-24 md:text-36 font-serif font-bold tracking-wide">{news.title}</h1>
            {!!news.content && (
              <div
                className="mt-24 text-16 tracking-wide leading-8 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            )}
            
            {!!news.pdfFile && (
              <a
                className="inline-flex items-center rounded-full text-white bg-secondary px-16 py-12"
                href={news.pdfFile}
                rel="noopener noreferrer"
                target="blank"
              >
                <svg className="w-24 h-24 mr-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3,15.37H21v1.48H3ZM21.63,8.8a1.45,1.45,0,0,0-1.43-1H18.41a2.21,2.21,0,0,1-.1,1.5h1.91c.78,2.22,2.07,5.78,2.28,6.4v5.68H1.5V15.67c.21-.62,2.29-6.4,2.29-6.4h1.9a2.21,2.21,0,0,1-.11-1.5H3.8a1.41,1.41,0,0,0-1.42,1C0,15.31,0,15.39,0,15.57v5.78a1.5,1.5,0,0,0,1.49,1.51h21a1.5,1.5,0,0,0,1.5-1.5h0V15.57C24,15.39,24,15.31,21.63,8.8ZM12,13.56l4.72-4.7a.74.74,0,0,0,.19-1,.75.75,0,0,0-1-.18.73.73,0,0,0-.18.17l-3,2.9V1.85a.73.73,0,0,0-.76-.71.74.74,0,0,0-.72.71v8.87l-3-2.92a.74.74,0,1,0-1,1h0Z"
                    fill="currentColor"
                  />
                </svg>
                <FormattedMessage id="download.pdf" />
              </a>
            )}
            
            {!!news.images && news.images.length > 0 && (
              <ul>
              {Array.isArray(news.images) ? news.images : [news.images].map(image => (
                <li key={image}>
                  <img src={image} alt="" />
                </li>
              ))}
              </ul>
            )}
          </section>

          {!!news.youtubeVideoID && (
            <section className="mt-56 max-w-screen-lg mx-auto">
              <YouTubePlayer id={news.youtubeVideoID} />
            </section>
          )}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
