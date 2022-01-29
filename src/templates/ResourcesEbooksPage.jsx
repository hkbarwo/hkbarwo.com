import React from "react";
import { FormattedMessage } from "react-intl";
import EbookItem from "../components/EbookItem";

import Page from "../components/Page";

export default function ResourcesEbooksPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { ebooks } = pageData;

  return (
    <Page
      {...props}
      isEmpty={!ebooks.length}
      emptyText={<FormattedMessage id="ebook.list.empty" />}
    >
      {<ul className="grid w-full max-w-screen-lg grid-cols-1 mx-auto mt-64 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-48">
        {ebooks.map(({ slug, title, url, date, image }) => (
          <EbookItem key={slug}
            title={title}
            slug={slug}
            image={image}
            url={url}
            date={date}
          />
        ))}
      </ul>}
    </Page>
  );
}
