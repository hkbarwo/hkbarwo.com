import React,{ useMemo } from "react";

import IntlProvider from "./IntlProvider";
import PageFooter from "./PageFooter";
import PageNav from "./PageNav";
import PageHeader from "./PageHeader";
import StrikethroughHeading from "./StrikethroughHeading";

export default function Page({ path, pageContext, children }) {
  const { locale, pageItem, parentPage } = pageContext;

  const menuItems = useMemo(() => {
    if (!parentPage || !parentPage.subPages || parentPage.subPages.length === 0) {
      return [];
    }
    return parentPage.subPages.map((item) => ({
      path: item.localizedPath,
      key: item.slug,
      title: item.title,
    }));
  }, [parentPage]);

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={parentPage ? parentPage.title : pageItem.title}
        />

        <PageHeader
          locale={locale}
          menuItems={menuItems}
          getActive={({ key }) => key === pageItem.slug}
        />

        <article className="flex-grow p-14 pb-96 md:px-60">
          <StrikethroughHeading>{pageItem.title}</StrikethroughHeading>
          {pageItem.description && (
            <p className="w-full max-w-screen-sm mt-20 mx-auto mb-72 text-center">{pageItem.description}</p>
          )}

          {children}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}