import React from "react";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import YouTubePlayer from "../components/YouTubePlayer";

export default function ResourcesChannelDetailsPage({ path, pageContext }) {
  const { pageData, locale, menus } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'resources');

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={menuItem.title}
        />
        <PageHeader
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === 'channel'}
        />

        <article className="flex-grow p-14 pb-32">
          <section className="max-w-screen-md mx-auto">
            <h1 className="text-primary text-24 md:text-36 font-serif font-bold tracking-wide">{pageData.title}</h1>
            {!!pageData.content && (
              <div
                className="mt-24 text-16 tracking-wide leading-8 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            )}
          </section>
          {!!pageData.youtubeVideoID && (
            <section className="mt-56 max-w-screen-lg mx-auto">
              <YouTubePlayer id={pageData.youtubeVideoID} />
            </section>
          )}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
