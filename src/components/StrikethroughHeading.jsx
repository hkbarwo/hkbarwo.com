import React from "react";
import classNames from "classnames";

export default function StrikethroughHeading({ className, children, ...props }) {
  return (
    <h1
      className={classNames(
        'flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif',
        className
      )}
      {...props}
    >
      <span className="flex-grow h-1 bg-current" />
      <span className="mx-20 tracking-wide">
        {children}
      </span>
      <span className="flex-grow h-1 bg-current" />
    </h1>
  );
}
