import React from "react";
import classNames from "classnames";

export default function StrikethroughHeading({ className, children }) {
  return (
    <h1
      className={classNames(
        'flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif',
        className
      )}
    >
      <span className="bg-current h-1 flex-grow" />
      <span className="mx-20 tracking-wide">
        {children}
      </span>
      <span className="bg-current h-1 flex-grow" />
    </h1>
  );
}
