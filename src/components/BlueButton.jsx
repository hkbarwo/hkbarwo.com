import React from "react";
import classNames from "classnames";
import { Link } from "gatsby";

export default function BlueButton(props) {
  if (props.to) {
    return (
      <Link
        className={classNames("inline-flex items-center rounded-full text-white bg-secondary px-16 py-12", props.className)}
        to={props.to}
      >
        {props.prepend && <div className="w-24 h-24 mr-10">{props.prepend}</div>} 
        {props.children}
      </Link>
    );
  }
  return (
    <a
      className={classNames("inline-flex items-center rounded-full text-white bg-secondary px-16 py-12", props.classNames)}
      href={props.href}
      rel="noopener noreferrer"
      target="blank"
    >
      {props.prepend && <div className="w-24 h-24 mr-10">{props.prepend}</div>} 
      {props.children}
    </a>
  );
}
