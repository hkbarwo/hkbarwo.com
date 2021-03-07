import React from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function MemberApplyPage({ path, pageContext }) {
  const { locale, pageItem, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'member');
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen tracking-wide">
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
          getActive={({ key }) => key === 'member-apply'}
        />

        <article className="flex-grow p-14 pb-56">
          <section className="px-14 max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
            <span className="bg-current h-1 flex-grow" />
              <span className="mx-20 tracking-widest">
                {pageItem.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
          </section>

          <section className="mt-96 mb-32 lg:flex px-14 md:pr-0 lg:pl-60 lg:pl-120">
            <div className="lg:mr-48 lg:max-w-sm	w-full flex-shrink-0">
              {pageData.title && (
                <h1 className="mb-32 text-primary text-36 font-bold font-serif tracking-wide">
                  {pageData.title}
                </h1>
              )}
              {pageData.description && (
                <div className="whitespace-pre-line leading-8 tracking-wide">
                  {pageData.description}
                </div>
              )}
            </div>

            <div className="flex-grow mt-48 lg:mt-0">
              <img src={pageData.image} alt={pageData.title} />
            </div>
          </section>

          <section className="px-14 mt-96 w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20 tracking-widest">
                {pageData.registration.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
              
            <div
              className="markdown max-w-3xl mx-auto mt-56 tracking-wide"
              dangerouslySetInnerHTML={{ __html: pageData.registration.description }}
            />

            <ul className="md:flex max-w-5xl mx-auto justify-between mt-72">
              {pageData.registration.steps.map(((step, i) => (
                <li key={i} className="mt-40 md:mt-0">
                  <div className="mx-auto w-212 h-212 mb-16">
                    <img src={step.icon} />
                  </div>
                  <div className="text-20 tracking-wide text-center">{step.title}</div>
                </li>
              )))}
            </ul>

            <div className="mt-72 text-center">
              <a
                className="inline-flex items-center rounded-full text-white bg-secondary px-40 py-12"
                href={pageData.pdf}
                rel="noopener noreferrer"
                target="blank"
              >
                <FormattedMessage id="member.apply" />
              </a>
            </div>
          </section>

        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
