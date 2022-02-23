import React from "react";
import classNames from "classnames";

export default function BlueButton({
  prepend: prependChild,
  className: classNameProp,
  tagName = 'a',
  href,
  children,
  ...props
}) {
  const className = classNames("inline-flex items-center rounded-8 text-white bg-secondary hover:bg-secondary-dark transition-colors duration-300 px-16 py-12", classNameProp);
  const prepend = prependChild ? (
    <div className="w-24 h-24 mr-10">{prependChild}</div>
  ) : null;
  if (tagName === 'button') {
    return (
      <button className={className} {...props}>
        {prepend} 
        {children}
      </button>
    );
  }
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="blank"
      {...props}
    >
      {prepend} 
      {children}
    </a>
  );
}
