import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { navigate } from '@reach/router';
import classNames from "classnames";

export function SearchBox({ className, locale, onSearch }) {
  const [query, setQuery] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    navigate(`/${locale}/search?q=${encodeURIComponent(query)}`)
    if (onSearch) onSearch();
  }
  const isEmpty = !!(!query || query.length === 0);
  return (
    <form
      className={classNames("px-8 py-4 w-full mx-auto border border-1 rounded-8 border-gray-24 leading-8 tracking-wide", className)}
      noValidate
      role="search"
      onSubmit={onSubmit}
      style={{ maxWidth: 360 }}
    >
      <div className="relative flex items-center">
        {isEmpty && (
          <svg
            className="absolute fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 15.68"
            width="16"
          >
            <path d="M6.82,0a6.82,6.82,0,1,0,6.81,6.83h0A6.81,6.81,0,0,0,6.82,0Zm0,12.45A5.69,5.69,0,1,1,12.5,6.76v.06A5.68,5.68,0,0,1,6.82,12.45Zm9,2.21-3.1-3.1a8.73,8.73,0,0,1-.84.88L15,15.53a.6.6,0,0,0,.85,0,.61.61,0,0,0,0-.8Z"/>
          </svg>
        )}
        {isEmpty && (
          <div
            className="absolute left-0 right-0 text-center pointer-events-none text-14"
            style={{ color: "#958045" }}
          >
            <FormattedMessage id="search.box.placeholder" />
          </div>
        )}
        <input
          className="w-full text-center bg-transparent"
          type="search"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
        />
      </div>
    </form>
  );
}
