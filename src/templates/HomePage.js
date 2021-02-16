import React from "react"

import PageNav from "../components/PageNav"
import PageFooter from "../components/PageFooter"
import SiteLogo from "../components/SiteLogo"

export default function HomePageTemplate({ pageContext }) {
  return (
    <main>
      <PageNav {...{ pageContext }} />
      <header className="p-20 pt-16 bg-white">
        <SiteLogo className="mx-auto" style={{ maxWidth: 140 }} />
      </header>
      <ul>
        {pageContext.slides.map((slide, i) => (
          <li
            key={slide.slug}
            className="text-white"
          >
            <a href={`#${slide.slug}`}>
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
                    <span>{`${i < 9 ? '0' : ''}${i + 1}`}</span>
                    <span className="ml-10">{slide.shortTitle}</span>
                  </div>
                  <h1 className="mt-4 text-36 font-bold">{slide.title}</h1>
                  <h2 className="text-28">{slide.subtitle}</h2>
                </div>
                <svg
                  className="w-32"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28.6 28.6"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M14,28.25,27.89,14.31,13.94.35" />
                    <path d="M.94,14.3H27.76" />
                  </g>
                </svg>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <PageFooter {...{ pageContext }} />
    </main>
  )
}
