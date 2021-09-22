import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import classNames from "classnames";

import Page from "../components/Page";

export default function AboutAssociationPage(props) {
  const { pageContext } = props;
  const { pageData, subMenus } = pageContext;
  const {
    title,
    title2 = '',
    description,
    logo,
    commitiees,
    commitieesTitle,
    website,
  } = pageData;
  return (
    <Page {...props}>
      <nav className="px-14">
        <ul className="flex flex-wrap items-center justify-center max-w-screen-lg mx-auto my-16">
          {subMenus.map(m => (
            <li key={m.slug} className="m-10">
              <Link
                className={classNames(
                  'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary-light hover:text-white active:bg-tertiary transition-colors duration-300',
                  m.slug === pageData.slug ? 'bg-tertiary text-white hover:bg-tertiary-light' : 'text-tertiary'
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
        <section className="mt-48 tracking-wide lg:flex">
          <div className="flex-shrink-0 px-14 lg:mr-120">
            <img className="mx-auto" src={logo} alt={title} style={{ width: 260 }} />
          </div>
          <div className="flex-grow mt-48 lg:mt-0">
            <div className="items-center justify-between lg:flex">
              <h1 className="flex font-serif font-bold tracking-wide text-primary text-36">{title}{title2}</h1>
              {!!website && (
                <a
                  className="flex items-center mt-8 font-medium lg:mt-0 whitespace-nowrap text-tertiary"
                  href={website}
                  alt={title}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <svg
                    className="flex-shrink-0 mr-8 fill-current w-18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.2,17.66H1.5A1.16,1.16,0,0,1,.34,16.51V3.8A1.16,1.16,0,0,1,1.5,2.65H7.27V3.8H1.5V16.5H14.2V10.73h1.15V16.5A1.16,1.16,0,0,1,14.2,17.66ZM9,.34a.57.57,0,0,0-.57.58A.57.57,0,0,0,9,1.5h6.69l-8,8a.58.58,0,0,0,.76.87l.06-.06,8-8V9a.58.58,0,1,0,1.15,0V.34Z"/>
                  </svg>
                  <FormattedMessage id="website" />
                </a>
              )}
            </div>
            <div className="mt-24 leading-8 tracking-wide whitespace-pre-line">{description}</div>
          </div>
        </section>
        {!!commitiees && !!commitiees.length && (
          <section className="mt-96">
            <h2 className="font-bold">{commitieesTitle}</h2>
            <ul className="grid grid-cols-1 mt-56 sm:grid-cols-2 lg:grid-cols-4 gap-x-40 gap-y-20">
              {commitiees.map(committee => (
                <li className="p-10 text-center border rounded-full border-gray-bc">
                  <div className="text-secondary">{committee.title}</div>
                  <div className="font-serif font-bold text-18">{committee.name}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Page>
  )
}
