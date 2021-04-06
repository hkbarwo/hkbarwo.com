import React from "react";
import classNames from "classnames";

import CreditsSection from "../components/CreditsSection";
import Page from "../components/Page";
import SouvenirsSection from "../components/SouvenirsSection";

export default function SupportPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  return (
    <Page {...props}>
      <section className="mt-96 mb-32 lg:flex px-14 md:pr-0 lg:pl-60 lg:pl-120">
        <div className="lg:mr-48 lg:max-w-sm	w-full flex-shrink-0">
          {pageData.intro.title && (
            <h1 className="mb-32 text-primary text-36 font-bold font-serif">
              {pageData.intro.title}
            </h1>
          )}
          {pageData.intro.description && (
            <div className="whitespace-pre-line">
              {pageData.intro.description}
            </div>
          )}
        </div>

        <div className="flex-grow mt-48 lg:mt-0">
          <img src={pageData.intro.image} alt={pageData.intro.title} />
        </div>
      </section>

      <section className="px-14 max-w-3xl w-full mx-auto">
        <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
          <span className="bg-current h-1 flex-grow" />
          <span className="mx-20">
            {pageData.offering.title}
          </span>
          <span className="bg-current h-1 flex-grow" />
        </h1>

        <ul>
          {pageData.offering.methods.map(((method, i) => (
            <li
              key={i}
              className="mt-48 md:flex"
            >
              <div className={classNames('mx-auto w-96 h-96 md:mr-32 mb-16 md:mb-0 flex-shrink-0', { 'hidden md:block': !method.icon  })}>
                <img src={method.icon} alt="" />
              </div>
              <div className="flex-grow">
                {!!method.title && (
                  <h2 className="text-20 text-secondary mb-8">{method.title}</h2>
                )}
                <div className="whitespace-pre-line">{method.content}</div>
              </div>
            </li>
          )))}
        </ul>
      </section>

      {!!(pageData.credits && pageData.credits.items && pageData.credits.items.length) && (
        <CreditsSection
          className="mt-96"
          {...pageData.credits}
        />
      )}

      <SouvenirsSection
        className="mt-128"
        {...pageData.souvenir}
      />
    </Page>
  )
}
