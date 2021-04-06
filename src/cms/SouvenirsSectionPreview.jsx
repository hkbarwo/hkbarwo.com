import React from "react";

import IntlProvider from "../components/IntlProvider";
import SouvenirsSection from "../components/SouvenirsSection";

export default function SouvenirsSectionPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const content = entry.getIn(["data", "content"]);
  const items = entry.getIn(["data", "items"]);
  return (
    <IntlProvider language="zh">
      <SouvenirsSection
        title={title}
        content={content}
        items={items ? items.toJS() : []}
      />
    </IntlProvider>
  );
}
