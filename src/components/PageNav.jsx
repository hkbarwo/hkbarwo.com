import React, { useState } from "react"
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import FadeTransition from "./FadeTransition";
import SiteLogo from "./SiteLogo";

export default function PageNav({ pageContext, pageTitle }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className="relative z-10">
      <div className="fixed top-0 right-0 md:w-60">
        <button
          className={classNames(
            'p-10 pb-16 md:p-20 md:w-full bg-primary text-white rounded-bl-2xl md:rounded-none', 
            !!pageTitle ? 'md:bg-primary' : 'md:bg-transparent',
          )}
          onClick={() => setOpen(true)}
        >
          <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="17.143" viewBox="0 0 16 17.143">
            <g fill="currentColor" transform="translate(0 -184)">
              <rect width="3" height="3" transform="translate(0 184)" />
              <rect width="3" height="3" transform="translate(0 191.071)" />
              <rect width="3" height="3" transform="translate(0 198.143)" />
              <rect width="3" height="3" transform="translate(6.5 184)" />
              <rect width="3" height="3" transform="translate(6.5 191.071)" />
              <rect width="3" height="3" transform="translate(6.5 198.143)" />
              <rect width="3" height="3" transform="translate(13 184)" />
              <rect width="3" height="3" transform="translate(13 191.071)" />
              <rect width="3" height="3" transform="translate(13 198.143)" />
            </g>
          </svg>
          <div className="mt-16 mx-auto break-all w-16 uppercase">
            <FormattedMessage id="menu" />
          </div>
        </button>
        {!!pageTitle && (
          <div className="hidden md:block p-20">
            <div className="mx-auto break-all w-16 uppercase font-serif text-black font-black text-center">
              {pageTitle}
            </div>
          </div>
        )}
      </div>

      <FadeTransition inProp={isOpen}>
        {({ style, state }) => (
          <div
            className={classNames(
              'flex flex-col fixed top-0 right-0 left-0 bottom-0 p-40 bg-primary bg-pattern-light bg-repeat transition-opacity duration-300',
              {
                'pointer-events-none': state === 'exited',
              }
            )}
            style={style}
          >
            <header className="flex items-start">
              <SiteLogo style={{ width: 180 }} />
              <div className="flex-grow" />
              <div className="flex items-center">
                <button
                  className={classNames('flex items-center mx-10 hover:opacity-100', { 'opacity-40': false })}
                >
                  <svg
                    className="w-24 h-24 mr-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,4a.68.68,0,0,0,.69-.68h0V1a.69.69,0,1,0-1.38,0h0V3.3A.68.68,0,0,0,12,4Z"/>
                    <path d="M12,20a.68.68,0,0,0-.69.68h0V23a.69.69,0,0,0,1.38,0h0V20.7A.68.68,0,0,0,12,20Z"/>
                    <path d="M5.36,6.33a.7.7,0,0,0,1,0,.69.69,0,0,0,0-1L4.68,3.71a.68.68,0,0,0-1,1Z"/>
                    <path d="M18.64,17.67a.69.69,0,0,0-1,1l1.65,1.65a.69.69,0,0,0,1,0,.68.68,0,0,0,0-.94Z"/>
                    <path d="M4,12a.68.68,0,0,0-.68-.69H1a.69.69,0,1,0,0,1.38H3.3A.68.68,0,0,0,4,12Z"/>
                    <path d="M23,11.31H20.7a.69.69,0,0,0,0,1.38H23a.69.69,0,0,0,0-1.38Z"/>
                    <path d="M5.36,17.67,3.71,19.32a.69.69,0,1,0,1,1l0,0,1.65-1.65a.69.69,0,0,0-1-1Z"/>
                    <path d="M18.17,6.51a.68.68,0,0,0,.49-.2l1.65-1.65a.68.68,0,0,0-.06-1,.68.68,0,0,0-.91,0L17.69,5.34a.69.69,0,0,0,0,1,.7.7,0,0,0,.5.2Z"/>
                    <path d="M12.09,5A7,7,0,1,0,19,12v-.09A7,7,0,0,0,12.09,5Zm0,12.52a5.58,5.58,0,1,1,5.49-5.67v.1A5.59,5.59,0,0,1,12.09,17.49Z"/>
                  </svg>
                  <label
                    className={classNames('py-2', { 'border-b': true, 'opacity-40': false })}
                  >{pageContext.general.themeSettings.light}</label>
                </button>
                <button className={classNames('flex items-center mx-10 hover:opacity-100', { 'opacity-40': true })}>
                  <svg
                    className="w-24 h-24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.72,18A8.28,8.28,0,0,1,15.4,2.7a9.21,9.21,0,0,0-2.34-.3,9.6,9.6,0,0,0,0,19.2,9.47,9.47,0,0,0,7.48-3.66c-.27,0-.55,0-.82,0Z"/>
                  </svg>
                  <label
                    className={classNames('py-2', { 'border-b': false })}
                  >{pageContext.general.themeSettings.dark}</label>
                </button>

                <a
                  className={classNames('mx-10 py-2 hover:opacity-100', { 'border-b': true, 'opacity-40': false })}
                  href="#zh"
                >中文</a>
                <a
                  className={classNames('mx-10 py-2 hover:opacity-100', { 'border-b': false, 'opacity-40': true })}
                  href="#en"
                >ENG</a>

                <button
                  className="dark:bg-text-primary ml-32 -mr-20"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="w-40 h-40"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="20" fill="currentColor"/>
                    <g
                      className="text-white dark:text-gray-24"
                      fill="none" stroke="currentColor" strokeLinecap="round"
                    >
                      <line x1="12" y1="12" x2="28" y2="28" />
                      <line x1="28" y1="12" x2="12" y2="28" />
                    </g>
                  </svg>
                </button>
              </div>
            </header>
            <nav className="flex flex-grow flex-row-reverse mt-40">
              <ul className="flex-shrink-0 ml-20 mr-48 text-right">
                {pageContext.menus['primary'].map((item, i) => (
                  <li
                    className={classNames({ 'mt-20': i > 0 })}
                    key={item.slug}
                  >
                    <a
                      className={classNames(item.style === "primary" ? "text-24 font-bold" : "text-14 underline")}
                      href={`#${item.slug}`}
                    >{item.title}</a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-grow flex-wrap justify-center -m-10">
                {pageContext.menus['secondary'].map(item => (
                  <li
                    key={item.slug}
                    className="m-10 min-w-180 text-center"
                  >
                    <a
                      className="text-24 font-bold"
                      href={`#${item.slug}`}
                    >{item.title}</a>
                    <hr className="my-8" />
                  </li>
                ))}
              </ul>
              {/* <ul>
                {pageContext.menus['primary-mobile'].map(item => (
                  <li key={item.slug}><a href={`#${item.slug}`}>{item.title}</a></li>
                ))}
              </ul> */}
          
              {/* <ul>
                {pageContext.menus['secondary-mobile'].map(item => (
                  <li key={item.slug}><a href={`#${item.slug}`}>{item.title}</a></li>
                ))}
              </ul> */}
            </nav>
            <footer className="flex items-end">
              <ul className="mt-32 flex-grow">
                <li className="flex items-center">
                  <span className="flex items-center justify-center w-24 h-24 mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.712" height="18.298" viewBox="0 0 18.712 18.298">
                      <path
                        d="M15.482,19.951a2.556,2.556,0,0,1-.542-.06,18.364,18.364,0,0,1-9-4.739,17.715,17.715,0,0,1-4.874-8.8A2.48,2.48,0,0,1,1.8,4.034L3.963,1.949a1.059,1.059,0,0,1,1.619.179l2.708,4a.867.867,0,0,1-.06,1.029L6.871,8.784a10.257,10.257,0,0,0,2.258,3.19,10.431,10.431,0,0,0,3.287,2.215L14.1,12.851a.888.888,0,0,1,1.007-.065L19.2,15.429a1.083,1.083,0,0,1,.222,1.684L17.307,19.2a2.567,2.567,0,0,1-1.825.747ZM4.71,2.729,2.544,4.814a1.376,1.376,0,0,0-.406,1.3,16.626,16.626,0,0,0,4.555,8.264,17.276,17.276,0,0,0,8.47,4.457,1.489,1.489,0,0,0,1.354-.4l2.112-2.09L14.68,13.793l-1.809,1.441a.542.542,0,0,1-.5.092,10.864,10.864,0,0,1-3.986-2.572,10.555,10.555,0,0,1-2.637-3.9.542.542,0,0,1,.13-.514L7.342,6.591Z"
                        transform="translate(-1.013 -1.653)"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>{pageContext.contact.phone}</span>
                </li>
                <li className="flex items-center mt-8">
                  <span className="flex items-center justify-center w-24 h-24 mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.247" height="14.622" viewBox="0 0 16.247 14.622">
                      <g fill="currentColor">
                        <path
                          d="M17.081,7.166H16V5H6.249V7.166H5.166A2.166,2.166,0,0,0,3,9.333V15.29H5.123V14.255H4.083V9.333A1.083,1.083,0,0,1,5.166,8.249H17.081a1.083,1.083,0,0,1,1.083,1.083v4.874h-1.04V15.29h2.123V9.333A2.166,2.166,0,0,0,17.081,7.166Zm-2.166,0H7.333V6.083h7.582Z"
                          transform="translate(-3 -5)"
                        />
                        <path
                          d="M18.373,18H7.542a.542.542,0,0,0,0,1.083h.542v6.5h9.748v-6.5h.542a.542.542,0,0,0,0-1.083Zm-1.625,6.5H9.166V19.083h7.582Z"
                          transform="translate(-4.834 -10.96)"
                        />
                        <path
                          d="M27,13.04h1.083v1.083H27Z"
                          transform="translate(-14.002 -8.686)"
                        />
                      </g>
                    </svg>
                  </span>
                  <span>{pageContext.contact.fax}</span>
                </li>
                <li className="flex items-center mt-8">
                  <span className="flex items-center justify-center w-24 h-24 mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.33" height="12.998" viewBox="0 0 17.33 12.998">
                      <path
                        d="M18.247,6H3.083A1.083,1.083,0,0,0,2,7.083V17.914A1.083,1.083,0,0,0,3.083,19H18.247a1.083,1.083,0,0,0,1.083-1.083V7.083A1.083,1.083,0,0,0,18.247,6Zm-.834,11.914H3.982l3.791-3.921-.78-.753-3.91,4.045V7.906l6.732,6.7a1.083,1.083,0,0,0,1.527,0l6.9-6.867v9.477L14.261,13.23l-.764.764ZM3.793,7.083H17.37l-6.791,6.753Z"
                        transform="translate(-2 -6)"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>{pageContext.contact.email}</span>
                </li>
                <li className="flex items-center mt-8">
                  <span className="flex items-center justify-center w-24 h-24 mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.77" viewBox="0 0 12.77 17.64">
                      <path d="M6.38,2.56a3.1,3.1,0,1,0,3.1,3.1h0A3.1,3.1,0,0,0,6.38,2.56Z" fill="none" stroke="currentColor" strokeMiterlimit="10"/>
                      <path d="M6.38,0A6.38,6.38,0,0,0,0,6.35C0,8.88,1.42,11,2.46,12.54l.19.28A53.55,53.55,0,0,0,6,17.16l.42.48.41-.48a53.55,53.55,0,0,0,3.32-4.34l.19-.28c1-1.55,2.46-3.66,2.46-6.19A6.39,6.39,0,0,0,6.38,0Zm3,11.91-.2.29a42.67,42.67,0,0,1-2.83,3.74c-.64-.78-1.9-2.34-2.83-3.74l-.19-.29c-1-1.43-2.28-3.38-2.28-5.58A5.3,5.3,0,1,1,11.67,6a2.41,2.41,0,0,1,0,.38c0,2.22-1.31,4.18-2.27,5.59Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span>{pageContext.contact.address}</span>
                </li>
              </ul>
              <div>
                <div className="mb-24 p-8 text-center">
                  <div className="mb-20 text-16 font-bold">{pageContext.newsletter.cta}</div>
                  <div className="flex justify-center -m-8">
                    <input
                      className="m-8 px-20 lg:px-32 py-12 lg:py-16 text-14 lg:text-18 text-center bg-white rounded-full max-w-sm w-full"
                      placeholder={pageContext.newsletter.placeholder}
                    ></input>
                    <button
                      className="flex-shrink-0 m-8 px-20 lg:px-32 py-12 lg:py-16 text-18 text-white bg-black rounded-full"
                    >{pageContext.newsletter.buttonTitle}</button>
                  </div>
                </div>
                <div className="flex">
                  <div className="text-right m-8">
                    {(pageContext.general.copyright || '').replace('{year}', new Date().getFullYear())}
                  </div>
                  <ul className="flex justify-center items-center">
                    <li className="m-8">
                      <a
                        href={pageContext.general.socialAccounts.facebook}
                        alt="Facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.56" height="20.56" viewBox="0 0 20.56 20.56">
                          <path
                            fill="currentColor"
                            d="M23.925,4.5H5.635A1.136,1.136,0,0,0,4.5,5.635v18.29A1.136,1.136,0,0,0,5.635,25.06H14.78V16.922H12.322v-3H14.78V11.707a3.906,3.906,0,0,1,4.214-4.1c1.135,0,2.356.086,2.64.123V10.5h-1.89c-1.29,0-1.537.61-1.537,1.51v1.911H21.28l-.4,3H18.207V25.06h5.718a1.136,1.136,0,0,0,1.135-1.135V5.635A1.136,1.136,0,0,0,23.925,4.5Z"
                            transform="translate(-4.5 -4.5)"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="m-8">
                      <a
                        href={pageContext.general.socialAccounts.instagram}
                        alt="Instagram"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.995" viewBox="0 0 24 23.995">
                          <path
                            fill="currentColor"
                            d="M12,8.083a6.152,6.152,0,1,0,6.152,6.152A6.142,6.142,0,0,0,12,8.083Zm0,10.151a4,4,0,1,1,4-4A4.007,4.007,0,0,1,12,18.235Zm7.838-10.4A1.435,1.435,0,1,1,18.4,6.4,1.432,1.432,0,0,1,19.836,7.831ZM23.91,9.288A7.1,7.1,0,0,0,21.972,4.26a7.148,7.148,0,0,0-5.028-1.938c-1.981-.112-7.919-.112-9.9,0A7.137,7.137,0,0,0,2.017,4.255,7.124,7.124,0,0,0,.079,9.282c-.112,1.981-.112,7.919,0,9.9A7.1,7.1,0,0,0,2.017,24.21a7.157,7.157,0,0,0,5.028,1.938c1.981.112,7.919.112,9.9,0a7.1,7.1,0,0,0,5.028-1.938,7.148,7.148,0,0,0,1.938-5.028c.112-1.981.112-7.913,0-9.894Zm-2.559,12.02a4.049,4.049,0,0,1-2.281,2.281c-1.579.626-5.327.482-7.073.482s-5.5.139-7.073-.482a4.049,4.049,0,0,1-2.281-2.281c-.626-1.579-.482-5.327-.482-7.073s-.139-5.5.482-7.073A4.049,4.049,0,0,1,4.925,4.881C6.5,4.255,10.252,4.4,12,4.4s5.5-.139,7.073.482a4.049,4.049,0,0,1,2.281,2.281c.626,1.579.482,5.327.482,7.073S21.977,19.734,21.351,21.308Z"
                            transform="translate(0.005 -2.238)"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="m-8">
                      <a
                        href={pageContext.general.socialAccounts.youtube}
                        alt="YouTube"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="29.241" height="20.56" viewBox="0 0 29.241 20.56">
                          <path
                            fill="currentColor"
                            d="M29.68,7.717a3.674,3.674,0,0,0-2.585-2.6C24.814,4.5,15.67,4.5,15.67,4.5s-9.144,0-11.424.615a3.674,3.674,0,0,0-2.585,2.6A38.543,38.543,0,0,0,1.05,14.8a38.543,38.543,0,0,0,.611,7.084,3.619,3.619,0,0,0,2.585,2.56c2.28.615,11.424.615,11.424.615s9.144,0,11.424-.615a3.619,3.619,0,0,0,2.585-2.56,38.543,38.543,0,0,0,.611-7.084,38.543,38.543,0,0,0-.611-7.084Zm-17,11.432v-8.7L20.322,14.8,12.68,19.148Z"
                            transform="translate(-1.05 -4.5)"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        )}
      </FadeTransition>
    </div>
  )
}
