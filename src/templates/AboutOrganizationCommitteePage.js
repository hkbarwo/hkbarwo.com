import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function AboutOrganizationCommitteePage({ path, pageContext }) {
  const { locale, committee, menus, pages, pageItem } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'about');
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
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
          getActive={({ key }) => key === 'organization'}
        />
        <nav className="px-14">
          <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
            <span className="mx-20">
              {pages.organization.title}
            </span>
            <span className="bg-current h-1 flex-grow" />
          </h1>
          <ul className="flex flex-wrap items-center justify-center my-16">
            {pages[pageItem.parentPage].subPages.map(page => (
              <li key={page.slug} className="m-10">
                <Link
                  className={classNames(
                    'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary transition-colors duration-200',
                    page.slug === pageItem.slug ? 'bg-tertiary text-white hover:bg-opacity-50' : 'text-tertiary hover:bg-opacity-20'
                  )}
                  to={page.localizedPath}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="flex-grow w-full max-w-screen-xl mx-auto mt-32 pb-48 md:pb-96 px-14 md:px-60">
          <section className="px-14 sm:flex items-center">
            <div className="flex-grow">
              <h1 className="flex text-primary text-36 font-bold font-serif">
                {committee.title}
              </h1>
              <div className="mt-18 leading-8">{committee.period}</div>
            </div>
            {/* <div className="mt-10 text-right sm:mt-0 sm:text-left">
              <a
                className="inline-flex items-center rounded-full text-white bg-secondary px-16 py-12"
                href="#"
                rel="noopener noreferrer"
                target="blank"
              >
                <svg className="w-24 h-24 mr-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3,15.37H21v1.48H3ZM21.63,8.8a1.45,1.45,0,0,0-1.43-1H18.41a2.21,2.21,0,0,1-.1,1.5h1.91c.78,2.22,2.07,5.78,2.28,6.4v5.68H1.5V15.67c.21-.62,2.29-6.4,2.29-6.4h1.9a2.21,2.21,0,0,1-.11-1.5H3.8a1.41,1.41,0,0,0-1.42,1C0,15.31,0,15.39,0,15.57v5.78a1.5,1.5,0,0,0,1.49,1.51h21a1.5,1.5,0,0,0,1.5-1.5h0V15.57C24,15.39,24,15.31,21.63,8.8ZM12,13.56l4.72-4.7a.74.74,0,0,0,.19-1,.75.75,0,0,0-1-.18.73.73,0,0,0-.18.17l-3,2.9V1.85a.73.73,0,0,0-.76-.71.74.74,0,0,0-.72.71v8.87l-3-2.92a.74.74,0,1,0-1,1h0Z"
                    fill="currentColor"
                  />
                </svg>
                <FormattedMessage id="committee.past" />
              </a>
            </div> */}
          </section>

          <section className="mt-48 tracking-wide leading-8">
            <ul>
              <li className="md:flex mb-32">
                <div className="flex-1 p-8">
                  <img class="mx-auto md:mx-0 block" src={committee.president.image} alt={committee.president.name} />
                </div>
                <div className="flex-1 flex justify-center items-center px-8 py-12">
                  <div className="md:p-14">
                    <div className="text-16 md:text-20 text-secondary">{committee.president.title}</div>
                    <div className="text-24 md:text-32 font-bold font-serif">{committee.president.name}</div>
                  </div>
                </div>
              </li>
              <li className="mb-32">
                <ul className="flex flex-wrap">
                  {committee.vicePresidents.map((vicePresident) => (
                    <li
                      key={vicePresident.name}
                      className="w-1/2 sm:w-1/4 px-8 py-12"
                    >
                      <div>
                        <img className="w-full" src={vicePresident.image} alt={vicePresident.name} />
                      </div>
                      <div>
                        <div className="text-12 md:text-14 text-secondary">{vicePresident.title}</div>
                        <div className="text-14 md:text-16 font-bold font-serif">{vicePresident.name}</div>
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
                              <div className="text-14 md:text-16 font-bold font-serif">{member.name}</div>
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
        </article>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
