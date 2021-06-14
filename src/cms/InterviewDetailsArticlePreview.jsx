import React from "react";
import { Remarkable } from "remarkable";

import InterviewDetailsArticle from "../components/InterviewDetailsArticle";
import IntlProvider from "../components/IntlProvider";

export default function InterviewDetailsArticlePreview({ entry, widgetsFor }) {
  const md = new Remarkable();
  const title = entry.getIn(["data", "articleTitle"]);
  const content = md.render(entry.getIn(["data", "articleContent"]));
  const photosTitle = entry.getIn(["data", "articlePhotosTitle"]);
    
  const photos = widgetsFor("articlePhotos").map(section => {
    const { data } = section.toJS();
    const { image, caption } = data;
    return {
      image,
      caption,
    };
  });

  return (
    <IntlProvider language="zh">
      <InterviewDetailsArticle
        title={title}
        content={content}
        photosTitle={photosTitle}
        photos={photos}
      />
    </IntlProvider>
  );
}
