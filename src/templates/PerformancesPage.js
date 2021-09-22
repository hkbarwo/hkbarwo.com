import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";

export default function PerformancesPage(props) {
  const { pageContext } = props;
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const events = useMemo(() => {
    const now = Date.now();
    return pageData.performances.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    })
  }, [pageData.performances]);

  return (
    <Page
      {...props}
      menuItems={menuItem.subPages.map((item) => ({
        path: `/${locale}${item.url}`,
        key: item.slug,
        title: item.title,
      }))}
    >
      {!!pageData.yts && (
        <div className="flex justify-center mx-auto mb-20 mt-36 max-w-screen-2xl lg:justify-end">
          <a
            className="text-tertiary"
            href={pageData.yts.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="mx-auto"
              xmlns="http://www.w3.org/2000/svg" width="51.006" height="29.405"
            >
              <path
                d="M50.146 11.276h-3.6V9.423a.859.859 0 00-.86-.86 4.229 4.229 0 01-4.224-4.224V.86a.86.86 0 00-.86-.86H10.409a.861.861 0 00-.86.86v3.479a4.229 4.229 0 01-4.224 4.224.86.86 0 00-.86.86v1.853h-3.6a.86.86 0 00-.86.86v16.408a.86.86 0 00.86.86H50.15a.86.86 0 00.86-.86V12.137a.86.86 0 00-.864-.861zm-16.408 7.573h15.548v3.685H33.738zM6.181 10.22a5.952 5.952 0 005.084-5.882V1.719h28.473v2.619a5.953 5.953 0 005.088 5.883v1.055H33.493l-.011-.027c-.027-.068-.059-.134-.087-.2-.058-.139-.116-.279-.182-.414-.038-.079-.081-.155-.122-.233a8.154 8.154 0 00-.193-.356c-.047-.081-.1-.158-.148-.237-.069-.108-.137-.216-.209-.321-.056-.08-.115-.157-.173-.235-.074-.1-.148-.2-.226-.293-.062-.077-.127-.151-.192-.225a10.42 10.42 0 00-.244-.27 10.494 10.494 0 00-.473-.459c-.089-.081-.151-.132-.227-.2s-.184-.152-.278-.225-.16-.121-.242-.18c-.1-.07-.2-.137-.3-.2a8.317 8.317 0 00-.564-.341c-.088-.049-.175-.1-.263-.142a8.244 8.244 0 00-.329-.157c-.089-.041-.179-.083-.269-.12a9.093 9.093 0 00-.346-.132c-.092-.034-.182-.069-.275-.1-.12-.04-.243-.074-.365-.108-.091-.025-.181-.052-.273-.075-.131-.033-.263-.057-.4-.083-.086-.017-.172-.037-.259-.052a8.65 8.65 0 00-.447-.055c-.075-.009-.148-.021-.223-.027a8.51 8.51 0 00-1.36 0c-.074.006-.148.018-.222.027-.15.015-.3.032-.446.055-.087.015-.173.034-.26.052-.132.026-.264.051-.395.083-.092.022-.182.05-.274.076a8.951 8.951 0 00-.364.107c-.093.031-.183.066-.275.1a9.093 9.093 0 00-.346.132c-.09.038-.18.079-.268.12-.111.05-.221.1-.328.157a9.35 9.35 0 00-.263.142c-.1.058-.209.117-.312.179q-.129.079-.254.163-.15.1-.294.2a8.456 8.456 0 00-1.009.854c-.071.07-.141.139-.21.211a10.42 10.42 0 00-.244.27c-.064.074-.13.148-.193.225-.078.1-.151.194-.225.293-.058.077-.117.155-.173.235-.072.1-.14.212-.208.32-.05.079-.1.157-.15.239-.068.116-.13.236-.192.354-.041.078-.084.155-.123.234a8.098 8.098 0 00-.182.414c-.028.068-.06.134-.087.2l-.011.027H6.172zm13.72.214c.047-.066.1-.125.151-.189a6.866 6.866 0 01.5-.594c.085-.089.179-.17.268-.255a7.02 7.02 0 01.487-.425c.106-.083.216-.158.326-.235.169-.118.344-.229.524-.33a6.614 6.614 0 01.94-.44c.122-.046.243-.1.367-.135a6.855 6.855 0 01.672-.169c.11-.022.218-.053.33-.071a6.729 6.729 0 011.04-.086 6.734 6.734 0 011.041.086c.111.018.219.049.329.071a6.786 6.786 0 01.672.169c.126.04.246.089.368.135.2.076.391.157.581.249a7.216 7.216 0 01.884.522c.11.076.219.151.325.233.17.133.33.279.489.427.089.084.181.164.267.253a7.216 7.216 0 01.5.6c.048.064.1.121.15.187a6.848 6.848 0 01.5.841H19.406a6.751 6.751 0 01.494-.843zm-14.58 2.562h43.965v4.132H33.738v-1.7a.86.86 0 00-.86-.86H18.129a.86.86 0 00-.86.86v1.7H1.721v-4.132zm-3.6 5.852h15.548v3.685H1.721zm0 5.405h15.548v3.43H1.721zm17.268 3.43V16.29h13.028v11.393zm14.749 0v-3.43h15.548v3.43z"
                fill="currentColor"
              />
            </svg>
            <span className="flex items-center mt-4 font-500">
              <svg
                className="mr-8"
                xmlns="http://www.w3.org/2000/svg"
                width="17.319"
                height="17.32"
                fill="currentColor"
              >
                <path d="M13.856 17.32H1.155A1.155 1.155 0 010 16.166V3.465A1.155 1.155 0 011.155 2.31h5.773v1.155H1.155v12.7h12.7v-5.773h1.155v5.773a1.155 1.155 0 01-1.154 1.155z"/>
                <path d="M8.663 0a.577.577 0 100 1.155h6.691l-8 8a.577.577 0 10.814.814l8-8V8.66a.577.577 0 101.155 0V0z"/>
              </svg>
              {pageData.yts.title}
            </span>
          </a>
        </div>
      )}

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
  );
}
