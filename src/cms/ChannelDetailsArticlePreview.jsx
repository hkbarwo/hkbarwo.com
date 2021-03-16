import React from "react";
import { Remarkable } from "remarkable";

import ChannelDetailsArticle from "../components/ChannelDetailsArticle";
import IntlProvider from "../components/IntlProvider";

export default function ChannelDetailsArticlePreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const content = new Remarkable().render(entry.getIn(["data", "content"]));
  const youtubeVideoID = entry.getIn(["data", "youtubeVideoID"]);
  return (
    <IntlProvider language="zh">
      <ChannelDetailsArticle
        title={title}
        content={content}
        youtubeVideoID={youtubeVideoID}
      />
    </IntlProvider>
  );
}
