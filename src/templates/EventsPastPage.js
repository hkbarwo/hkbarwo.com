import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function EventsPastPage({ path, pageContext }) {
  const { locale, menus, pageItem, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const events = useMemo(() => {
    const now = Date.now();
    return pageData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < now;
    })
  }, [pageData.events, pageItem.slug]);

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
          getActive={({ key }) => key === pageItem.slug}
        />

        <article className="max-w-screen-xl mx-auto w-full p-14 md:px-96 pb-56 flex-grow">
          <section>
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20">
                {pageItem.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>

            {events.length > 0 ? (
              <ul className="my-96">
                {events.map((event, i) => (
                  <li key={event.slug} className={classNames('md:flex', { 'mt-96': i > 0 })}>
                    <div className="max-w-md w-full flex-shrink-0">
                      <img src={event.coverImage} />
                    </div>
                    <div className="md:ml-120 flex-grow">
                      <h1 className="text-24 font-black mt-20">{event.title}</h1>
                      <ul className="mt-20">
                        {event.metadata.filter((({ isShowInList }) => isShowInList)).map((data, i) => (
                          <li key={data.label} className={classNames({ 'mt-12': i > 0 })}>
                            <div className="text-secondary text-14 font-bold">{data.label}</div>
                            <div className="markdown text-tertiary" dangerouslySetInnerHTML={{ __html: data.content }} />
                          </li>
                        ))}
                      </ul>
                      <Link
                        className="inline-flex items-center rounded-full text-white bg-secondary px-40 py-12 mt-20"
                        to={`/${locale}/performances/${event.slug}`}
                      >
                        <FormattedMessage id="know.more" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="py-72 text-36 text-gray-bc text-center font-serif font-light"
              ><FormattedMessage id="list.empty" /></p>
            )}
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
