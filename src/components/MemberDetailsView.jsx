import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

export default function MemberDetailsView(props) {
  return (
    <div
      className={classNames('md:flex items-start', props.className)}
      style={props.style}
    >
      <div className="p-20 sm:p-40">
        <img
          src={props.photo}
          alt={props.title}
          style={{ width: 190 }}
        />
      </div>
      <div className="grid grid-cols-2 flex-grow p-20 sm:p-40 gap-x-10 gap-y-32">
        <div className="col-span-1">
          <h3 className="text-secondary text-14 font-bold">
            <FormattedMessage id="member.directory.name" />
          </h3>
          <div>{props.title}</div>
        </div>
        <div className="col-span-1">
          <h3 className="text-secondary text-14 font-bold">
            <FormattedMessage id="member.directory.gender" />
          </h3>
          <div>
            <FormattedMessage
              id={props.gender === 'm'
                ? 'member.directory.gender.male'
                : 'member.directory.gender.female'
              }
            />
          </div>
        </div>
        {props.alias && (
          <div className="col-span-1">
            <h3 className="text-secondary text-14 font-bold">
              <FormattedMessage id="member.directory.alias" />
            </h3>
            <div>{props.alias}</div>
          </div>
        )}
        <div className="col-span-1">
          <h3 className="text-secondary text-14 font-bold">
            <FormattedMessage id="member.directory.role" />
          </h3>
          <div>{props.role}</div>
        </div>
        <div className="col-span-full">
          <h3 className="text-secondary text-14 font-bold">
            <FormattedMessage id="member.directory.position" />
          </h3>
          <div>{props.position}</div>
        </div>
        {props.description && (
          <div className="col-span-full">
            <h3 className="text-secondary text-14 font-bold">
              <FormattedMessage id="member.directory.description" />
            </h3>
            <div>{props.description}</div>
          </div>
        )}
        {props.thoughts && (
          <div className="col-span-full">
            <h3 className="text-secondary text-14 font-bold">
              <FormattedMessage id="member.directory.thoughts" />
            </h3>
            <div>{props.thoughts}</div>
          </div>
        )}
      </div>
      {!!props.onClose && (
        <button
          className="absolute top-20 right-20 sm:top-36 sm:right-36 block w-28 h-28"
          onClick={props.onClose}
        >
          <svg className="inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
            <path d="M27,1,1,27M1,1,27,27" fill="none" stroke="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  )
}
