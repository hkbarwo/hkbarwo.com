import React from "react";

import ChannelDetailsArticle from "../components/ChannelDetailsArticle";
import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

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
          locale={locale}
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === 'channel'}
        />

        <ChannelDetailsArticle {...pageData} />

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
