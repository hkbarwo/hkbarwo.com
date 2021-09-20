import React from "react";

import Page from "../components/Page";

export default function MemberEventsPage(props) {
  return (
    <Page {...props}>
      <section className="mt-96 px-14 md:px-48 lg:px-96">
        <ul className="grid grid-cols-1 gap-48 md:grid-cols-2 lg:grid-cols-3">
          {props.pageContext.pageData.events.map(event => (
            <li key={event.slug} className="p-32 shadow-outline rounded-xl">
              <h2 className="font-bold text-20">{event.title}</h2>
              {event.metadata.map(data => (
                <div key={data.label} className="mt-12">
                  <div className="font-bold text-secondary text-14">{data.label}</div>
                  <div className="markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
              ))}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
