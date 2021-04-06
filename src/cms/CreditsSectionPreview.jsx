import React from "react";

import IntlProvider from "../components/IntlProvider";
import CreditsSection from "../components/CreditsSection";

export default function CreditsSectionPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const items = entry.getIn(["data", "items"]);
  return (
    <IntlProvider language="zh">
      <CreditsSection
        title={title}
        items={items ? items.toJS() : []}
      />
    </IntlProvider>
  );
}
