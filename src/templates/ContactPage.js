import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import BlueButton from "../components/BlueButton";
import FormInput from "../components/FormInput";
import Page from "../components/Page";
import StrikethroughHeading from "../components/StrikethroughHeading";

function ContactForm(props) {
  const intl = useIntl();
  return (
    <form
      className={props.className}
      name="contact"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <div className="p-24">
        <FormInput
          name="name"
          placeholder={`${intl.formatMessage({ id: 'contact.placeholder.name' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="email"
          name="email"
          placeholder={`${intl.formatMessage({ id: 'contact.placeholder.email' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="tel"
          name="tel"
          placeholder={intl.formatMessage({ id: 'contact.placeholder.tel' })}
        />
        <FormInput
          className="mt-20"
          name="content"
          tagName="textarea"
          rows={6}
          placeholder={intl.formatMessage({ id: 'contact.placeholder.content' })}
        />
        <BlueButton
          className="justify-center w-full px-24 mt-20 text-center"
          tagName="button"
        >
          <FormattedMessage id="send" />
        </BlueButton>
      </div>
      <div className="text-center text-gray-bc"><FormattedMessage id="contact.thankyou" /></div>
    </form>
  );
}

export default function ContactPage(props) {
  const { pageContext } = props;
  const { pageItem } = pageContext;
  return (
    <Page {...props}>
      <section className="w-full max-w-screen-xl mx-auto lg:flex mt-96">
        <div className="lg:mr-48">
          {pageContext.contact.subtitle && (
            <h1 className="mb-32 font-serif font-bold text-primary text-36">
              {pageContext.contact.subtitle}
            </h1>
          )}
          <ul>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
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
              <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
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
              <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
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
              <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12.77" viewBox="0 0 12.77 17.64">
                  <path d="M6.38,2.56a3.1,3.1,0,1,0,3.1,3.1h0A3.1,3.1,0,0,0,6.38,2.56Z" fill="none" stroke="currentColor" strokeMiterlimit="10"/>
                  <path d="M6.38,0A6.38,6.38,0,0,0,0,6.35C0,8.88,1.42,11,2.46,12.54l.19.28A53.55,53.55,0,0,0,6,17.16l.42.48.41-.48a53.55,53.55,0,0,0,3.32-4.34l.19-.28c1-1.55,2.46-3.66,2.46-6.19A6.39,6.39,0,0,0,6.38,0Zm3,11.91-.2.29a42.67,42.67,0,0,1-2.83,3.74c-.64-.78-1.9-2.34-2.83-3.74l-.19-.29c-1-1.43-2.28-3.38-2.28-5.58A5.3,5.3,0,1,1,11.67,6a2.41,2.41,0,0,1,0,.38c0,2.22-1.31,4.18-2.27,5.59Z" fill="currentColor"/>
                </svg>
              </span>
              <span>{pageContext.contact.address}</span>
            </li>
            <li className="flex items-start mt-8">
              <span className="flex items-center justify-center w-24 h-24 mr-8 text-tertiary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,5.14A6.86,6.86,0,1,0,18.86,12,6.86,6.86,0,0,0,12,5.14Z" fill="currentColor"/>
                  <path d="M14.61,15.35,11.47,12.2V6.9h1.12v4.83l2.82,2.82Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="whitespace-pre">{pageContext.contact.openingHours}</span>
            </li>
          </ul>
        </div>

        <div className="flex-grow mt-48 lg:mt-0">
          <div className="relative aspect-w-4 aspect-h-3">
            <iframe
              className="absolute inset-0 border-0"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1990.7373046906212!2d114.16962245501601!3d22.31155875758884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6d51a3625a730cd!2z6aaZ5riv5YWr5ZKM5pyD6aSo!5e0!3m2!1sen!2shk!4v1614613985675!5m2!1sen!2shk"
              allowFullScreen
              loading="lazy"
              title={pageItem.title}
            />
          </div>
        </div>
      </section>

      <section className="mt-64">
        <StrikethroughHeading>
          <FormattedMessage id="contact.form.title" />
        </StrikethroughHeading>

        <ContactForm className="w-full max-w-sm mx-auto" />
      </section>
    </Page>
  );
}
