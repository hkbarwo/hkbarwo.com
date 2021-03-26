import CMS from "netlify-cms-app";

import swiperStyles from '!css-loader!swiper/swiper-bundle.min.css';

import styles from "!css-loader!postcss-loader!../styles/global.css";

import NewsDetailsArticlePreview from "./NewsDetailsArticlePreview";
import EventsDetailsArticlePreview from "./EventsDetailsArticlePreview";
import ChannelDetailsArticlePreview from "./ChannelDetailsArticlePreview";
import MemberDetailsViewPreview from "./MemberDetailsViewPreview";

CMS.registerPreviewStyle(swiperStyles.toString(), { raw: true });
CMS.registerPreviewStyle(styles.toString(), { raw: true });

CMS.registerPreviewTemplate('news', NewsDetailsArticlePreview);
CMS.registerPreviewTemplate('events', EventsDetailsArticlePreview);
CMS.registerPreviewTemplate('channelItems', ChannelDetailsArticlePreview);
CMS.registerPreviewTemplate('members', MemberDetailsViewPreview);
