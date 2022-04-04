import React, { useMemo, useRef, useState } from "react";
import Modal from 'react-modal';
import { FormattedDate, FormattedMessage } from "react-intl";
import SwiperCore, { Autoplay, Mousewheel, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from "classnames";

import useResize from "../utils/react-hooks/useResize";

import ClientOnly from "../components/ClientOnly";
import IntlProvider from "../components/IntlProvider";
import Link from "../components/Link";
import { PageMeta } from "../components/Page";
import PageNav from "../components/PageNav";
import PageFooter from "../components/PageFooter";
import SiteLogo from "../components/SiteLogo";
import { HomePageSlide } from "../components/HomePageSlide";

SwiperCore.use([Autoplay, Mousewheel, EffectFade]);

function extendArray(array, i) {
  return i > 1 ? [...array, ...extendArray(array, i - 1)] : array
}

function FullScreenSlide({ slide, pages, i, total, onClose, onNext, onPrev }) {
  return (
    <div
      className="relative flex flex-grow"
      href={`#${slide.slug}`}
      style={{
        backgroundImage:
          `linear-gradient(to bottom, ${slide.gradient.color1} 0% , ${slide.gradient.color2} 100%)`,
      }}
    >
      <div className="relative flex-1 hidden overflow-hidden lg:block">
        <img
          className={classNames('w-full h-full', slide.bgImageFillStyle === 'contain' ? 'object-contain' : 'object-cover')}
          src={`${slide.bgImage}`}
          alt={slide.title}
        />
      </div>
      <div className="flex-1 text-white">
        <div className="w-full p-10 sm:p-32 md:p-64">
          <div className="flex items-center justify-between">
            <div className="flex-grow hidden mr-24 tracking-wide lg:block text-18">{slide.shortTitle}</div>
            <div className="flex items-center mr-24">
              <button
                className="w-20 h-20"
                onClick={onPrev}
              >
                <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M18.45,10.13H1.76m8.59-8.8L1.68,10l8.68,8.67" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </button>
              <span className="mx-8 font-light leading-none tracking-widest text-22">{`${i < 9 ? '0' : ''}${i + 1}/${total < 9 ? '0' : ''}${total + 1}`}</span>
              <button
                className="w-20 h-20"
                onClick={onNext}
              >
                <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M1.68,9.88H18.37M9.78,18.67,18.45,10,9.77,1.33" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </button>
            </div>
            <button className="relative block w-16 h-16 md:w-28 md:h-28" onClick={onClose}>
              <svg className="absolute inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                <path d="M27,1,1,27M1,1,27,27" fill="none" stroke="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:mr-48">
            <div className="mt-32 tracking-wide text-center md:hidden text-18">{slide.shortTitle}</div>
            <h1 className="mt-16 font-serif font-bold tracking-widest text-center md:mt-40 text-36 md:text-left">{slide.title}</h1>
            <h2 className="mt-4 font-serif font-light tracking-widest text-center text-28 md:text-left">{slide.subtitle}</h2>
            <p className="leading-8 tracking-wide whitespace-pre-wrap mt-44 text-14">{slide.description}</p>
            
            {!!slide.buttonLink && (
              slide.buttonLink.page ? (
                <Link
                  className="flex items-center px-24 py-10 mx-auto my-32 bg-white bg-opacity-25 border border-white rounded-8 md:mt-60 group"
                  to={pages[slide.buttonLink.page].localizedPath}
                  alt={slide.buttonTitle}
                >
                  {slide.buttonTitle}
                  <svg
                    className="w-12 h-12 ml-12 transition-transform transform group-hover:translate-x-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M1.39 6h9.3M5.86 1.16L10.69 6l-4.84 4.83"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              ) : (
                <a
                  className="flex items-center px-24 py-10 mx-auto my-32 bg-white bg-opacity-25 border border-white rounded-8 md:mt-60 group"
                  href={slide.buttonLink.url}
                  alt={slide.buttonTitle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {slide.buttonTitle}
                  <svg
                    className="w-12 h-12 ml-12 transition-transform transform group-hover:translate-x-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M1.39 6h9.3M5.86 1.16L10.69 6l-4.84 4.83"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsSection({ pageContext, className }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <h2 className="p-8 px-16 text-white rounded-8 bg-secondary mx-28">
        <FormattedMessage id="home.news.title" />
      </h2>

      <div className="relative w-full mt-16">
        <ClientOnly>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            observer={true}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            watchSlidesProgress={true}
            watchSlidesVisibility={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            onSlideChange={(swiper) => {
              setSlideIndex(swiper.realIndex);
            }}
            onSwiper={setControlledSwiper}
          >
            {pageContext.news.map(news => (
              <SwiperSlide key={news.slug}>
                {({ isNext, isPrev }) => (
                  <div
                    className={classNames(
                      'py-16 px-28',
                      'transform',
                      'transition',
                      'duration-300',
                      'ease-out',
                      {
                        'translate-x-1/4': isNext,
                        '-translate-x-1/4': isPrev,
                      }
                    )}
                  >
                    <h3>{news.title}</h3>
                    <footer className="flex items-center justify-between mt-16 text-14">
                      <div className="flex items-center">
                        <svg className="w-16 h-16 mr-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path
                            d="M10.44,11.19l-3-3v-5H8.53V7.78l2.66,2.66ZM8,15.44A7.44,7.44,0,1,1,15.44,8,7.44,7.44,0,0,1,8,15.44ZM8,1.62A6.38,6.38,0,1,0,14.38,8,6.38,6.38,0,0,0,8,1.62Z"
                            fill="currentColor"
                          />
                        </svg>
                        <FormattedDate value={news.date} />
                      </div>
                      <Link
                        className="flex items-center px-12 py-4 font-light border border-current rounded-8 group"
                        to={`/${pageContext.locale}/news/${news.slug}`}
                      >
                        <FormattedMessage id="know.more" />
                        <svg
                          className="w-12 h-12 ml-8 transition-transform transform group-hover:translate-x-4"
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
                      </Link>
                    </footer>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientOnly>
      </div>

      <footer className="flex items-center justify-between w-full p-32 pt-0 text-14">
        <Link
          className="pb-2 border-b border-current group"
          to={`/${pageContext.locale}/news`}
        >
          <div className="transition-transform transform group-hover:-translate-y-2">
            <FormattedMessage id="home.news.more" />
          </div>
        </Link>
        <div className="flex items-center">
          <button
            className="group"
            onClick={() => {
              controlledSwiper.slidePrev();
            }}
          >
            <svg
              className="w-12 h-12 transition-transform transform group-hover:-translate-x-2"
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
          <span className="mx-8 tracking-widest">{slideIndex + 1}/{pageContext.news.length}</span>
          <button
            className="group"
            onClick={() => {
              controlledSwiper.slideNext();
            }}
          >
            <svg
              className="w-12 h-12 transition-transform transform group-hover:translate-x-2"
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
        </div>
      </footer>
    </div>
  )
}

function SouvenirSection({ pageContext, className }) {
  return (
    <div className={classNames('py-24 flex flex-col items-start', className)}>
      <Link
        className="flex items-center p-8 px-16 font-serif border-2 rounded-lg text-primary border-primary mx-28 group"
        to={`/${pageContext.locale}/support/souvenirs`}
      >
        <FormattedMessage id="home.souvenir.title" />
        <svg
          className="w-12 h-12 ml-12 transition-transform transform group-hover:translate-x-2"
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
      </Link>
    </div>
  )
}

export default function HomePageTemplate({ pageContext, path }) {
  const slideCount = pageContext.slides.length;
  const maxSlideIndex = slideCount - 1;

  const sliderSection = useRef(null);
  const { width: sliderWidth } = useResize(sliderSection);
  const [slideIndex, setSlideIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const [detailsIndex, setDetailsIndex] = useState(0);
  const [isShowDetail, setIsShowDetail] = useState(false);

  // HACK: To fix loop animation
  const extendMultiplier = 20
  const slides = useMemo(() => extendArray(pageContext.slides, extendMultiplier), [pageContext.slides])
  const slidesCount = useMemo(() => pageContext.slides.length, [pageContext.slides])
  const initialSlide = pageContext.slides.length * extendMultiplier / 2

  function setRealSlideIndex(index) {
    const realIndex = index % pageContext.slides.length
    setSlideIndex(realIndex)
  }

  function onClickSlide(e, index) {
    e.preventDefault();
    setDetailsIndex(index);
    setIsShowDetail(true);
  }

  return (
    <IntlProvider language={pageContext.locale}>
      <main className="h-screen font-sans">
        <PageMeta
          title={pageContext.pageItem.title}
          description={pageContext.pageItem.description}
        />
        <PageNav {...{ path, pageContext }} isHideMenuButton={isShowDetail} />
        <header className="p-20 py-10 bg-white md:hidden">
          <SiteLogo
            className="mx-auto" style={{ maxHeight: 100 }}
            locale={pageContext.locale}
          />
        </header>
        <div className="fixed inset-0 items-stretch hidden md:flex">
          <section
            className="flex flex-col flex-shrink-0 h-full bg-gray-f4 bg-pattern-white"
            style={{ width: 346 }}
          >
            <header className="p-28">
              <SiteLogo className="mx-auto" locale={pageContext.locale} style={{ maxWidth: 200 }} />
            </header>
            <NewsSection
              className="flex-grow mt-60"
              pageContext={pageContext}
            />
            <SouvenirSection pageContext={pageContext} />
          </section>
          <section ref={sliderSection} className="relative flex-grow overflow-hidden">
            <ClientOnly>
              <Swiper
                className="h-full"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                }}
                mousewheel={true}
                breakpoints={{
                  1024: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}
                initialSlide={initialSlide}
                loop={true}
                observer={true}
                watchSlidesProgress={true}
                watchSlidesVisibility={true}
                onSlideChange={(swiper) => {
                  setRealSlideIndex(swiper.realIndex);
                }}
                onSwiper={(swiper) => {
                  setControlledSwiper(swiper);
                  setRealSlideIndex(swiper.realIndex);
                }}
                style={{ width: sliderWidth }}
              >
                {slides.map((slide, i) => (
                  <SwiperSlide
                    key={i}
                    className="text-white group"
                  >
                    {((params) => (
                      <HomePageSlide
                        slide={slide}
                        i={i}
                        initialSlide={initialSlide}
                        num={i % slidesCount}
                        {...params}
                        onClickSlide={onClickSlide}
                      />
                    ))}
                  </SwiperSlide>
                ))}
              </Swiper>
            </ClientOnly>

            <button
              className="absolute z-10 p-16 bg-black rounded-full left-20 top-1/2 w-44 h-44 -mt-22 bg-opacity-10 group backdrop-filter backdrop-blur-md"
              onClick={() => {
                controlledSwiper.slidePrev();
              }}
            >
              <svg
                className="w-12 h-12 transition-transform transform group-hover:-translate-x-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
              >
                <path
                  d="M10.69 6h-9.3m4.83 4.83L1.39 6l4.84-4.84"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="absolute z-10 p-16 bg-black rounded-full right-20 top-1/2 w-44 h-44 -mt-22 bg-opacity-10 group backdrop-filter backdrop-blur-md"
              onClick={() => {
                controlledSwiper.slideNext();
              }}
            >
              <svg
                className="w-12 h-12 transition-transform transform group-hover:translate-x-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
              >
                <path
                  d="M1.39 6h9.3M5.86 1.16L10.69 6l-4.84 4.83"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </section>
          <section className="relative w-60 bg-primary">
            <ul className="absolute inset-x-24 bottom-24">
              {pageContext.slides.map((slide, i) => (
                <li
                  key={slide.slug}
                  className={classNames(
                    'w-10 h-10 my-4 border border-white rounded-full transition-colors',
                    {
                      'bg-white': i === slideIndex,
                    },
                  )}
                />
              ))}
            </ul>
          </section>
        </div>

        <ul className="md:hidden">
          {pageContext.slides.map((slide, i) => (
            <li
              key={slide.slug}
              className="text-white"
            >
              <a href={`#${slide.slug}`} onClick={(e) => onClickSlide(e, i)}>
                <div
                  className="relative bg-center bg-cover aspect-w-1 aspect-h-1 sm:aspect-w-16 sm:aspect-h-9"
                  style={{
                    backgroundImage: `url(${slide.bgImage})`,
                  }}
                />
                <div
                  className="flex p-20"
                  style={{
                    backgroundImage:
                      `linear-gradient(to bottom, ${slide.gradient.color1} 0% , ${slide.gradient.color2} 100%)`,
                  }}
                >
                  <div className="flex-grow">
                    <div className="text-18">
                      <span className="font-light tracking-widest">{`${i < 9 ? '0' : ''}${i + 1}`}</span>
                      <span className="ml-10 tracking-wide">{slide.shortTitle}</span>
                    </div>
                    <h1 className="mt-4 font-serif font-bold tracking-widest text-36">{slide.title}</h1>
                    <h2 className="font-serif font-light tracking-widest text-28">{slide.subtitle}</h2>
                  </div>
                  <svg
                    className="w-32"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28.6 28.6"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M14,28.25,27.89,14.31,13.94.35" />
                      <path d="M.94,14.3H27.76" />
                    </g>
                  </svg>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <Modal
          isOpen={isShowDetail}
          closeTimeoutMS={200}
          style={{
            overlay: {
              zIndex: 50,
            },
            content: {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              padding: 0,
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              height: '100%',
            },
          }}
        >
          <FullScreenSlide
            pages={pageContext.pages}
            slide={pageContext.slides[detailsIndex]}
            i={detailsIndex}
            total={maxSlideIndex}
            onClose={() => setIsShowDetail(false)}
            onPrev={() => {
              if (detailsIndex > 0) {
                setDetailsIndex(detailsIndex - 1);
              }
            }}
            onNext={() => {
              if (detailsIndex < maxSlideIndex) {
                setDetailsIndex(detailsIndex + 1);
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 items-center justify-center hidden w-60 md:flex">
            <ul>
              {pageContext.slides.map((slide, i) => (
                <li
                  key={slide.slug}
                  className={classNames(
                    'w-10 h-10 my-8 border border-white rounded-full transition-colors',
                    {
                      'bg-white': i === detailsIndex,
                    },
                  )}
                />
              ))}
            </ul>
          </div>
        </Modal>
        <PageFooter className="md:hidden" {...{ pageContext }} />
      </main>
    </IntlProvider>
  );
}
