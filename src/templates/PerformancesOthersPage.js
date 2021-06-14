import React from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";

export default function PerformancesOthersPage(props) {
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
      {pageData.others.length > 0 ? (
        <ul className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-60 lg:gap-x-96 my-96">
          {pageData.others.map((event, i) => (
            <li key={event.slug}>
              {!!event.coverImage && <img className="w-full mb-20" src={event.coverImage} alt={event.title} />}
              <h1 className="text-24 font-black">{event.title}</h1>
              <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: event.content }} />
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
