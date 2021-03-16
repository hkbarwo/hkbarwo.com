import CMS from "netlify-cms-app"

import NewsDetailsArticlePreview from "./NewsDetailsArticlePreview";
import EventsDetailsArticlePreview from "./EventsDetailsArticlePreview";
import ChannelDetailsArticlePreview from "./ChannelDetailsArticlePreview";

CMS.registerPreviewTemplate('news', NewsDetailsArticlePreview);
CMS.registerPreviewTemplate('events', EventsDetailsArticlePreview);
CMS.registerPreviewTemplate('channelItems', ChannelDetailsArticlePreview);
