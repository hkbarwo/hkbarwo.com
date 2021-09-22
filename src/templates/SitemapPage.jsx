import React from "react";
import classNames from "classnames";

import Link from "../components/Link";
import Page from "../components/Page";

export default function SitemapPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { sitemap } = pageData;

  function createSubMenu({ items, level = 1 }) {
    if (items && items.length) {
      return (
        <ul className={classNames('pl-20', level === 1 ? 'list-disc' : 'list-circle')}>
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                className="font-light"
                to={item.localizedPath}
              >
                {item.title}
              </Link>
              {createSubMenu({ items: item.subPages, level: level + 1 })}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

  return (
    <Page {...props}>
      <nav className="flex-row-reverse flex-grow w-full max-w-screen-lg mx-auto mt-40 leading-8 tracking-wide md:flex">
        <ul className="flex-shrink-0 mr-48 md:ml-20 md:text-right mt-36">
          {sitemap['primary'].map((item) => (
            <li
              key={item.slug}
              className="mb-12"
            >
              <Link
                className="text-20"
                to={item.url}
              >{item.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex-col flex-wrap flex-grow -m-10 lg:max-h-720 md:max-h-1080 md:flex">
          {sitemap['secondary'].map(item => (
            <li key={item.slug} className="mx-10 mt-48">
              <Link
                className="font-bold text-20"
                to={item.url}
              >{item.title}</Link>
              {createSubMenu({ items: item.subPages })}
            </li>
          ))}
        </ul>
      </nav>
    </Page>
  );
}
