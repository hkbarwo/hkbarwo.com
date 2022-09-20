import React, { Fragment, useMemo, useState } from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Listbox, Transition } from '@headlessui/react';

import Page from "../components/Page";

export default function PerformancesCelebrationsPage(props) {
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
      articleClassName="w-full max-w-screen-xl mx-auto"
    >
      {filteredPerformances.length > 0 ? (
        <Fragment>
          <aside className="flex justify-center pt-32 md:justify-end">
            <Listbox value={selectedYear} onChange={setSelectedYear}>
              {({ open }) => (
                <div className="relative z-20">
                  <Listbox.Button
                    className={classNames(
                      'flex items-center px-24 py-8 text-white rounded-8',
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
                    <Listbox.Options
                      className="absolute w-full mt-10 overflow-hidden bg-white rounded-md shadow-md"
                      static={true}
                    >
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
          <ul
            key={selectedYear}
            className="grid grid-cols-1 gap-48 md:grid-cols-2 lg:grid-cols-3 mt-72"
          >
            {filteredPerformances.map((event) => (
              <li key={event.slug} className="relative p-32 shadow-outline rounded-xl">
                <h2 className="font-bold text-20">{event.title}</h2>
                {event.metadata.map(data => (
                  <div key={data.label} className="mt-12">
                    <div className="font-bold text-secondary text-14">{data.label}</div>
                    <div className={classNames('markdown', { 'text-tertiary': data.isShowInList })} dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                ))}
                <div className="absolute flex items-center right-24 -top-12">
                  <span className="mt-12 mr-8 text-14">
                    <FormattedMessage id="events.sessions" />
                  </span>
                  <div className="flex items-center justify-center w-48 h-48 font-bold text-white rounded-full text-24 bg-primary">
                    {event.sessions}
                  </div>
                </div>
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
