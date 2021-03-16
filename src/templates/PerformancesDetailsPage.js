import React, { useMemo } from "react";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import EventsDetailsArticle from "../components/EventsDetailsArticle";

export default function PerformancesDetailsPage({ path, pageContext }) {
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const pageKey = useMemo(() => {
    switch (pageData.type) {
      case 'performance':
        return new Date(pageData.date).getTime() > Date.now()
          ? 'performances-upcoming'
          : 'performances-past';
  
      case 'activity':
        return new Date(pageData.date).getTime() > Date.now()
          ? 'events-latest'
          : 'events-past';
  
      case 'other':
        return 'performances-other';
    
      default:
        return '';
    }
  }, [pageData.type, pageData.date]);

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen tracking-wide">
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
          getActive={({ key }) => key === pageKey}
        />

        <EventsDetailsArticle {...pageData} />

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
