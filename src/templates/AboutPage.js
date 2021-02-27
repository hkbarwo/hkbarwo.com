import React from "react";
import { Link } from "gatsby";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";

export default function AboutPage({ path, pageContext }) {
  const { locale, menus } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'about');
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
          getActive={({ key }) => key === 'index'}
        />
        <section className="flex-grow w-full max-w-screen-xl mx-auto p-14 pb-48 md:pb-96">
          <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
            <span className="mx-20">
              HI
            </span>
            <span className="bg-current h-1 flex-grow" />
          </h1>
        </section>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
