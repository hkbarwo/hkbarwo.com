import React from "react";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";
import PublicationItem from "../components/PublicationItem";

export default function ResourcesPublicationsPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { publications } = pageData;

  return (
    <Page
      {...props}
      emptyText={<FormattedMessage id="publications.list.empty" />}
    >
      {<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-48 mt-96 mx-auto w-full max-w-screen-lg">
        {publications.map(({ title, slug, date, image, pdf }) => (
          <li key={slug}>
            <PublicationItem
              title={title}
              slug={slug}
              image={image}
              pdf={pdf}
              date={date}
            />
          </li>
        ))}
      </ul>}
    </Page>
  );
}
