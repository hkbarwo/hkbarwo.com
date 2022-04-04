import React from "react";

import InterviewDetailsArticle from "../components/InterviewDetailsArticle";
import Page from "../components/Page";
import { PinkButton } from "../components/PinkButton";

export default function InterviewCategoryPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { interviewCategory, interviewCategories } = pageData;
  return (
    <Page
      {...props}
      prepend={(
        <ul className="flex flex-wrap items-center justify-center my-16">
          {interviewCategories.map(category => (
            <li key={category.slug} className="m-10">
              <PinkButton
                isActive={category.slug === interviewCategory.slug}
                to={category.localizedPath}
              >
                {category.title}
              </PinkButton>
            </li>
          ))}
        </ul>
      )}
    >
      <InterviewDetailsArticle
        className="mt-64"
        title={interviewCategory.articleTitle}
        content={interviewCategory.articleContent}
        photosTitle={interviewCategory.articlePhotosTitle}
        photos={interviewCategory.articlePhotos}
      />
    </Page>
  );
}
