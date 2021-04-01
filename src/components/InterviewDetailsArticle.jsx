import classNames from "classnames";
import React from "react";
import ImageSlideshow from "./ImageSlideshow";
import MarkdownContent from "./MarkdownContent";

function LeftImageWithTextSection(props) {
  return (
    <section className="md:flex">
      <div className="flex-1">
        <img className="block w-full" src={props.image} alt="" />
      </div>
      <div className="flex-1 mt-20 md:mt-0 md:pl-64">
        <div className="md:max-w-md">
          <MarkdownContent
            className="text-14"
            content={props.content}
          />
        </div>
      </div>
    </section>
  );
}

function ImagesContent(props) {
  const { layout } = props;
  const images = props.images || [];
  if (!images.length) {
    return null;
  }

  if (layout === 'slideshow') {
    return (
      <ImageSlideshow 
        className="mb-40"
        images={images}
      />
    );
  }

  return (
    <ul className="grid md:grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 mb-40">
      {images.map((image, i) => (
        <li key={i}>
          <img className="block h-full w-full object-cover" src={image} alt="" />
        </li>
      ))}
    </ul>
  );
}

function InterviewDetailsArticleSection(props) {
  const { images = [], layout, content } = props;
  switch (layout) {
    case 'left':
      return (
        <LeftImageWithTextSection
          image={images[0]}
          content={content}
        />
      );
  
    default:
      break;
  }
  return (
    <section>
      <ImagesContent layout={layout} images={images} />
      <MarkdownContent
        className="w-full max-w-screen-md mx-auto"
        content={content}
      />
    </section>
  );
}

export default function InterviewDetailsArticle(props) {
  return (
    <div className={classNames('interview-content', props.className)}>
      <header className="mb-40 w-full max-w-screen-md mx-auto">
        <h1 className="text-36 text-primary font-bold font-serif mb-20">{props.title}</h1>
      </header>
      {props.sections.map((section, i) => (
        <InterviewDetailsArticleSection key={i} {...section} />
      ))}
    </div>
  );
}
