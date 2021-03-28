import React from "react";
import { Remarkable } from "remarkable";

import IntlProvider from "../components/IntlProvider";
import MarkdownContent from "../components/MarkdownContent";

export default function MarkdownPagePreview({ entry }) {
  const content = new Remarkable().render(entry.getIn(["data", "content"]));
  return (
    <IntlProvider language="zh">
      <MarkdownContent content={content} />
    </IntlProvider>
  );
}
