import React from "react";
import { FormattedMessage } from "react-intl";

import Page from "../components/Page";

export default function AboutChroniclePage(props) {
  const { pageData, chronicle } = props.pageContext;
  const { excerpt, pdf } = pageData;
  return (
    <Page
      {...props}
      pageTitle={excerpt.title}
      pageDescription={excerpt.content}
    >
      <section className="w-full max-w-screen-xl mx-auto mt-48 tracking-wide leading-8">
        <header className="text-right">
          <a
            className="inline-flex items-center rounded-full text-white bg-secondary px-16 py-12"
            href={pdf}
            rel="noopener noreferrer"
            target="blank"
          >
            <svg className="w-24 h-24 mr-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M3,15.37H21v1.48H3ZM21.63,8.8a1.45,1.45,0,0,0-1.43-1H18.41a2.21,2.21,0,0,1-.1,1.5h1.91c.78,2.22,2.07,5.78,2.28,6.4v5.68H1.5V15.67c.21-.62,2.29-6.4,2.29-6.4h1.9a2.21,2.21,0,0,1-.11-1.5H3.8a1.41,1.41,0,0,0-1.42,1C0,15.31,0,15.39,0,15.57v5.78a1.5,1.5,0,0,0,1.49,1.51h21a1.5,1.5,0,0,0,1.5-1.5h0V15.57C24,15.39,24,15.31,21.63,8.8ZM12,13.56l4.72-4.7a.74.74,0,0,0,.19-1,.75.75,0,0,0-1-.18.73.73,0,0,0-.18.17l-3,2.9V1.85a.73.73,0,0,0-.76-.71.74.74,0,0,0-.72.71v8.87l-3-2.92a.74.74,0,1,0-1,1h0Z"
                fill="currentColor"
              />
            </svg>
            <FormattedMessage id="download.pdf" />
          </a>
        </header>
        <ul>
          {chronicle.map(yearGroup => (
            <li key={yearGroup.range}>
              <h1 className="mt-40 text-primary text-36 font-bold font-serif">{yearGroup.range}</h1>
              <ul>
                {yearGroup.items.map(item => (
                  <li
                    key={item.slug}
                    className="md:flex py-20 border-b border-gray-e5"
                  >
                    <div className="flex-grow">
                      <div className="text-14" style={{ color: item.category.color }}>{item.category.title}</div>
                      <div>{item.title}</div>
                    </div>
                    {!!item.image && (
                      <div className="flex-shrink-0 max-w-sm w-full mt-16 md:mt-0 md:ml-24">
                        <img src={item.image} alt={item.title} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
