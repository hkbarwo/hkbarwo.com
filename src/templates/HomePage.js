import React from "react"

export default function HomePageTemplate({ pageContext }) {
  return (
    <div>
      {pageContext.locale}

      <ul>
        {pageContext.slides.map(slide => (
          <li
            key={slide.slug}
            style={{
              backgroundImage:
                `linear-gradient(to bottom, ${slide.gradient.color1} 0% , ${slide.gradient.color2} 100%)`,
            }}
          >
            <span>{slide.shortTitle}</span>
            <h1>{slide.title}</h1>
            <h2>{slide.subtitle}</h2>
            <p>{slide.description}</p>
            <img src={`${slide.bgImage}`} alt={slide.title} />
            <button>{slide.buttonTitle}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
