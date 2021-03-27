import React from "react";

import IntlProvider from "../components/IntlProvider";
import WebsitesList from "../components/WebsitesList";

export default function WebsitesPreview({ widgetsFor }) {
  const lists = widgetsFor("list");
  return (
    <IntlProvider language="zh">
      {lists.map((list, i) => {
        const title = list.getIn(["data", "title"]);
        const links = list.getIn(["data", "links"]).toJS();
        return (
          <WebsitesList
            className="mb-40"
            key={i}
            title={title}
            links={links}
          />
        );
      })}
    </IntlProvider>
  );
}
