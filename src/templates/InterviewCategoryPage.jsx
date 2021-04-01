import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import InterviewListItem from "../components/InterviewListItem";
import Page from "../components/Page";

export default function InterviewCategoryPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { interviewCategory, interviewCategories, interviews } = pageData;
  return (
    <Page
      {...props}
      prepend={(
        <ul className="flex flex-wrap items-center justify-center my-16">
          {interviewCategories.map(category => (
            <li key={category.slug} className="m-10">
              <Link
                className={classNames(
                  'block min-w-144 text-center rounded-full border border-tertiary px-14 py-8 hover:bg-tertiary transition-colors duration-200',
                  category.slug === interviewCategory.slug ? 'bg-tertiary text-white hover:bg-opacity-50' : 'text-tertiary hover:bg-opacity-20'
                )}
                to={category.localizedPath}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      isEmpty={!interviews || !interviews.length}
    >
      {!!(interviews && interviews.length) && (
        <ul className="w-full max-w-screen-lg mx-auto">
          {interviews.map(interview => (
            <li
              key={interview.slug}
              className="mt-40"
            >
              <InterviewListItem {...interview} />
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
