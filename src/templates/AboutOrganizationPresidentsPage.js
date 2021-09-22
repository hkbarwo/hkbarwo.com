import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function AboutOrganizationPresidentsPage({ path, pageContext }) {
  const { locale, menus, pages, presidents, vicePresidents, pageItem } = pageContext;
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
          <h1 className="flex items-center justify-center max-w-sm mx-auto font-serif font-bold text-primary text-24">
            <span className="flex-grow h-1 bg-current" />
            <span className="mx-20">
              {pages.organization.title}
            </span>
            <span className="flex-grow h-1 bg-current" />
          </h1>
          <ul className="flex flex-wrap items-center justify-center my-16">
            {pages[pageItem.parentPage].subPages.map(page => (
              <li key={page.slug} className="m-10">
                <Link
                  className={classNames(
                    'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary-light hover:text-white active:bg-tertiary transition-colors duration-300',
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
        <article className="flex-grow w-full max-w-screen-xl pb-48 mx-auto mt-32 md:pb-96 px-14 md:px-60">
          <section className="items-center px-14 sm:flex">
            <div className="flex-grow">
              <h1 className="flex font-serif font-bold text-primary text-36">
                {pages.presidents.title}
              </h1>
            </div>
          </section>

          <section className="mt-48 leading-8 tracking-wide">
            <ul>
              <li className="mb-32">
                <ul className="flex flex-wrap">
                  {presidents.map((p) => (
                    <li
                      key={p.name}
                      className="w-1/2 px-8 py-12 sm:w-1/4"
                    >
                      <div>
                        <img className="w-full" src={p.image} alt={p.name} />
                      </div>
                      <div>
                        <div className="text-12 md:text-14 text-secondary">{p.title}</div>
                        <div className="font-serif font-bold text-14 md:text-16">{p.name}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <ul className="flex flex-wrap">
                  {vicePresidents.map(vp => (
                    <li
                    key={vp.name}
                      className="w-1/2 px-8 py-12 sm:w-1/4 md:w-1/6"
                    >
                      <div>
                        <img className="w-full" src={vp.image} alt={vp.name} />
                      </div>
                      <div>
                        <div className="text-12 md:text-14 text-secondary">{vp.title}</div>
                        <div className="font-serif font-bold text-14 md:text-16">{vp.name}</div>
                      </div>
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
