import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from "classnames";

import useResize from "../utils/react-hooks/useResize";
import Link from "../components/Link";
import Page from "../components/Page";
import StrikethroughHeading from "../components/StrikethroughHeading";

function AssociationsDirectory({ ctaTo, data, items }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const container = useRef(null);

  const { width } = useResize(container);

  return (
    <section
      className="text-white"
      style={{
        backgroundImage:
          `linear-gradient(to bottom, #CC153D 0% , #F79D5E 100%)`,
      }}
    >
      <div className="flex-col items-center hidden px-32 pb-48 md:flex pt-36 md:px-60">
        <h1>{data.title}</h1>

        <ul className="grid max-w-screen-xl grid-cols-1 mx-auto mt-56 sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-72">
          {items.map(item => (
            <li key={item.slug}>
              <Link
                className="text-center"
                to={item.localizedPath}
                alt={item.title}
              >
                <div className="flex items-center justify-center mx-auto w-150 h-150">
                  <img
                    src={item.logoWhite}
                    alt={item.title}
                  />
                </div>
                <div className="mt-44">
                  <div>{item.title}</div>
                  {!!item.title2 && <div>{item.title2}</div>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="flex items-center px-24 py-10 mx-auto bg-white bg-opacity-25 border border-white rounded-8 mt-60 group"
          to={ctaTo}
        >
          {data.buttonTitle}
        </Link>
      </div>

      <div
        ref={container}
        className="pt-56 pb-32 text-center md:hidden"
      >
        <div className="relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            observer={true}
            style={{ width }}
            onSlideChange={(swiper) => {
              setSlideIndex(swiper.activeIndex);
            }}
            onSwiper={setControlledSwiper}
          >
            {items.map(item => (
              <SwiperSlide key={item.slug}>
                <div className="text-center px-14">
                  <div className="flex items-center justify-center mx-auto">
                    <img
                      src={item.logoWhite}
                      alt={item.title}
                    />
                  </div>
                  <div className="mt-24">{item.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="absolute z-10 p-16 bg-black border border-white rounded-8 left-10 top-1/2 w-44 h-44 -mt-22 bg-opacity-10 group backdrop-filter backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
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
            className="absolute z-10 p-16 bg-black border border-white rounded-8 right-10 top-1/2 w-44 h-44 -mt-22 bg-opacity-10 group backdrop-filter backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
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
        </div>
        <ul className="flex items-center justify-center mt-24">
          {items.map((item, i) => (
            <li
              key={item.slug}
              className={classNames(
                'w-10 h-10 mx-8 border border-white rounded-full transition-colors',
                { 'bg-white': slideIndex === i },
              )}
            />
          ))}
        </ul>
        <Link
          className="inline-flex items-center px-24 py-10 mx-auto mt-40 bg-white bg-opacity-25 border border-white rounded-8 group"
          to={items[slideIndex].localizedPath}
        >
          {data.buttonTitle}
        </Link>
      </div>
    </section>
  );
}

export default function AboutPage(props) {
  const { pageContext } = props;
  const {
    pageData,
    pages: { associations: associationsPageItem },
    associations: associationItems,
  } = pageContext;
  const {
    excerpt,
    excerpt2,
    sections,
    introduction,
    developmentStrategy,
    developmentStrategyImage,
    associations,
  } = pageData;
  return (
    <Page
      {...props}
      pageTitle={excerpt.title}
      pageDescription={excerpt.content}
      isNoHorizontalPadding={true}
    >
      <section className="w-full max-w-screen-xl mx-auto mt-48 md:flex md:my-60 xl:mt-120">
        <div className="flex-1 pt-0 p-14 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120">
          <h1 className="font-serif font-bold text-primary text-36">{introduction.title}</h1>
          <p className="mt-10 leading-8 tracking-wide whitespace-pre-line">{introduction.content}</p>
        </div>
        <div className="flex-1">
          <img src={introduction.image} alt="" />
        </div>
      </section>
      <AssociationsDirectory
        data={associations}
        items={associationItems}
        ctaTo={associationsPageItem.localizedPath}
      />
      <section className="w-full max-w-2xl max-w-screen-xl mx-auto mt-48 px-14">
        <StrikethroughHeading>{excerpt2.title}</StrikethroughHeading>
        <p className="w-full max-w-screen-sm mx-auto mt-20 leading-8 tracking-wide text-center mb-72">{excerpt2.content}</p>
      </section>
      <section className="w-full max-w-screen-xl mx-auto mt-48 md:flex md:mt-60 xl:mt-120">
        <div
          className="flex-1 pt-0 mt-10 leading-8 tracking-wide p-14 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120"
          dangerouslySetInnerHTML={{ __html: developmentStrategy }}
        />
        <div className="flex-1">
          <img className="mx-auto" src={developmentStrategyImage} alt="" />
        </div>
      </section>
      {sections.map((section, i) => (
        <section
          key={i}
          className={classNames(
            'max-w-screen-xl w-full mx-auto mt-48 md:flex md:mt-60 xl:mt-120',
            {
              'md:flex-row-reverse': i % 2 === 0
            }
          )}
        >
          <div
            className={classNames(
              "flex-1 pt-0 p-14",
              i % 2 === 0
                ? 'md:ml-60 xl:ml-120 md:mr-48 xl:mr-96'
                : 'md:mr-60 xl:mr-120 md:ml-48 xl:ml-96'
            )}
          >
            <h1 className="font-serif font-bold text-primary text-36">{section.title}</h1>
            <p className="mt-10 leading-8 tracking-wide whitespace-pre-line">{section.content}</p>
          </div>
          <div className="flex-1">
            <img src={section.image} alt={section.title} />
          </div>
        </section>
      ))}
    </Page>
  );
}
