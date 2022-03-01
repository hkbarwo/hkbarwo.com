import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";

export default function EventsPastPage(props) {
  const { pageContext } = props;
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const events = useMemo(() => {
    const now = Date.now();
    return pageData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < now;
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
        <ul className="max-w-screen-xl mx-auto my-96">
          {events.map((event, i) => (
            <li key={event.slug} className={classNames('md:flex', { 'mt-96': i > 0 })}>
              <div className="flex-shrink-0 w-full max-w-md">
                {!!event.coverImage && <img src={event.coverImage} alt={event.title} />}
              </div>
              <div className="flex-grow md:ml-120">
                <h1 className="mt-20 font-black text-24">{event.title}</h1>
                <ul className="mt-20">
                  {event.metadata.filter((({ isShowInList }) => isShowInList)).map((data, i) => (
                    <li key={data.label} className={classNames({ 'mt-12': i > 0 })}>
                      <div className="font-bold text-secondary text-14">{data.label}</div>
                      <div className="markdown text-tertiary" dangerouslySetInnerHTML={{ __html: data.content }} />
                    </li>
                  ))}
                </ul>
                <Link
                  className="inline-flex items-center px-40 py-12 mt-20 text-white transition-colors duration-300 rounded-8 bg-secondary hover:bg-secondary-dark"
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
          className="font-serif font-light text-center py-72 text-36 text-gray-bc"
        ><FormattedMessage id="list.empty" /></p>
      )}
    </Page>
  );
}
