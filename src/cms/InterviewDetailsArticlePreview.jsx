import React from "react";
import { Remarkable } from "remarkable";

import InterviewDetailsArticle from "../components/InterviewDetailsArticle";
import IntlProvider from "../components/IntlProvider";

export default function InterviewDetailsArticlePreview({ entry, widgetsFor, getAsset }) {
  const md = new Remarkable();
  const title = entry.getIn(["data", "title"]);

  const sections = widgetsFor("sections").map(section => {
    const { data } = section.toJS();
    const content = md.render(data.content);
    const { images, layout } = data;
    return {
      content,
      layout,
      images,
    };
  });

  return (
    <IntlProvider language="zh">
      <InterviewDetailsArticle
        title={title}
        sections={sections}
      />
    </IntlProvider>
  );
}
