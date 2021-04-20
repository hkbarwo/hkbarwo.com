import React,{ useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Helmet } from "react-helmet";
import classNames from "classnames";

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
  isNoHorizontalPadding = false,
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
      <Helmet>
        <title>{title}</title>
        {!!description && <meta name="description" content={description} />}
        <meta property="og:type" content="website" />  
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
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

        <article
          className={classNames(
            "flex-grow pb-96",
            isNoHorizontalPadding ? 'py-14' : 'p-14 md:px-60'
          )}
        >
          <section className={classNames({ 'px-14': isNoHorizontalPadding })}>
            {isShowTitle && <StrikethroughHeading>{title}</StrikethroughHeading>}
            {description && (
              <p className="w-full max-w-screen-sm mt-20 mx-auto mb-72 text-center">{description}</p>
            )}
          </section>

          {prepend}

          {children}
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}