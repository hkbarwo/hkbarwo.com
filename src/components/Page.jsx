import React,{ useMemo } from "react";
import { FormattedMessage } from "react-intl";

import IntlProvider from "./IntlProvider";
import PageFooter from "./PageFooter";
import PageNav from "./PageNav";
import PageHeader from "./PageHeader";
import StrikethroughHeading from "./StrikethroughHeading";

export default function Page({
  path,
  pageContext,
  pageTitle,
  appendPageTitle,
  pageDescription,
  isEmpty = false,
  emptyText,
  isShowTitle = true,
  prepend,
  ...props
}) {
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

  const children = isEmpty || !props.children ? (
    <div className="py-72 text-36 text-gray-bc text-center font-serif font-light">
      {emptyText || <FormattedMessage id="empty" />}
    </div>
  ) : (
    props.children
  );

  const title = pageTitle || pageItem.title;
  const description = pageDescription || pageItem.description;

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen overflow-x-hidden">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={parentPage ? parentPage.title : pageItem.title}
          appendPageTitle={appendPageTitle}
        />

        <PageHeader
          locale={locale}
          menuItems={menuItems}
          getActive={({ key }) => key === pageItem.slug}
        />

        <article className="flex-grow p-14 pb-96 md:px-60">
          {isShowTitle && <StrikethroughHeading>{title}</StrikethroughHeading>}
          {description && (
            <p className="w-full max-w-screen-sm mt-20 mx-auto mb-72 text-center">{description}</p>
          )}

          {prepend}

          {children}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}