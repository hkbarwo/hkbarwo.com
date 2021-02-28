import React from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

export default function WorkInProgressPage({ path, pageContext }) {
  const { locale, pageData } = pageContext;
  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={pageData.title}
        />

        <PageHeader locale={locale} />

        <article className="flex-grow p-14 pb-32">
          <section className="py-72 text-36 text-gray-bc text-center font-serif font-light">
            <FormattedMessage id="wip" />
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
