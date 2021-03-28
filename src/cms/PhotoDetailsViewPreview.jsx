import React from "react";

import IntlProvider from "../components/IntlProvider";
import PhotoDetailsView from "../components/PhotoDetailsView";

export default function PhotoDetailsViewPreview({ entry, getAsset }) {
  const title = entry.getIn(["data", "title"]);
  const description = entry.getIn(["data", "description"]);
  const image = entry.getIn(["data", "image"]);
  const imageSrc = getAsset(image);
  return (
    <IntlProvider language="zh">
      <PhotoDetailsView
        title={title}
        description={description}
        src={imageSrc}
      />
    </IntlProvider>
  );
}
