import React, { Fragment, useMemo, useState } from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Listbox, Transition } from '@headlessui/react';

import Link from "../components/Link";
import Page from "../components/Page";

export default function PerformancesOthersPage(props) {
  const { pageContext } = props;
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredPerformances = useMemo(
    () => pageData.performances.filter(c => new Date(c.date).getFullYear() === selectedYear),
    [pageData.performances, selectedYear]
  );

  return (
    <Page
      {...props}
      menuItems={menuItem.subPages.map((item) => ({
        path: `/${locale}${item.url}`,
        key: item.slug,
        title: item.title,
      }))}
      articleClassName="max-w-screen-xl mx-auto"
    >
      {filteredPerformances.length > 0 ? (
        <Fragment>
          <aside className="flex justify-center pt-32 md:justify-end">
            <Listbox value={selectedYear} onChange={setSelectedYear}>
              {({ open }) => (
                <div className="relative z-20">
                  <Listbox.Button
                    className={classNames(
                      'flex items-center px-24 py-8 text-white rounded-full',
                      open ? 'bg-secondary-dark' : 'bg-secondary',
                      'hover:bg-secondary-dark',
                      'transition',
                      'transition-colors',
                      'duration-300',
                    )}
                  >
                    <svg
                      className="mr-16"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      viewBox="0 0 22.84 22.68"
                    >
                      <g fill="currentColor">
                        <path d="M3.43,5.27a1.51,1.51,0,1,1-1.5-1.52h0A1.51,1.51,0,0,1,3.43,5.27Z" />
                        <path d="M3.43,11.34a1.51,1.51,0,1,1-1.5-1.52h0A1.51,1.51,0,0,1,3.43,11.34Z" />
                        <path d="M3.43,17.41a1.51,1.51,0,1,1-1.5-1.52h0A1.51,1.51,0,0,1,3.43,17.41Z" />
                        <path d="M22.42,5.14a.76.76,0,0,0-.75-.76H5.54V5.9H21.67A.76.76,0,0,0,22.42,5.14Z" />
                        <path d="M21.67,10.45H5.54V12H21.67a.76.76,0,0,0,0-1.52Z" />
                        <path d="M21.67,16.52H5.54V18H21.67a.76.76,0,0,0,0-1.52Z" />
                      </g>
                    </svg>

                    <span className="mb-4">{selectedYear}</span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    show={open}
                    appear={true}
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-300 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options className="absolute z-20 w-full mt-10 overflow-hidden bg-white rounded-md shadow-md">
                      {pageData.years.map((year) => (
                        <Listbox.Option
                          key={year}
                          className="px-16 py-8 text-center transition transition-colors duration-300 hover:bg-gray-e5"
                          value={year}
                        >
                          {year}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </aside>
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-60 lg:gap-x-96 mt-60">
            {filteredPerformances.map((event, i) => (
              <li key={event.slug}>
                {!!event.coverImage && <img className="w-full mb-20" src={event.coverImage} alt={event.title} />}
                <h1 className="font-black text-24">{event.title}</h1>
                <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: event.content }} />
                <ul className="mt-20">
                  {event.metadata.filter((({ isShowInList }) => isShowInList)).map((data, i) => (
                    <li key={data.label} className={classNames({ 'mt-12': i > 0 })}>
                      <div className="font-bold text-secondary text-14">{data.label}</div>
                      <div className="markdown text-tertiary" dangerouslySetInnerHTML={{ __html: data.content }} />
                    </li>
                  ))}
                </ul>
                <Link
                  className="inline-flex items-center px-40 py-12 mt-20 text-white rounded-full bg-secondary"
                  to={`/${locale}/performances/${event.slug}`}
                >
                  <FormattedMessage id="know.more" />
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <p
          className="font-serif font-light text-center py-72 text-36 text-gray-bc"
        ><FormattedMessage id="events.list.empty" /></p>
      )}
    </Page>
  );
}
