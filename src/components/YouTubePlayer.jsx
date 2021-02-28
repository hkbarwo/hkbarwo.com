import React from "react";

export default function YouTubePlayer({ id, title, ...props }) {
  return (
    <div {...props}>
      <div className="relative aspect-w-16 aspect-h-9 w-full">
        <iframe
          className="absolute inset-0"
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${id}?controls=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
