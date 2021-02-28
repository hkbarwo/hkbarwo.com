import React from "react";
import { FormattedDate } from "react-intl";
import { Link } from "gatsby";

export default function ChannelVideoItem({ item }) {
  return (
    <Link
      className="tracking-wide group"
      to={item.localizedPath}
    >
      <div className="relative aspect-w-16 aspect-h-9 w-full bg-gray-e5 overflow-hidden">
        <img
          className="absolute inset-0 object-cover transform group-hover:scale-110 transition-transform duration-300"
          src={item.coverImage}
          alt={item.title}
        />
      </div>
      <div className="mt-20">
        <h2 className="text-20 font-bold leading-tight">{item.title}</h2>
        <div className="mt-10 text-14 flex items-center text-gray-bc leading-none">
          <svg className="w-16 h-16 mr-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M10.44,11.19l-3-3v-5H8.53V7.78l2.66,2.66ZM8,15.44A7.44,7.44,0,1,1,15.44,8,7.44,7.44,0,0,1,8,15.44ZM8,1.62A6.38,6.38,0,1,0,14.38,8,6.38,6.38,0,0,0,8,1.62Z"
              fill="currentColor"
            />
          </svg>
          <FormattedDate value={item.date} />
        </div>
        <p className="mt-10 line-clamp-2">{item.content}</p>
      </div>
    </Link>
  );
}
