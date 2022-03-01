import React, { Fragment } from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Menu, Transition } from '@headlessui/react';

import Link from "../components/Link";
import Page from "../components/Page";

export default function AboutOrganizationCommitteePage(props) {
  const { pageContext: { committee, menuItems, pages, pageItem } } = props;
  return (
    <Page
      {...props}
      pageTitle={pages.organization.title}
      articleClassName="max-w-screen-xl mx-auto"
    >
      <nav className="px-14">
        <ul className="flex flex-wrap items-center justify-center my-16">
          {pages[pageItem.parentPage].subPages.map(page => (
            <li key={page.slug} className="m-10">
              <Link
                className={classNames(
                  'block min-w-144 text-center rounded-8 border border-tertiary px-14 py-8 hover:bg-tertiary-light hover:text-white active:bg-tertiary transition-colors duration-300',
                  page.slug === pageItem.slug ? 'bg-tertiary text-white hover:bg-tertiary-light' : 'text-tertiary'
                )}
                to={page.localizedPath}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="mt-48 leading-8 tracking-wide">
        <div className="flex flex-col items-center sm:items-start sm:flex-row-reverse">
          <Menu as={Fragment}>
            {({ open }) => (
              <div className="relative z-20 mb-64 sm:mb-0">
                <Menu.Button
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

                  <span className="mb-4">
                    <FormattedMessage id="committee.past" />
                  </span>
                </Menu.Button>
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
                  <Menu.Items
                    className="absolute w-full mt-10 overflow-hidden bg-white rounded-md shadow-md"
                    static={true}
                  >
                    {menuItems.map((menuItem) => (
                      <Menu.Item key={menuItem.key}>
                        <Link
                          className="block px-16 py-8 text-center transition transition-colors duration-300 hover:bg-gray-e5"
                          to={menuItem.path}
                        >
                          {menuItem.title}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </div>
            )}
          </Menu>
          <div className="flex-grow text-center sm:text-left">
            <h1 className="flex font-serif font-bold text-primary text-36">
              {committee.title}
            </h1>
            <div className="leading-8 tracking-wide mt-18">{committee.period}</div>
          </div>
        </div>
        <ul>
          <li className="mb-32 md:flex">
            <div className="flex-1 p-8">
              <img
                className="block mx-auto md:mx-0"
                src={committee.president.image}
                alt={committee.president.name}
              />
            </div>
            <div className="flex items-center justify-center flex-1 px-8 py-12">
              <div className="md:p-14">
                <div className="text-16 md:text-20 text-secondary">{committee.president.title}</div>
                <div className="font-serif font-bold text-24 md:text-32">{committee.president.name}</div>
              </div>
            </div>
          </li>
          <li className="mb-32">
            <ul className="flex flex-wrap">
              {committee.vicePresidents.map((vicePresident) => (
                <li
                  key={vicePresident.name}
                  className="w-1/2 px-8 py-12 sm:w-1/4"
                >
                  <div>
                    <img className="w-full" src={vicePresident.image} alt={vicePresident.name} />
                  </div>
                  <div>
                    <div className="text-12 md:text-14 text-secondary">{vicePresident.title}</div>
                    <div className="font-serif font-bold text-14 md:text-16">{vicePresident.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <ul className="flex flex-wrap">
              {committee.groups.map((group) => (
                <li
                  key={group.title}
                  className="w-1/2 md:w-1/4 lg:w-1/8"
                >
                  <ul>
                    {group.commitiees.map(member => (
                      <li
                        className="px-8 py-12"
                        key={member.name}
                      >
                        <div>
                          <img className="w-full" src={member.image} alt={member.name} />
                        </div>
                        <div>
                          <div className="text-12 md:text-14 text-secondary">{member.title}</div>
                          <div className="font-serif font-bold text-14 md:text-16">{member.name}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>
    </Page>
  )
}
