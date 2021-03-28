import React from "react";

export default function StrikethroughHeading({ children }) {
  return (
    <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
      <span className="bg-current h-1 flex-grow" />
      <span className="mx-20 tracking-wide">
        {children}
      </span>
      <span className="bg-current h-1 flex-grow" />
    </h1>
  );
}
