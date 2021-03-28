import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import BlueButton from "./BlueButton";

export default function PublicationItem(props) {
  return (
    <div>
      <div className="bg-gray-e5 mb-20 aspect-w-4 aspect-h-3">
        <img className="object-cover" src={props.image} alt={props.title} />
      </div>
      <div className="mb-20 text-20 font-600">{props.title}</div>
      <div className="flex items-center">
        <div className="flex-grow pr-20">
          <div className="text-14 text-secondary mb-10">
            <FormattedMessage id="publication.date" />
          </div>
          <div className="text-tertiary leading-none">
            <FormattedDate value={props.date} />
          </div>
        </div>
        <BlueButton
          className="flex-shrink-0"
          href={props.pdf}
          prepend={(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M3,15.37H21v1.48H3ZM21.63,8.8a1.45,1.45,0,0,0-1.43-1H18.41a2.21,2.21,0,0,1-.1,1.5h1.91c.78,2.22,2.07,5.78,2.28,6.4v5.68H1.5V15.67c.21-.62,2.29-6.4,2.29-6.4h1.9a2.21,2.21,0,0,1-.11-1.5H3.8a1.41,1.41,0,0,0-1.42,1C0,15.31,0,15.39,0,15.57v5.78a1.5,1.5,0,0,0,1.49,1.51h21a1.5,1.5,0,0,0,1.5-1.5h0V15.57C24,15.39,24,15.31,21.63,8.8ZM12,13.56l4.72-4.7a.74.74,0,0,0,.19-1,.75.75,0,0,0-1-.18.73.73,0,0,0-.18.17l-3,2.9V1.85a.73.73,0,0,0-.76-.71.74.74,0,0,0-.72.71v8.87l-3-2.92a.74.74,0,1,0-1,1h0Z"
                fill="currentColor"
              />
            </svg>
          )}
        >
          <FormattedMessage id="download.pdf" />
        </BlueButton>
      </div>
    </div>
  )
}
