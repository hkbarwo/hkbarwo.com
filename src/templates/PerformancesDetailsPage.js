import React, { useMemo } from "react";
import classNames from "classnames";

import IntlProvider from "../components/IntlProvider";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";
import PageHeader from "../components/PageHeader";
import YouTubePlayer from "../components/YouTubePlayer";

export default function PerformancesDetailsPage({ path, pageContext }) {
  const { locale, menus, pageData } = pageContext;
  const menuItem = menus.secondary.find(({ slug }) => slug === 'events');

  const pageKey = useMemo(() => {
    switch (pageData.type) {
      case 'performance':
        return new Date(pageData.date).getTime() > Date.now()
          ? 'performances-upcoming'
          : 'performances-past';
  
      case 'event':
        return new Date(pageData.date).getTime() > Date.now()
          ? 'events-latest'
          : 'events-past';
  
      case 'other':
        return 'performances-other';
    
      default:
        return '';
    }
  }, [pageData.type, pageData.date]);

  return (
    <IntlProvider language={locale}>
      <main className="flex flex-col min-h-screen tracking-wide">
        <PageNav
          {...{ path, pageContext }}
          pageTitle={menuItem.title}
        />

        <PageHeader
          locale={locale}
          menuItems={menuItem.subPages.map((item) => ({
            path: `/${locale}${item.url}`,
            key: item.slug,
            title: item.title,
          }))}
          getActive={({ key }) => key === pageKey}
        />

        <article className="flex-grow max-w-screen-2xl mx-auto w-full grid grid-cols-1 xl:grid-cols-3 lg:gap-x-48 xl:gap-x-120 gap-y-48 p-14 md:px-96 pb-56">
          <section className="xl:col-span-2">
            <h1 className="text-primary text-36 font-bold font-serif">
              {pageData.title}
            </h1>
            <div className="markdown mt-20" dangerouslySetInnerHTML={{ __html: pageData.content }}/>
            {pageData.coverImage && (
              <div className="mt-48">
                <img src={pageData.coverImage} alt={pageData.title} />
              </div>
            )}
          </section>

          <section className="xl:col-span-1">
            <ul>
              {pageData.metadata.map((data, i) => (
                <li key={data.label} className={classNames({ 'mt-12': i > 0 })}>
                  <div className={classNames('text-secondary text-14 font-bold', { 'text-tertiary': data.isShowInList })}>
                    {data.label}
                  </div>
                  <div className="markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
                </li>
              ))}

              {pageData.tel && (
                <li className="flex items-center mt-12">
                  <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.712" height="18.298" viewBox="0 0 18.712 18.298">
                      <path
                        d="M15.482,19.951a2.556,2.556,0,0,1-.542-.06,18.364,18.364,0,0,1-9-4.739,17.715,17.715,0,0,1-4.874-8.8A2.48,2.48,0,0,1,1.8,4.034L3.963,1.949a1.059,1.059,0,0,1,1.619.179l2.708,4a.867.867,0,0,1-.06,1.029L6.871,8.784a10.257,10.257,0,0,0,2.258,3.19,10.431,10.431,0,0,0,3.287,2.215L14.1,12.851a.888.888,0,0,1,1.007-.065L19.2,15.429a1.083,1.083,0,0,1,.222,1.684L17.307,19.2a2.567,2.567,0,0,1-1.825.747ZM4.71,2.729,2.544,4.814a1.376,1.376,0,0,0-.406,1.3,16.626,16.626,0,0,0,4.555,8.264,17.276,17.276,0,0,0,8.47,4.457,1.489,1.489,0,0,0,1.354-.4l2.112-2.09L14.68,13.793l-1.809,1.441a.542.542,0,0,1-.5.092,10.864,10.864,0,0,1-3.986-2.572,10.555,10.555,0,0,1-2.637-3.9.542.542,0,0,1,.13-.514L7.342,6.591Z"
                        transform="translate(-1.013 -1.653)"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>{pageData.tel}</span>
                </li>
              )}
              {pageData.email && (
                <li className="flex items-center mt-12">
                  <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.33" height="12.998" viewBox="0 0 17.33 12.998">
                      <path
                        d="M18.247,6H3.083A1.083,1.083,0,0,0,2,7.083V17.914A1.083,1.083,0,0,0,3.083,19H18.247a1.083,1.083,0,0,0,1.083-1.083V7.083A1.083,1.083,0,0,0,18.247,6Zm-.834,11.914H3.982l3.791-3.921-.78-.753-3.91,4.045V7.906l6.732,6.7a1.083,1.083,0,0,0,1.527,0l6.9-6.867v9.477L14.261,13.23l-.764.764ZM3.793,7.083H17.37l-6.791,6.753Z"
                        transform="translate(-2 -6)"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>{pageData.email}</span>
                </li>
              )}
              {pageData.location && (
                <li className="flex items-center mt-12">
                  <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.77" viewBox="0 0 12.77 17.64">
                      <path d="M6.38,2.56a3.1,3.1,0,1,0,3.1,3.1h0A3.1,3.1,0,0,0,6.38,2.56Z" fill="none" stroke="currentColor" strokeMiterlimit="10"/>
                      <path d="M6.38,0A6.38,6.38,0,0,0,0,6.35C0,8.88,1.42,11,2.46,12.54l.19.28A53.55,53.55,0,0,0,6,17.16l.42.48.41-.48a53.55,53.55,0,0,0,3.32-4.34l.19-.28c1-1.55,2.46-3.66,2.46-6.19A6.39,6.39,0,0,0,6.38,0Zm3,11.91-.2.29a42.67,42.67,0,0,1-2.83,3.74c-.64-.78-1.9-2.34-2.83-3.74l-.19-.29c-1-1.43-2.28-3.38-2.28-5.58A5.3,5.3,0,1,1,11.67,6a2.41,2.41,0,0,1,0,.38c0,2.22-1.31,4.18-2.27,5.59Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span>{pageData.location}</span>
                </li>
              )}
            </ul>
          </section>
          
          <section className="xl:col-span-3">
            {!!pageData.youtubeVideoID && (
              <div className="mt-56 max-w-screen-lg mx-auto">
                <YouTubePlayer id={pageData.youtubeVideoID} />
              </div>
            )}

            {!!pageData.photos && pageData.photos.length > 0 && (
              <ul className="mt-56 max-w-screen-lg mx-auto">
                {pageData.photos.map((image, i) => (
                  <li key={image} className={classNames({ 'mt-40': i > 0 })}>
                    <img className="w-full" src={image} alt="" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </article>

        <PageFooter {...{ pageContext }} />
      </main>
    </IntlProvider>
  )
}
