import React from "react";

import YouTubePlayer from "../components/YouTubePlayer";

export default function ChannelDetailsArticle(props) {
  return (
    <article className="flex-grow p-14 pb-32">
      <section className="max-w-screen-md mx-auto">
        <h1 className="text-primary text-24 md:text-36 font-serif font-bold tracking-wide">{props.title}</h1>
        {!!props.content && (
          <div
            className="mt-24 text-16 tracking-wide leading-8 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        )}
      </section>
      {!!props.youtubeVideoID && (
        <section className="mt-56 max-w-screen-lg mx-auto">
          <YouTubePlayer id={props.youtubeVideoID} />
        </section>
      )}
    </article>
  );
}
