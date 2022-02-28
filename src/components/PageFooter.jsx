import React from "react"
import classNames from "classnames";

import Link from "./Link";

export default function PageFooter({ pageContext, className }) {
  const { locale } = pageContext;
  return (
    <footer
      className={classNames('px-20 py-32 lg:px-96 lg:pt-72 lg:pb-36 text-gray-3c text-14 lg:text-16', className)}
      style={{ backgroundColor: '#6fcdd4' }}
    >
      <div className="max-w-sm mx-auto lg:max-w-full">
        <div className="flex-row-reverse -m-8 lg:flex">
          {/* <div className="p-8 mb-24 text-center">
            <div className="mb-20 font-bold lg:mb-24 text-16 lg:text-24">{pageContext.newsletter.cta}</div>
            <div className="flex justify-center -m-8">
              <input
                className="w-full max-w-sm px-20 py-12 m-8 text-center bg-white rounded-full lg:px-32 lg:py-16 text-14 lg:text-18"
                placeholder={pageContext.newsletter.placeholder}
              ></input>
              <button
                className="flex-shrink-0 px-20 py-12 m-8 text-white bg-black rounded-full lg:px-32 lg:py-16 text-18"
              >{pageContext.newsletter.buttonTitle}</button>
            </div>
          </div> */}
          <nav className="hidden p-8 lg:block">
            <ul className="flex flex-wrap -m-8">
              {pageContext.menus['footer-primary'].map((item, i) => {
                const page = item.page || {};
                return (
                  <li
                    key={item.slug}
                    className="m-8"
                  >
                    <Link to={`/${locale}${page.url}`}>{item.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex-grow p-8">
            <h5 className="font-serif font-bold text-24">{pageContext.contact.title}</h5>
            <ul className="mt-32">
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
              <li className="flex items-start mt-8">
                <span className="flex items-center justify-center w-24 h-24 mr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,5.14A6.86,6.86,0,1,0,18.86,12,6.86,6.86,0,0,0,12,5.14Z" fill="currentColor"/>
                    <path d="M14.61,15.35,11.47,12.2V6.9h1.12v4.83l2.82,2.82Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="whitespace-pre">{pageContext.contact.openingHours}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="-m-8 mt-36">
          <div className="items-end p-8 -m-8 lg:flex">
            <nav className="flex-grow hidden lg:block">
              <ul className="flex flex-wrap">
                {pageContext.menus['footer-secondary'].map((item, i) => (
                  <li
                    key={item.slug}
                    className="m-8"
                  >
                    <a
                      className="underline text-14"
                      href={`#${item.slug}`}
                    >{item.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="m-8 text-center lg:text-right">
              {(pageContext.general.copyright || '').replace('{year}', new Date().getFullYear())}
            </div>
            <ul className="flex items-center justify-center">
              {/* <li className="m-8">
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
              </li> */}
              {/* <li className="m-8">
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
              </li> */}
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
      </div>
    </footer>
  )
}
