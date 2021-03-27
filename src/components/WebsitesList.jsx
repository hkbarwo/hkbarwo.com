import React from "react";
import { FormattedMessage } from "react-intl";

export default function WebsitesList(props) {
  return (
    <div className={props.className}>
      <h2 className="mb-16 text-primary text-36 font-bold font-serif">{props.title}</h2>
      <h3 className="text-secondary text-20 font-bold">
        <FormattedMessage id="website.list.header" />
      </h3>
      <ul>
        {props.links.map(link => (
          <li
            key={link.url}
            className="flex items-center border-b border-gray-e5 py-12 pr-8"
          >
            <div className="flex-grow pr-20">{link.title}</div>
            <a
              className="flex whitespace-nowrap items-center text-tertiary font-medium"
              href={link.url}
              alt={link.title}
              rel="noreferrer noopener"
              target="_blank"
            >
              <svg
                className="flex-shrink-0 fill-current w-18 mr-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
              >
                <path d="M14.2,17.66H1.5A1.16,1.16,0,0,1,.34,16.51V3.8A1.16,1.16,0,0,1,1.5,2.65H7.27V3.8H1.5V16.5H14.2V10.73h1.15V16.5A1.16,1.16,0,0,1,14.2,17.66ZM9,.34a.57.57,0,0,0-.57.58A.57.57,0,0,0,9,1.5h6.69l-8,8a.58.58,0,0,0,.76.87l.06-.06,8-8V9a.58.58,0,1,0,1.15,0V.34Z"/>
              </svg>
              <FormattedMessage id="website.link" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
