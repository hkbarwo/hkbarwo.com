import React from "react";

import IntlProvider from "../components/IntlProvider";
import TheatersList from "../components/TheatersList";

export default function TheatersPreview({ entry }) {
  const theaters = entry.getIn(["data", "list"]).toJS();
  return (
    <IntlProvider language="zh">
      <TheatersList items={theaters} />
    </IntlProvider>
  );
}
