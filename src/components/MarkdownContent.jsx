import React from "react";
import classNames from "classnames";

export default function MarkdownContent(props) {
  return (
    <div
      className={classNames("markdown", props.className)}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
}
