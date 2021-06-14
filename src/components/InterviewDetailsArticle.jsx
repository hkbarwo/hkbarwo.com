import classNames from "classnames";
import React from "react";

import MarkdownContent from "./MarkdownContent";

export default function InterviewDetailsArticle(props) {
  return (
    <div className={classNames('interview-content lg:flex max-w-screen-lg mx-auto w-full', props.className)}>
      <div className="lg:max-w-480 w-full lg:mr-120">
        <h1 className="text-36 text-primary font-bold font-serif mb-8">{props.title}</h1>
        <MarkdownContent
          className="leading-8 tracking-wide"
          content={props.content}
        />
      </div>
      <div className="mt-48 lg:mt-0">
        <h1 className="text-24 text-primary font-bold font-serif mb-24">{props.photosTitle}</h1>
        <ul>
          {props.photos.map(({ image, caption }, index) => (
            <li
              key={index}
              className={classNames({ 'mt-24': index !== 0 })}
            >
              <img
                src={image}
                alt={caption}
              />
              {!!caption && (
                <p
                  className="mt-16 leading-8 tracking-wide"
                >{caption}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
