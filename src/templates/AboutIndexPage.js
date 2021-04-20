import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from "classnames";

import useResize from "../utils/react-hooks/useResize";
import Page from "../components/Page";

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
      <div className="hidden md:flex flex-col items-center pt-36 pb-48 px-32 md:px-60">
        <h1>{data.title}</h1>

        <ul className="mt-56 max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-72">
          {items.map(item => (
            <li key={item.slug}>
              <Link
                className="text-center"
                to={item.localizedPath}
                alt={item.title}
              >
                <div className="flex justify-center items-center w-150 h-150 mx-auto">
                  <img
                    src={item.logoWhite}
                    alt={item.title}
                  />
                </div>
                <div className="mt-44">{item.title}</div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="mt-60 mx-auto flex items-center py-10 px-24 rounded-full border border-white bg-white bg-opacity-25 group"
          to={ctaTo}
        >
          {data.buttonTitle}
        </Link>
      </div>

      <div
        ref={container}
        className="md:hidden pt-56 pb-32 text-center"
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
                  <div className="flex justify-center items-center mx-auto">
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
            className="absolute z-10 left-10 top-1/2 w-44 h-44 -mt-22 p-16 border border-white bg-black bg-opacity-10 rounded-full group backdrop-filter backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
              controlledSwiper.slidePrev();
            }}
          >
            <svg
              className="w-12 h-12 transform group-hover:-translate-x-4 transition-transform"
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
            className="absolute z-10 right-10 top-1/2 w-44 h-44 -mt-22 p-16 border border-white bg-black bg-opacity-10 rounded-full group backdrop-filter backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
              controlledSwiper.slideNext();
            }}
          >
            <svg
              className="w-12 h-12 transform group-hover:translate-x-4 transition-transform"
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
        <ul className="mt-24 flex justify-center items-center">
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
          className="mt-40 mx-auto inline-flex items-center py-10 px-24 rounded-full border border-white bg-white bg-opacity-25 group"
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
    menus,
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
      <section className="max-w-screen-xl w-full mx-auto mt-48 md:flex md:my-60 xl:mt-120">
        <div className="flex-1 pt-0 p-14 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120">
          <h1 className="text-primary text-36 font-serif font-bold">{introduction.title}</h1>
          <p className="mt-10 whitespace-pre-line leading-8">{introduction.content}</p>
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
      <section className="max-w-screen-xl w-full mx-auto mt-48 px-14 max-w-2xl w-full mx-auto">
        <h1 className="flex items-center justify-center max-w-sm mx-auto text-primary text-24 text-center font-bold font-serif">
          <span className="bg-current h-1 flex-grow" />
          <span className="mx-20">
            {excerpt2.title}
          </span>
          <span className="bg-current h-1 flex-grow" />
        </h1>
        <p className="mt-20 whitespace-pre-line leading-8">{excerpt2.content}</p>
      </section>
      <section className="max-w-screen-xl w-full mx-auto mt-48 md:flex md:mt-60 xl:mt-120">
        <div
          className="flex-1 mt-10 pt-0 p-14 md:ml-48 xl:ml-96 md:mr-60 xl:mr-120 leading-8"
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
            <h1 className="text-primary text-36 font-serif font-bold">{section.title}</h1>
            <p className="mt-10 whitespace-pre-line leading-8">{section.content}</p>
          </div>
          <div className="flex-1">
            <img src={section.image} alt={section.title} />
          </div>
        </section>
      ))}
    </Page>
  );
}
