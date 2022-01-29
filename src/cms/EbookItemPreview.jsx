import React from "react";

import IntlProvider from "../components/IntlProvider";
import EbookItem from "../components/EbookItem";

export default function EbookItemPreview({ entry, getAsset }) {
  const title = entry.getIn(["data", "title"]);
  const slug = entry.getIn(["data", "slug"]);
  const image = entry.getIn(["data", "image"]);
  const imagePath = getAsset(image);
  const url = entry.getIn(["data", "url"]);
  const date = entry.getIn(["data", "date"]);
  return (
    <IntlProvider language="zh">
      <EbookItem
        title={title}
        slug={slug}
        image={imagePath}
        url={url}
        date={date}
      />
    </IntlProvider>
  );
}
