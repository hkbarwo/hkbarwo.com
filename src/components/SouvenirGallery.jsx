import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from 'react-modal';
import classNames from 'classnames';

export function SouvenirGallery({
  isOpen = false,
  items = [],
  onClose,
}) {
  const [controlledSwiper, setSwiper] = React.useState(null)
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
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
          height: '100vh',
        },
      }}
      onRequestClose={onClose}
    >
      <div className="relative flex justify-between h-full">
        <div className="flex flex-col justify-start flex-shrink-0">
          <div className="hidden grid-flow-row gap-16 lg:grid p-80">
            {items.map((image, i) => (
              <img
                key={image}
                className={classNames(
                  'w-96 h-96 object-center cursor-pointer  transition-all',
                  i === activeImageIndex ? 'hover:opacity-90' : 'opacity-50 hover:opacity-80',
                )}
                src={image}
                alt=""
                onClick={() => {
                  controlledSwiper.slideTo(i + 1)
                }}
              />
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center flex-grow align-top lg:mr-96">
          <div style={{ maxWidth: 578, width: "100vw" }}>
            <Swiper
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
              spaceBetween={0}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSwiper={(swiper) => {
                setSwiper(swiper)
              }}
              onSlideChange={(swiper) => {
                setActiveImageIndex(swiper.realIndex)
              }}
            >
              {items.map(image => (
                <SwiperSlide
                  key={image}
                  zoom={true}
                >
                  <img className="h-full" src={image} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="absolute left-0 z-10 flex items-center justify-center mr-16 bg-white bg-opacity-50 border border-black rounded-full group w-44 h-44 border-1"
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
            className="absolute right-0 z-10 flex items-center justify-center ml-16 bg-white bg-opacity-50 border border-black rounded-full group w-44 h-44 border-1"
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
        <div className="absolute top-0 right-0 z-10 p-28">
          <button onClick={onClose}>
            <svg
              className="w-40 h-40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40">
              <g
                className="text-white dark:text-gray-24"
                fill="none" stroke="black" strokeLinecap="round"
              >
                <line x1="12" y1="12" x2="28" y2="28" />
                <line x1="28" y1="12" x2="12" y2="28" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
}