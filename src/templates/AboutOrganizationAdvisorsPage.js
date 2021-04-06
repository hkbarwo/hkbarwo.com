import React, { useRef } from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import StackGrid from "react-stack-grid";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import useResize from "../utils/react-hooks/useResize";

export default function AboutOrganizationAdvisorsPage({ path, pageContext }) {
  const { locale, menus, pages, pageData, pageItem } = pageContext;
  const { groups, title } = pageData;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'about');

  const list = useRef(null);
  const { width } = useResize(list);
  const columnWidth = width > 768 ? '50%' : '100%';

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
          <section ref={list} className="mt-48 tracking-wide leading-8">
            <h1 className="flex text-primary text-36 font-bold font-serif">
              {title}
            </h1>

            <StackGrid
              className="mt-48"
              columnWidth={columnWidth}
              gutterWidth={48}
              gutterHeight={48}
              enableSSR={true}
              duration={200}
            >
              {groups.map(group => (
                <div
                  key={group.title}
                >
                  <h2 className="text-secondary">{group.title}</h2>
                  <ul>
                    {group.list.map(item => (
                      <li key={item.name}>
                        <div className="text-18 font-bold font-serif">{item.name}</div>
                        <div>{item.title}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </StackGrid>
          </section>
        </article>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
