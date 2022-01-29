import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";

export default function EbookItem(props) {
  return (
    <div>
      <a
        className="block mb-20 bg-gray-e5 aspect-w-4 aspect-h-3"
        href={props.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img className="object-cover" src={props.image} alt={props.title} />
      </a>
      <div className="my-20 tracking-widest text-20 font-600">
        <a href={props.url} target="_blank" rel="noreferrer noopener">{props.title}</a>
      </div>
      <div className="flex items-center">
        <div className="flex-grow pr-20">
          <div className="mb-10 tracking-wide text-14 text-secondary">
            <FormattedMessage id="publication.date" />
          </div>
          <div className="leading-none tracking-wide text-tertiary">
            <FormattedDate value={props.date} />
          </div>
        </div>
      </div>
    </div>
  )
}
