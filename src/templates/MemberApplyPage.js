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

        <article className="flex-grow pb-56 p-14">
          <section className="w-full max-w-2xl mx-auto px-14">
            <h1 className="flex items-center justify-center max-w-sm mx-auto font-serif font-bold text-center text-primary text-24">
            <span className="flex-grow h-1 bg-current" />
              <span className="mx-20 tracking-widest">
                {pageItem.title}
              </span>
              <span className="flex-grow h-1 bg-current" />
            </h1>
          </section>

          <section className="mb-32 mt-96 lg:flex px-14 md:pr-0 lg:pl-60 lg:pl-120">
            <div className="flex-shrink-0 w-full lg:mr-48 lg:max-w-sm">
              {pageData.title && (
                <h1 className="mb-32 font-serif font-bold tracking-wide text-primary text-36">
                  {pageData.title}
                </h1>
              )}
              {pageData.description && (
                <div className="leading-8 tracking-wide whitespace-pre-line">
                  {pageData.description}
                </div>
              )}
            </div>

            <div className="flex-grow mt-48 lg:mt-0">
              <img src={pageData.image} alt={pageData.title} />
            </div>
          </section>

          <section className="w-full mx-auto px-14 mt-96">
            <h1 className="flex items-center justify-center max-w-sm mx-auto font-serif font-bold text-center text-primary text-24">
              <span className="flex-grow h-1 bg-current" />
              <span className="mx-20 tracking-widest">
                {pageData.registration.title}
              </span>
              <span className="flex-grow h-1 bg-current" />
            </h1>
              
            <div
              className="max-w-3xl mx-auto mt-56 tracking-wide markdown"
              dangerouslySetInnerHTML={{ __html: pageData.registration.description }}
            />

            <ul className="justify-between max-w-5xl mx-auto md:flex mt-72">
              {pageData.registration.steps.map(((step, i) => (
                <li key={i} className="mt-40 md:mt-0">
                  <div className="mx-auto mb-16 w-212 h-212">
                    <img src={step.icon} alt={step.title} />
                  </div>
                  <div className="tracking-wide text-center text-20">{step.title}</div>
                </li>
              )))}
            </ul>

            <div className="text-center mt-72">
              <a
                className="inline-flex items-center px-40 py-12 text-white transition-colors duration-300 rounded-full bg-secondary"
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
