import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function AboutPage({ path, pageContext }) {
  const { locale, pageData, menus } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'about');
  const {
    excerpt,
    excerpt2,
    sections,
    introduction,
    developmentStrategy,
    developmentStrategyImage,
    associations,
  } = pageData;
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={menuItem.title}
        />
        <PageHeader
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === 'introduction'}
        />
        <article className="flex-grow w-full max-w-screen-xl mx-auto pb-48 md:pb-96">
          <section className="px-14 max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20">
                {excerpt.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
            <p className="mt-20 whitespace-pre-line leading-8">{excerpt.content}</p>
          </section>
          <section className="mt-48 md:flex md:mt-60 xl:mt-120">
            <div className="flex-1 pt-0 p-14 pb-60 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120">
              <h1 className="text-primary text-36 font-serif font-bold">{introduction.title}</h1>
              <p className="mt-10 whitespace-pre-line leading-8">{introduction.content}</p>
            </div>
            <div className="flex-1">
              <img src={introduction.image} alt="" />
            </div>
          </section>
          <section>
          <section
            className="text-white p-32 md:px-60"
            style={{
              backgroundImage:
                `linear-gradient(to bottom, #CC153D 0% , #F79D5E 100%)`,
            }}
          >
            <div className="flex flex-col items-center px-14">
              <h1>{associations.title}</h1>
              <div>

              </div>
              <Link
                className="mt-60 mx-auto flex items-center py-10 px-24 rounded-full border border-white bg-white bg-opacity-25 group"
                to={`${locale}/about/associations`}
              >
                {associations.buttonTitle}
              </Link>
            </div>
          </section>
          </section>
          <section className="mt-48 px-14 max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20">
                {excerpt2.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
            <p className="mt-20 whitespace-pre-line leading-8">{excerpt2.content}</p>
          </section>
          <section className="mt-48 md:flex md:mt-60 xl:mt-120">
            <div
              className="flex-1 mt-10 pt-0 p-14 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120 leading-8"
              dangerouslySetInnerHTML={{ __html: developmentStrategy }}
            />
            <div className="flex-1">
              <img className="mx-auto" src={developmentStrategyImage} alt="" />
            </div>
          </section>
          {sections.map((section, i) => (
            <section className={classNames(
              'mt-48 md:flex md:mt-60 xl:mt-120',
              {
                'md:flex-row-reverse': i % 2 === 0
              }
              )}
            >
              <div
                className={classNames(
                  "flex-1 pt-0 p-14",
                  i % 2 === 0
                    ? 'md:ml-60 xl:ml-120 md:mr-48 xl:mr-96'
                    : 'md:mr-60 xl:mr-120 md:ml-48 xl:ml-96'
                )}
              >
                <h1 className="text-primary text-36 font-serif font-bold">{section.title}</h1>
                <p className="mt-10 whitespace-pre-line leading-8">{section.content}</p>
              </div>
              <div className="flex-1">
                <img src={section.image} alt={section.title} />
              </div>
            </section>
          ))}
        </article>
        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
