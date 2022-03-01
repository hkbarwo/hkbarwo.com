import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from "classnames";

import useResize from "../utils/react-hooks/useResize";

import ClientOnly from "./ClientOnly";

export default function ImageSlideshow(props) {
  const sliderSection = useRef(null);
  const { width: sliderWidth } = useResize(sliderSection);
  const [slideIndex, setSlideIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div
      ref={sliderSection}
      className={classNames("relative", props.className)}
    >
      <ClientOnly>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          observer={true}
          onSlideChange={(swiper) => {
            setSlideIndex(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            setControlledSwiper(swiper);
            setSlideIndex(swiper.realIndex);
          }}
          style={{ width: sliderWidth }}
        >
          {props.images.map((image, i) => (
            <SwiperSlide key={i}>
              <img className="block w-full object-center" src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </ClientOnly>

      <ul className="absolute z-10 bottom-8 inset-x-0 flex justify-center">
        {props.images.map((_, i) => (
          <li
            key={i}
            className={classNames(
              'w-10 h-10 m-12 rounded-8',
              i === slideIndex ? 'bg-secondary' : 'bg-white'
            )}
          />
        ))}
      </ul>

      <button
        className="absolute z-10 left-20 top-1/2 w-44 h-44 -mt-22 p-16 bg-black bg-opacity-10 rounded-full group backdrop-filter backdrop-blur-md"
        onClick={() => {
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
        className="absolute z-10 right-20 top-1/2 w-44 h-44 -mt-22 p-16 bg-black bg-opacity-10 rounded-full group backdrop-filter backdrop-blur-md"
        onClick={() => {
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
  );
}
