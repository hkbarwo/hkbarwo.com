import React from "react";
import classNames from "classnames";

export default function FormInput({
  tagName: TagName = 'input',
  className,
  ...props
}) {
  return (
    <TagName
      className={classNames('w-full block border border-gray-70 p-12 px-24 text-14 rounded-8', className)}
      {...props}
    />
  );
}
