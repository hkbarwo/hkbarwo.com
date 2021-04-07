import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import Page from "../components/Page";

export default function AboutAssociationPage(props) {
  const { pageContext } = props;
  const { pageData, subMenus } = pageContext;
  const {
    title,
    description,
    logo,
    commitiees,
    commitieesTitle,
  } = pageData;
  return (
    <Page {...props}>
      <nav className="px-14">
        <ul className="flex flex-wrap items-center justify-center my-16 max-w-screen-lg mx-auto">
          {subMenus.map(m => (
            <li key={m.slug} className="m-10">
              <Link
                className={classNames(
                  'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary transition-colors duration-200',
                  m.slug === pageData.slug ? 'bg-tertiary text-white hover:bg-opacity-50' : 'text-tertiary hover:bg-opacity-20'
                )}
                to={m.localizedPath}
                alt={m.title}
              >
                {m.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full max-w-screen-xl mx-auto">
        <section className="lg:flex mt-48 tracking-wide leading-8">
          <div className="flex-shrink-0 px-14 lg:mr-120">
            <img className="mx-auto" src={logo} alt={title} style={{ width: 260 }} />
          </div>
          <div className="flex-grow mt-48 lg:mt-0">
            <h1 className="flex text-primary text-36 font-bold font-serif">{title}</h1>
            <div className="mt-24 whitespace-pre-line">{description}</div>
          </div>
        </section>
        {!!commitiees && !!commitiees.length && (
          <section className="mt-96">
            <h2 className="font-bold">{commitieesTitle}</h2>
            <ul className="mt-56 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-40 gap-y-20">
              {commitiees.map(committee => (
                <li className="text-center rounded-full border border-gray-bc p-10">
                  <div className="text-secondary">{committee.title}</div>
                  <div className="text-18 font-serif font-bold">{committee.name}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Page>
  )
}
