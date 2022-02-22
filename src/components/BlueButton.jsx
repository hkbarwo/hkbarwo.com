import React from "react";
import classNames from "classnames";

export default function BlueButton({ tagName = 'a', ...props}) {
  const className = classNames("inline-flex items-center rounded-8 text-white bg-secondary hover:bg-secondary-dark transition-colors duration-300 px-16 py-12", props.className);
  const prepend = props.prepend ? (
    <div className="w-24 h-24 mr-10">{props.prepend}</div>
  ) : null;
  if (tagName === 'button') {
    return (
      <button className={className}>
        {prepend} 
        {props.children}
      </button>
    );
  }
  return (
    <a
      className={className}
      href={props.href}
      rel="noopener noreferrer"
      target="blank"
    >
      {prepend} 
      {props.children}
    </a>
  );
}
