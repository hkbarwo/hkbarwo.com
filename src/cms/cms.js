import CMS from "netlify-cms-app";

import swiperStyles from '!css-loader!swiper/swiper-bundle.min.css';

import styles from "!css-loader!postcss-loader!../styles/global.css";

import NewsDetailsArticlePreview from "./NewsDetailsArticlePreview";
import EventsDetailsArticlePreview from "./EventsDetailsArticlePreview";
import ChannelDetailsArticlePreview from "./ChannelDetailsArticlePreview";
import InterviewDetailsArticlePreview from "./InterviewDetailsArticlePreview";
import MemberDetailsViewPreview from "./MemberDetailsViewPreview";
import WebsitesPreview from "./WebsitesPreview";
import TheatersPreview from "./TheatersPreview";
import MarkdownPagePreview from "./MarkdownPagePreview";
import PhotoDetailsViewPreview from "./PhotoDetailsViewPreview";
import PublicationItemPreview from "./PublicationItemPreview";
import SouvenirsSectionPreview from "./SouvenirsSectionPreview";
import CreditsSectionPreview from "./CreditsSectionPreview";

CMS.registerPreviewStyle(swiperStyles.toString(), { raw: true });
CMS.registerPreviewStyle(styles.toString(), { raw: true });

CMS.registerPreviewTemplate('news', NewsDetailsArticlePreview);
CMS.registerPreviewTemplate('events', EventsDetailsArticlePreview);
CMS.registerPreviewTemplate('channelItems', ChannelDetailsArticlePreview);
CMS.registerPreviewTemplate('members', MemberDetailsViewPreview);
CMS.registerPreviewTemplate('websites', WebsitesPreview);
CMS.registerPreviewTemplate('theaters', TheatersPreview);
CMS.registerPreviewTemplate('tnc', MarkdownPagePreview);
CMS.registerPreviewTemplate('privacy', MarkdownPagePreview);
CMS.registerPreviewTemplate('photoGallaryItems', PhotoDetailsViewPreview);
CMS.registerPreviewTemplate('publicationsItems', PublicationItemPreview);
CMS.registerPreviewTemplate('interviewItems', InterviewDetailsArticlePreview);
CMS.registerPreviewTemplate('souvenirs', SouvenirsSectionPreview);
CMS.registerPreviewTemplate('credits', CreditsSectionPreview);
