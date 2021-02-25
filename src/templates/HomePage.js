import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import useResizeObserver from '@react-hook/resize-observer';

import classNames from "classnames";

import PageNav from "../components/PageNav";
import PageFooter from "../components/PageFooter";
import SiteLogo from "../components/SiteLogo";

function useSize(target) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}

function useSlideSize(slider) {
  const { width = 0 } = useSize(slider);
  let slidesPerPage = 1;
  if (width >= 320 * 3) {
    slidesPerPage = 3;
  } else if (width >= 320 * 2) {
    slidesPerPage = 2;
  }

  return {
    slideWidth: Math.max(320, width / slidesPerPage),
    slidesPerPage
  };
}

function FullScreenSlide({ slide, i, total, onClose, onNext, onPrev }) {
  return (
    <li
      key={slide.slug}
      className="absolute inset-0"
    >
      <div
        className="relative flex h-full"
        href={`#${slide.slug}`}
        style={{
          backgroundImage:
            `linear-gradient(to bottom, ${slide.gradient.color1} 0% , ${slide.gradient.color2} 100%)`,
        }}
      >
        <div className="hidden lg:block relative flex-1 overflow-hidden">
          <img
            className={classNames('w-full h-full', slide.bgImageFillStyle === 'contain' ? 'object-contain' : 'object-cover')}
            src={`${slide.bgImage}`}
            alt={slide.title}
          />
        </div>
        <div className="flex-1 text-white">
          <div className="p-10 sm:p-32 md:p-64 w-full">
            <div className="flex items-center justify-between">
              <div className="hidden lg:block mr-24 text-18 tracking-wide flex-grow">{slide.shortTitle}</div>
              <div className="mr-24 flex items-center">
                <button
                  className="w-20 h-20"
                  onClick={onPrev}
                >
                  <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M18.45,10.13H1.76m8.59-8.8L1.68,10l8.68,8.67" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </button>
                <span className="mx-8 text-22 font-light tracking-widest leading-none">{`${i < 9 ? '0' : ''}${i + 1}/${total < 9 ? '0' : ''}${total + 1}`}</span>
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
              <div className="md:hidden mt-32 text-18 tracking-wide text-center">{slide.shortTitle}</div>
              <h1 className="mt-16 md:mt-40 text-36 font-bold font-serif tracking-widest text-center md:text-left">{slide.title}</h1>
              <h2 className="mt-4 text-28 font-light font-serif tracking-widest text-center md:text-left">{slide.subtitle}</h2>
              <p className="mt-44 text-14 leading-8 whitespace-pre-wrap">{slide.description}</p>
              <a
                className="mt-60 mx-auto flex items-center py-10 px-24 rounded-full border border-white bg-white bg-opacity-25 group"
                href="#"
              >
                {slide.buttonTitle}
                <svg
                  className="ml-12 w-12 h-12 transform group-hover:translate-x-4 transition-transform"
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
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function HomePageTemplate({ pageContext }) {
  const slideCount = pageContext.slides.length;
  const maxSlideIndex = slideCount - 1;

  const sliderSection = useRef(null);

  const { slideWidth, slidesPerPage } = useSlideSize(sliderSection);

  const [preciseSlideIndex, setPreciseSlideIndex] = useState(0);
  const slideIndex = Math.round(preciseSlideIndex);

  const [isShowDetail, setIsShowDetail] = useState(false);

  const clampedSlideIndex = useMemo(() => {
    return Math.min(preciseSlideIndex, maxSlideIndex - slidesPerPage + 1);
  }, [maxSlideIndex, slidesPerPage, preciseSlideIndex]);
  const sliderOffset = clampedSlideIndex * slideWidth;

  useLayoutEffect(() => {
    function handleScroll() {
      window.requestAnimationFrame(() => {
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        setPreciseSlideIndex(scrollY / scrollHeight * maxSlideIndex);
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxSlideIndex]);

  useLayoutEffect(() => {
    let timerID;
    if (preciseSlideIndex !== slideIndex) {
      timerID = setTimeout(() => {
        setPreciseSlideIndex(slideIndex);
      }, 500);
    }
    return () => {
      if (timerID) {
        clearTimeout(timerID);
      }
    }
  }, [preciseSlideIndex, slideIndex])

  const goToPage = useCallback((direction) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const pageIndex = Math.floor(preciseSlideIndex / slidesPerPage) + slidesPerPage * direction;
    const scrollY = scrollHeight / maxSlideIndex * pageIndex;
    window.scrollTo(0, scrollY);
  }, [preciseSlideIndex, maxSlideIndex, slidesPerPage]);

  const goToSlide = useCallback((index) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollY = scrollHeight / maxSlideIndex * index;
    window.scrollTo(0, scrollY);
  }, [maxSlideIndex])

  function nextPage() {
    goToPage(1);
  }

  function prevPage() {
    goToPage(-1);
  }

  function onClickSlide(e, index) {
    e.preventDefault();
    goToSlide(index);
    setIsShowDetail(true);
  }

  return (
    <main className="font-sans">
      <PageNav {...{ pageContext }} />
      <header className="p-20 pt-16 bg-white md:hidden">
        <SiteLogo className="mx-auto" style={{ maxWidth: 140 }} />
      </header>
      <div className="fixed inset-0 hidden md:flex items-stretch">
        <section
          className="flex-shrink-0"
          style={{ width: 346 }}
        >
          <header className="p-28 bg-gray-f4 bg-pattern-white h-full">
            <SiteLogo className="mx-auto" style={{ maxWidth: 200 }} />
          </header>
        </section>
        <section ref={sliderSection} className="relative flex-grow overflow-hidden">
          <ul
            className="absolute flex items-stretch left-0 inset-y-0"
            style={{
              transition: 'transform 0.5s ease',
              transform: `translateX(-${sliderOffset}px)`,
            }}
          >
            {pageContext.slides.map((slide, i) => (
              <li
                key={slide.slug}
                className="text-white group"
                style={{ width: slideWidth }}
              >
                <a
                  className={classNames('flex h-full', i % 2 === 0 ? 'flex-col-reverse' : 'flex-col')}
                  href={`#${slide.slug}`}
                  onClick={(e) => onClickSlide(e, i)}
                >
                  <div className="relative flex-grow overflow-hidden">   
                    <img
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform ease-out duration-300"
                      src={`${slide.bgImage}`} alt={slide.title}
                    />
                  </div>
                  <div className="flex-shrink-0 aspect-w-1 aspect-h-1">
                    <div
                      className="p-20"
                      style={{
                        backgroundImage:
                          `linear-gradient(to bottom, ${slide.gradient.color1} 0% , ${slide.gradient.color2} 100%)`,
                      }}
                    >
                      <div>
                        <span className="text-22 font-light tracking-widest">{`${i < 9 ? '0' : ''}${i + 1}`}</span>
                        <span className="ml-10 text-18 tracking-wide">{slide.shortTitle}</span>
                      </div>
                      <h1 className="mt-40 text-36 font-bold font-serif tracking-widest">{slide.title}</h1>
                      <h2 className="mt-4 text-28 font-light font-serif tracking-widest">{slide.subtitle}</h2>
                      <p className="mt-8 text-14 leading-5 whitespace-pre-wrap line-clamp-2">{slide.description}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <button
            className="absolute left-20 top-1/2 w-44 h-44 -mt-22 p-16 bg-black rounded-full group"
            onClick={prevPage}
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
            className="absolute right-20 top-1/2 w-44 h-44 -mt-22 p-16 bg-black rounded-full group"
            onClick={nextPage}
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
      <ul className="hidden md:block opacity-0 pointer-events-none">
        {pageContext.slides.map((slide, i) => (
          <li key={slide.slug} style={{ height: '33.33vh' }} />
        ))}
      </ul>
      <ul className="md:hidden">
        {pageContext.slides.map((slide, i) => (
          <li
            key={slide.slug}
            className="text-white"
          >
            <a href={`#${slide.slug}`} onClick={(e) => onClickSlide(e, i)}>
              <div className="aspect-w-1 aspect-h-1">   
                <img
                  className="object-cover"
                  src={`${slide.bgImage}`} alt={slide.title}
                />
              </div>
              <div
                className="p-20 flex"
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
                  <h1 className="mt-4 text-36 font-serif font-bold tracking-widest">{slide.title}</h1>
                  <h2 className="text-28 font-serif font-light tracking-widest">{slide.subtitle}</h2>
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
      {isShowDetail && (
        <section className="z-50 md:z-0 fixed inset-0">
          <ul>
            <FullScreenSlide
              slide={pageContext.slides[slideIndex]}
              i={slideIndex}
              total={maxSlideIndex}
              onClose={() => setIsShowDetail(false)}
              onNext={() => goToSlide(slideIndex + 1)}
              onPrev={() => goToSlide(slideIndex - 1)}
            />
          </ul>
          <div className="hidden absolute right-0 inset-y-0 w-60 md:flex items-center justify-center">
            <ul>
              {pageContext.slides.map((slide, i) => (
                <li
                  key={slide.slug}
                  className={classNames(
                    'w-10 h-10 my-8 border border-white rounded-full transition-colors',
                    {
                      'bg-white': i === slideIndex,
                    },
                  )}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
      <PageFooter className="md:hidden" {...{ pageContext }} />
    </main>
  )
}
