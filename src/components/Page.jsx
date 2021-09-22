import React,{ useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import classNames from "classnames";

import IntlProvider from "./IntlProvider";
import PageFooter from "./PageFooter";
import PageNav from "./PageNav";
import PageHeader from "./PageHeader";
import StrikethroughHeading from "./StrikethroughHeading";

export function PageMeta({
  title,
  description,
}) {
  const intl = useIntl();
  const normalizedTitle = `${title ? `${title} | ` : ''}${intl.formatMessage({ id: 'meta.title' })}`;
  return (
    <Helmet>
      <title>{normalizedTitle}</title>
      {!!description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />  
      <meta property="og:title" content={normalizedTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

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
  menuItems: menuItemsProps,
  menuItemGetActive,
  ...props
}) {
  const { locale, pageItem, parentPage } = pageContext;

  const menuItems = useMemo(() => {
    if (menuItemsProps) return menuItemsProps;

    if (!parentPage || !parentPage.subPages || parentPage.subPages.length === 0) {
      return [];
    }
    return parentPage.subPages.map((item) => ({
      path: item.localizedPath,
      key: item.slug,
      title: item.title,
    }));
  }, [parentPage, menuItemsProps]);

  const children = isEmpty || !props.children ? (
    <div className="font-serif font-light text-center py-72 text-36 text-gray-bc">
      {emptyText || <FormattedMessage id="empty" />}
    </div>
  ) : (
    props.children
  );

  const title = pageTitle || (pageItem && pageItem.title) || '';
  const description = pageDescription || (pageItem && pageItem.description) || '';

  return (
    <IntlProvider language={locale}>
      <PageMeta
        title={title}
        description={description}
      />
      <main className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={parentPage ? parentPage.title : title}
          appendPageTitle={appendPageTitle}
        />

        <PageHeader
          locale={locale}
          menuItems={menuItems}
          getActive={menuItemGetActive || (({ key }) => key === pageItem.slug)}
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
              <p className="w-full max-w-screen-sm mx-auto mt-20 leading-8 tracking-wide text-center mb-72">{description}</p>
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