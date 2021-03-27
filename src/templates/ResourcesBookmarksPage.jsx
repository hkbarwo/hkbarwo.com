import React from "react";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";
import TheatersList from "../components/TheatersList";
import WebsitesList from "../components/WebsitesList";

export default function ResourcesInfoPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { websites, theaters } = pageData;

  return (
    <Page {...props}>
      <div className="mt-96 mx-auto w-full max-w-screen-md">
        {websites.map(({ title, links }, i) => (
          <WebsitesList
            className="mb-40"
            key={i}
            title={title}
            links={links}
          />
        ))}
        <h1 className="mb-16 text-primary text-36 font-bold font-serif">
          <FormattedMessage id="resources.gov" />
        </h1>
        <TheatersList items={theaters} />
      </div>
    </Page>
  );
}
