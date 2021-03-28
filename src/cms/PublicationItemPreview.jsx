import React from "react";

import IntlProvider from "../components/IntlProvider";
import PublicationItem from "../components/PublicationItem";

export default function PublicationItemPreview({ entry, getAsset }) {
  const title = entry.getIn(["data", "title"]);
  const slug = entry.getIn(["data", "slug"]);
  const image = entry.getIn(["data", "image"]);
  const imagePath = getAsset(image);
  const pdf = entry.getIn(["data", "pdf"]);
  const date = entry.getIn(["data", "date"]);
  return (
    <IntlProvider language="zh">
      <PublicationItem
        title={title}
        slug={slug}
        image={imagePath}
        pdf={pdf}
        date={date}
      />
    </IntlProvider>
  );
}
