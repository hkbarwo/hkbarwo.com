import CMS from "netlify-cms-app"

import NewsDetailsArticlePreview from "./NewsDetailsArticlePreview";
import EventsDetailsArticlePreview from "./EventsDetailsArticlePreview";

CMS.registerPreviewTemplate('news', NewsDetailsArticlePreview);
CMS.registerPreviewTemplate('events', EventsDetailsArticlePreview);
