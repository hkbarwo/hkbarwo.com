import React, { useMemo } from "react"
import classNames from "classnames";

export function HomePageSlide({
  slide,
  i,
  num,
  isPrev,
  isNext,
  isVisible,
  initialSlide,
  onClickSlide
}) {
  const isHidden = !isVisible && !isPrev && !isNext;
  const isEven = i % 2 === 0
  const delayClass = useMemo(() => {
    switch (i) {
      case 1 + initialSlide:
        return 'delay-300'
    
      case 2 + initialSlide:
        return 'delay-700'

      default:
        return ''
    }
  }, [i])

  const imageClassNames = useMemo(() => classNames([
    'absolute',
    'inset-0',
    'object-cover',
    'w-full',
    'h-full',
    'transition',
    'duration-1000',
    'ease-out',
    'transform',
    'group-hover:scale-110',
    isHidden ? 'duration-300' : 'duration-1000',
    delayClass,
    {
      [isEven ? 'translate-y-1/4' : '-translate-y-1/4']: isHidden,
      'opacity-0': isHidden,
    },
  ]), [i, isHidden])
  return (
    <a
      className={classNames('flex h-full', isEven ? 'flex-col-reverse' : 'flex-col')}
      href={`#${slide.slug}`}
      onClick={(e) => onClickSlide(e, num)}
    >
      <div
        className="relative flex-grow overflow-hidden"
        style={{
          backgroundColor: isEven ? slide.gradient.color2 : slide.gradient.color1,
        }}
      >
        <img
          className={imageClassNames}
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
          <div
            className={classNames(
              'transition',
              'duration-500',
              'delay-300',
              'transform',
              'ease-out',
              {
                'opacity-0': isHidden,
                'translate-x-1/4': isHidden,
              }
            )}
          >
            <span className="font-light tracking-widest text-22">{`${num < 9 ? '0' : ''}${num + 1}`}</span>
            <span className="ml-10 tracking-wide text-18">{slide.shortTitle}</span>
          </div>
          <h1
            className={classNames(
              'mt-24 font-serif font-bold tracking-widest text-36',
              'transition',
              'duration-500',
              'delay-500',
              'transform',
              'ease-out',
              {
                'opacity-0': isHidden,
                'translate-x-1/4': isHidden,
              }
            )}
          >{slide.title}</h1>
          <h2
            className={classNames(
              'mt-4 font-serif font-light tracking-widest text-28',
              'transition',
              'duration-500',
              'delay-700',
              'transform',
              'ease-out',
              {
                'opacity-0': isHidden,
                'translate-x-1/4': isHidden,
              }
            )}
          >{slide.subtitle}</h2>
          <p
            className={classNames(
              'mt-8 leading-5 whitespace-pre-wrap text-14 line-clamp-2',
              'transition',
              'duration-500',
              'delay-1000',
              'transform',
              'ease-out',
              {
                'opacity-0': isHidden,
                'translate-x-1/4': isHidden,
              }
            )}
          >{slide.description}</p>
        </div>
      </div>
    </a>
  );
}
