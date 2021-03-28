import React from "react";

import MarkdownContent from "../components/MarkdownContent";
import Page from "../components/Page";

export default function MarkdownContentPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { content } = pageData;
  return (
    <Page {...props}>
      <MarkdownContent
        className="w-full max-w-screen-md mx-auto mt-44 mb-56"
        content={content}
      />
    </Page>
  );
}
