import React, { useMemo } from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import Link from "../components/Link";
import Page from "../components/Page";

export default function EventsPage(props) {
  const { pageContext } = props;
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const events = useMemo(() => {
    const now = Date.now();
    return pageData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    })
  }, [pageData.events]);

  return (
    <Page
      {...props}
      menuItems={menuItem.subPages.map((item) => ({
        path: `/${locale}${item.url}`,
        key: item.slug,
        title: item.title,
      }))}
    >
      {events.length > 0 ? (
        <ul className="grid max-w-screen-xl grid-cols-1 mx-auto lg:grid-cols-2 lg:gap-x-120 gap-y-96 lg:gap-y-0 my-96">
          {events.map((event, i) => (
            <li key={event.slug} className={classNames('mx-auto text-center', { 'lg:mt-96': i % 2 === 1 })}>
              {!!event.coverImage && <img className="mb-20" src={event.coverImage} alt={event.title} />}
              <h1 className="font-black text-24">{event.title}</h1>
              <ul className="mt-20">
                {event.metadata.filter((({ isShowInList }) => isShowInList)).map((data, i) => (
                  <li key={data.label} className={classNames({ 'mt-12': i > 0 })}>
                    <div className="font-bold text-secondary text-14">{data.label}</div>
                    <div className="markdown text-tertiary" dangerouslySetInnerHTML={{ __html: data.content }} />
                  </li>
                ))}
              </ul>
              <Link
                className="inline-flex items-center px-40 py-12 mt-20 text-white transition-colors duration-300 rounded-full bg-secondary hover:bg-secondary-dark"
                to={`/${locale}/performances/${event.slug}`}
              >
                <FormattedMessage id="know.more" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="font-serif font-light text-center py-72 text-36 text-gray-bc"
        ><FormattedMessage id="events.list.empty" /></p>
      )}
    </Page>
  )
}
