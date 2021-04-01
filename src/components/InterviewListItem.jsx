import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import classNames from "classnames";

import BlueButton from "./BlueButton";

export default function InterviewListItem(props) {
  return (
    <div className={classNames('grid md:grid-cols-2 gap-x-96', props.className)}>
      <div>
        <img
          className="block w-full object-cover"
          src={props.coverImage}
          alt={props.title}
        />
      </div>
      <div className="mt-20 md:mt-0">
        <header className="flex items-center justify-between">
          <div
            className="rounded-full text-white px-20 py-4"
            style={{ backgroundColor: props.category.color }}
          >
            {props.category.title}
          </div>
          <div className="flex items-center text-gray-bc">
            <svg
              className="w-16 h-16 mr-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.44,11.19l-3-3v-5H8.53V7.78l2.66,2.66ZM8,15.44A7.44,7.44,0,1,1,15.44,8,7.44,7.44,0,0,1,8,15.44ZM8,1.62A6.38,6.38,0,1,0,14.38,8,6.38,6.38,0,0,0,8,1.62Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-14">
              <FormattedDate value={props.date} />
            </span>
          </div>
        </header>
        <h2 className="mt-20 text-20 font-bold">{props.title}</h2>
        {!!props.description && (
          <div className="mt-12">{props.description}</div>
        )}
        <footer className="mt-20">
          <BlueButton className="px-32" to={props.localizedPath}>
            <FormattedMessage id="know.more" />
          </BlueButton>
        </footer>
      </div>
    </div>
  );
}
