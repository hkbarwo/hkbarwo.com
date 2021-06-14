import React, { useRef, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { Swiper, SwiperSlide } from 'swiper/react';
import useResize from "../utils/react-hooks/useResize";

import ChannelVideoItem from "../components/ChannelVideoItem";
import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";

function ChannelSlider({ category }) {
  const container = useRef(null);

  const [controlledSwiper, setControlledSwiper] = useState(null);

  const { width } = useResize(container);

  const [slideIndex, setSlideIndex] = useState(0);

  const slidesPerView = useMemo(() => {
    if (width > 768) {
      return 3;
    }
    if (width > 480) {
      return 2;
    }
    return 1;
  }, [width]);

  const pageIndex = Math.floor((slideIndex + 1) / slidesPerView);

  return (
    <div
      key={category.slug}
      className="my-20 py-20 border-b border-gray-bc"
    >
      <h2 className="mb-20 text-primary text-36 font-bold font-serif">{category.title}</h2>
      <div ref={container}>
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          observer={true}
          onSlideChange={(swiper) => {
            setSlideIndex(swiper.activeIndex);
          }}
          onSwiper={setControlledSwiper}
          style={{ width }}
        >
          {category.items.slice(0, 5).map(item => (
            <SwiperSlide key={item.slug}>
              <ChannelVideoItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <footer className="mt-40 flex justify-end items-center text-14 font-light">
        <button
          className="group"
          onClick={() => {
            controlledSwiper.slideTo(slideIndex - slidesPerView);
          }}
        >
          <svg
            className="w-12 h-12 transform group-hover:-translate-x-2 transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.69 6h-9.3m4.83 4.83L1.39 6l4.84-4.84"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="tracking-widest mx-8">
          {pageIndex + 1}/{6 / slidesPerView}
        </span>
        <button
          className="group"
          onClick={() => {
            controlledSwiper.slideTo(slideIndex + slidesPerView);
          }}
        >
          <svg
            className="w-12 h-12 transform group-hover:translate-x-2 transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M1.39 6h9.3M5.86 1.16L10.69 6l-4.84 4.83"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Link
          className="ml-16 border-b border-current hover:text-primary transition-colors"
          to={category.localizedPath}
        >
          <FormattedMessage id="channel.videos.more" />
        </Link>
      </footer>
    </div>
  )
}

export default function ResourcesChannelPage({ path, pageContext }) {
  const { pageData, categories, locale, menus } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'resources');

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={menuItem.title}
        />
        <PageHeader
          locale={locale}
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === 'channel'}
        />

        <article className="flex-grow max-w-screen-xl w-full mx-auto p-14 sm:px-60 md:px-96 pb-48 md:pb-96">
          <section className="max-w-2xl w-full mx-auto">
            <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
              <span className="bg-current h-1 flex-grow" />
              <span className="mx-20">
                {pageData.title}
              </span>
              <span className="bg-current h-1 flex-grow" />
            </h1>
            <p className="mt-20 whitespace-pre-line leading-8 tracking-wide text-center">{pageData.description}</p>
            <img className="my-64 mx-auto" src={pageData.logo} alt={pageData.title} style={{ width: 212 }} />
          </section>
          <section>
            <header className="text-right">
              <a
                className="inline-flex items-center justify-end"
                href={pageData.youtubeLink}
                alt={<FormattedMessage id="channel.subscribe" />}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-36 h-32 mr-16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29.241 20.56"
                >
                  <path
                    fill="#f00f0d"
                    d="M29.68,7.717a3.674,3.674,0,0,0-2.585-2.6C24.814,4.5,15.67,4.5,15.67,4.5s-9.144,0-11.424.615a3.674,3.674,0,0,0-2.585,2.6A38.543,38.543,0,0,0,1.05,14.8a38.543,38.543,0,0,0,.611,7.084,3.619,3.619,0,0,0,2.585,2.56c2.28.615,11.424.615,11.424.615s9.144,0,11.424-.615a3.619,3.619,0,0,0,2.585-2.56,38.543,38.543,0,0,0,.611-7.084,38.543,38.543,0,0,0-.611-7.084Zm-17,11.432v-8.7L20.322,14.8,12.68,19.148Z"
                    transform="translate(-1.05 -4.5)"
                  />
                </svg>
                <FormattedMessage id="channel.subscribe" />
              </a>
            </header>
            <ul>
              {categories.filter(category => category.items.length).map(category => (
                <li key={category.slug}>
                  <ChannelSlider category={category} />
                </li>
              ))}
            </ul>
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
