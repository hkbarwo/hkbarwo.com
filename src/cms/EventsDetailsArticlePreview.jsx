import React from "react";
import { Remarkable } from "remarkable";

import EventsDetailsArticle from "../components/EventsDetailsArticle";
import IntlProvider from "../components/IntlProvider";

export default function EventsDetailsArticlePreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const content = new Remarkable().render(entry.getIn(["data", "content"]));
  const coverImage = entry.getIn(["data", "coverImage"]);
  const metadataEntry = entry.getIn(["data", "metadata"]);
  const metadata = metadataEntry ? metadataEntry.toJSON() : [];
  const tel = entry.getIn(["data", "tel"]);
  const email = entry.getIn(["data", "email"]);
  const location = entry.getIn(["data", "location"]);
  const photosEntry = entry.getIn(["data", "photos"]);
  const photos = photosEntry ? photosEntry.toJSON() : [];
  const youtubeVideoID = entry.getIn(["data", "youtubeVideoID"]);
  return (
    <IntlProvider language="zh">
      <EventsDetailsArticle
        title={title}
        content={content}
        coverImage={coverImage}
        metadata={metadata}
        tel={tel}
        email={email}
        location={location}
        youtubeVideoID={youtubeVideoID}
        photos={photos}
      />
    </IntlProvider>
  );
}
