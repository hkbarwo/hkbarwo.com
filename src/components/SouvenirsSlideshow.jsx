import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

export function SouvenirsSlideshow({ items = [], className }) {
  const [controlledSwiper, setSwiper] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className={classNames(className)}>
      <div className="relative flex items-center">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          height={620}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {items.map(item => (
            <SwiperSlide key={item.slug}>
              <div className="relative">
                <img
                  className="object-cover w-full"
                  src={item.banner}
                  alt={item.title}
                  style={{ height: 620 }}
                />
                <div
                  className="absolute top-0 left-0 ml-24 font-serif font-bold tracking-widest lg:ml-80 mt-72 text-36 text-primary"
                  style={{ maxWidth: 400 }}
                >{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-0 left-0 right-0 z-10 grid justify-center grid-flow-col gap-12 mb-24">
          {items.map((item, index) => (
            <div
              key={item.slug}
              className={classNames(
                'w-12',
                'h-12',
                'rounded-full',
                'border-primary',
                'border',
                {
                  'bg-primary': activeIndex === index,
                }
              )}
            />
          ))}
        </div>
        <button
          className="absolute left-0 z-10 flex items-center justify-center ml-24 mr-16 bg-white rounded-full lg:ml-80 group w-44 h-44 border-1"
          onClick={() => { controlledSwiper.slidePrev() }}
        >
          <svg
            className="w-12 h-12 transition-transform transform group-hover:-translate-x-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.69 6h-9.3m4.83 4.83L1.39 6l4.84-4.84"
              fill="none"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          className="absolute right-0 z-10 flex items-center justify-center ml-16 mr-24 bg-white rounded-full lg:mr-80 group w-44 h-44 border-1"
          onClick={() => { controlledSwiper.slideNext() }}
        >
          <svg
            className="w-12 h-12 transition-transform transform group-hover:translate-x-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M1.39 6h9.3M5.86 1.16L10.69 6l-4.84 4.83"
              fill="none"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
