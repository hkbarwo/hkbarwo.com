import React from "react";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function MemberEventsPage({ path, pageContext }) {
  const { locale, pageItem, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'member');
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
          getActive={({ key }) => key === 'member-events'}
        />

        <article className="flex-grow p-14 pb-56">
          <section className="px-14 max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
              <span className="mx-20 tracking-widest">
                {pageItem.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
          </section>

          <section className="mt-96 px-14 md:px-48 lg:px-96">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-48">
              {pageData.events.map(event => (
                <li key={event.slug} className="rounded-xl shadow-outline p-32">
                  <h2 className="text-20 font-bold">{event.title}</h2>
                  {event.metadata.map(data => (
                    <div key={data.label} className="mt-12">
                      <div className="text-secondary text-14 font-bold">{data.label}</div>
                      <div className="markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
