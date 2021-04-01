import React from "react";

import InterviewDetailsArticle from "../components/InterviewDetailsArticle";
import Page from "../components/Page";

export default function InterviewDetailsArticlePage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { interview } = pageData;
  return (
    <Page {...props} isShowTitle={false}>
      <InterviewDetailsArticle
        className="w-full max-w-screen-xl mx-auto mb-56"
        {...interview}
      />
    </Page>
  );
}
