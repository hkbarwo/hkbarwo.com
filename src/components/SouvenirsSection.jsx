import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";

import BlueButton from "./BlueButton";
import FormInput from "./FormInput";
import StrikethroughHeading from "./StrikethroughHeading";

function SouvenirsForm(props) {
  const intl = useIntl();
  const items = props.items || [];
  const [selectedItemCode, setSelectedItemCode] = useState('');
  const selectedItem = useMemo(
    () => items.find(item => item.code === selectedItemCode),
    [items, selectedItemCode]
  );
  const handleSelectItemChange = (event) => {
    setSelectedItemCode(event.target.value);
  };
  return (
    <form
      className={props.className}
      name="sovenir"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="sovenir" />
      <div className="p-24">
        <FormInput
          name="name"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.name' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="email"
          name="email"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.email' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="tel"
          name="tel"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.tel' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          name="content"
          rows={6}
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.address' })}*`}
          required
        />
        <div className="relative block w-full p-12 px-24 mt-20 text-center border border-gray-70 text-14 rounded-8">
          <svg
            className="absolute w-12 h-12 transition-transform duration-300 transform right-16 top-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.83 5.84L6 10.67 1.17 5.83M6 1.33v9.3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {selectedItem ? (
            `${selectedItem.title} (${selectedItem.code})`
          ) : (
            <FormattedMessage id="souvenir.placeholder.item" />
          )}
          <select
            className="absolute inset-0 w-full h-full opacity-0"
            name="item"
            placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.item' })}*`}
            required
            value={selectedItemCode}
            onChange={handleSelectItemChange}
            onBlur={handleSelectItemChange}
          >
            <option value="" disabled>
              {intl.formatMessage({ id: 'souvenir.placeholder.item' })}
            </option>
            {items.map(item => (
              <option
                key={item.code}
                value={item.code}
              >{item.title} ({item.code})</option>
            ))}
          </select>
        </div>
        <BlueButton
          className="justify-center w-full px-24 mt-20 text-center"
          tagName="button"
        >
          <FormattedMessage id="send" />
        </BlueButton>
      </div>
    </form>
  );
}

function SouvenirGridItem({ code, title, image }) {
  return (
    <div>
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="object-cover w-full h-full"
          src={image}
          alt={title}
        />
      </div>
      <div className="mt-30 text-14">
        <FormattedMessage
          id="souvenir.code"
          values={{ code }}
        />
      </div>
      <div className="mt-8 font-bold text-20">{title}</div>

    </div>
  );
}

function SouvenirGrid(props) {
  const items = props.items || [];
  return (
    <div
      className={classNames(
        'grid sm:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-24',
        props.className
      )}
    >
      {items.map(({ code, title, image }) => (
        <SouvenirGridItem
          key={code}
          title={title}
          code={code}
          image={image}
        />
      ))}
    </div>
  );
}

export default function SouvenirsSection(props) {
  return (
    <section className={props.className}>
      <StrikethroughHeading id="souvenirs" className="mb-72">{props.title}</StrikethroughHeading>

      <SouvenirGrid
        className="w-full max-w-screen-lg mx-auto"
        items={props.items}
      />

      <div className="w-full max-w-sm mx-auto whitespace-pre-wrap my-60">{props.content}</div>

      <SouvenirsForm
        className="w-full max-w-sm mx-auto"
        items={props.items}
      />
    </section>
  );
}
