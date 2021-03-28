import React from "react";

import classNames from "classnames";

export default function PhotoDetailsView(props) {
  return (
    <div className={classNames(
      "flex items-center justify-center bg-gray-24 bg-opacity-80 text-white min-h-screen p-20",
      props.classNames
    )}>
      <div className="pt-28">
        {!!props.onClose && (
          <header className="flex justify-end pb-16">
            <button
              className="block w-28 h-28"
              onClick={props.onClose}
            >
              <svg className="inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                <path d="M27,1,1,27M1,1,27,27" fill="none" stroke="currentColor"/>
              </svg>
            </button>
          </header>
        )}
        <div>
          <img className="max-w-screen-lg mx-auto w-full" src={props.src} alt={props.title} />
        </div>
        <footer className="text-14 py-20">{props.description}</footer>
      </div>
    </div>
  );
}
