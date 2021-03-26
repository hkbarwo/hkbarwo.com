import React from "react";

import IntlProvider from "./IntlProvider";
import PageFooter from "./PageFooter";
import PageNav from "./PageNav";
import PageHeader from "./PageHeader";
import StrikethroughHeading from "./StrikethroughHeading";

export default function Page({ path, pageContext, children }) {
  const { locale, pageItem } = pageContext;
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={pageItem.title}
        />

        <PageHeader locale={locale} />

        <article className="flex-grow p-14 pb-32 md:px-60">
          <StrikethroughHeading>{pageItem.title}</StrikethroughHeading>

          {children}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}