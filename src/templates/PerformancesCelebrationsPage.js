import React from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";

export default function PerformancesCelebrationsPage(props) {
  const { pageContext } = props;
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  return (
    <Page
      {...props}
      menuItems={menuItem.subPages.map((item) => ({
        path: `/${locale}${item.url}`,
        key: item.slug,
        title: item.title,
      }))}
    >
      {pageData.celebrations.length > 0 ? (
        <ul className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-48 mt-96">
          {pageData.celebrations.map((event) => (
            <li key={event.slug} className="relative rounded-xl shadow-outline p-32">
              <h2 className="text-20 font-bold">{event.title}</h2>
              {event.metadata.map(data => (
                <div key={data.label} className="mt-12">
                  <div className="text-secondary text-14 font-bold">{data.label}</div>
                  <div className={classNames('markdown', { 'text-tertiary': data.isShowInList })} dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
              ))}
              <div className="absolute right-24 -top-12 flex items-center">
                <span className="text-14 mr-8 mt-12">
                  <FormattedMessage id="events.sessions" />
                </span>
                <div className="flex items-center justify-center text-white text-24 w-48 h-48 font-bold rounded-full bg-primary">
                  {event.sessions}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="py-72 text-36 text-gray-bc text-center font-serif font-light"
        ><FormattedMessage id="events.list.empty" /></p>
      )}
    </Page>
  );
}
