import React from "react";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";

export default function AboutChroniclePage({ path, pageContext }) {
  const { locale, pageData, menus, chronicle } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'about');
  const { excerpt, pdf } = pageData;
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
          getActive={({ key }) => key === 'chronicle'}
        />
        <article className="flex-grow w-full max-w-screen-xl mx-auto pb-48 md:pb-96 px-14 md:px-60">
          <section className="px-14 max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20">
                {excerpt.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
            <p className="mt-20 whitespace-pre-line leading-8 text-center">{excerpt.content}</p>
          </section>
          <section className="mt-48 tracking-wide leading-8">
            <header className="text-right">
              <a
                className="inline-flex items-center rounded-full text-white bg-secondary px-16 py-12"
                href={pdf}
                rel="noopener noreferrer"
                target="blank"
              >
                <svg className="w-24 h-24 mr-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3,15.37H21v1.48H3ZM21.63,8.8a1.45,1.45,0,0,0-1.43-1H18.41a2.21,2.21,0,0,1-.1,1.5h1.91c.78,2.22,2.07,5.78,2.28,6.4v5.68H1.5V15.67c.21-.62,2.29-6.4,2.29-6.4h1.9a2.21,2.21,0,0,1-.11-1.5H3.8a1.41,1.41,0,0,0-1.42,1C0,15.31,0,15.39,0,15.57v5.78a1.5,1.5,0,0,0,1.49,1.51h21a1.5,1.5,0,0,0,1.5-1.5h0V15.57C24,15.39,24,15.31,21.63,8.8ZM12,13.56l4.72-4.7a.74.74,0,0,0,.19-1,.75.75,0,0,0-1-.18.73.73,0,0,0-.18.17l-3,2.9V1.85a.73.73,0,0,0-.76-.71.74.74,0,0,0-.72.71v8.87l-3-2.92a.74.74,0,1,0-1,1h0Z"
                    fill="currentColor"
                  />
                </svg>
                <FormattedMessage id="download.pdf" />
              </a>
            </header>
            <ul>
              {chronicle.map(yearGroup => (
                <li key={yearGroup.range}>
                  <h1 className="mt-40 text-primary text-36 font-bold font-serif">{yearGroup.range}</h1>
                  <ul>
                    {yearGroup.items.map(item => (
                      <li
                        key={item.slug}
                        className="md:flex py-20 border-b border-gray-e5"
                      >
                        <div className="flex-grow">
                          <div className="text-14" style={{ color: item.category.color }}>{item.category.title}</div>
                          <div>{item.title}</div>
                        </div>
                        {!!item.image && (
                          <div className="max-w-sm mt-16 md:mt-0 md:ml-24">
                            <img src={item.image} alt={item.title} />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
