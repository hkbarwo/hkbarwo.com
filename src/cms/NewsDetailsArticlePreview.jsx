import React from "react";
import { Remarkable } from "remarkable";

import NewsDetailsArticle from "../components/NewsDetailsArticle";

export default function NewsDetailsArticlePreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const content = new Remarkable().render(entry.getIn(["data", "content"]));
  const pdfFile = entry.getIn(["data", "pdfFile"]);
  const images = entry.getIn(["data", "images"]);
  const youtubeVideoID = entry.getIn(["data", "youtubeVideoID"]);
  return (
    <NewsDetailsArticle
      title={title}
      content={content}
      pdfFile={pdfFile}
      images={images}
      youtubeVideoID={youtubeVideoID}
    />
  );
}
